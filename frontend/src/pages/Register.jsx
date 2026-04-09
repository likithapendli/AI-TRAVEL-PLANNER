import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Lock, Compass } from 'lucide-react';
import API_URL from '../api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    // Validate gmail
    if (!formData.email.endsWith('@gmail.com')) {
      return setError('Only Gmail addresses are currently supported in this prototype');
    }

    if (formData.phone.length !== 10) {
      return setError('Phone number must be exactly 10 digits');
    }

    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Server error during registration');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in mt-10 mb-20">
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Compass className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Start Your Journey</h2>
          <p className="text-gray-400">Create an account to start planning.</p>
        </div>

        {error && <div className="bg-danger/10 border border-danger/50 text-danger px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}
        {success && <div className="bg-secondary/10 border border-secondary/50 text-secondary px-4 py-3 rounded-lg mb-6 text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              className="input-field pl-12"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Gmail Address"
              className="input-field pl-12"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="number"
              placeholder="10-digit Phone Number"
              className="input-field pl-12"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="input-field pl-12"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field pl-12"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !!success}
            className="w-full btn-primary bg-secondary hover:bg-secondary/80 hover:scale-100 shadow-secondary/30 mt-6 !py-4 text-lg"
          >
            {isLoading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account? <Link to="/login" className="text-secondary hover:text-white transition-colors">Log in</Link>
        </p>
      </div>
    </div>
  );
}
