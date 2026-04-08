import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plane, Wallet, CalendarDays, Compass, Loader2 } from 'lucide-react';

export default function PlanTrip({ setTripData }) {
  const [formData, setFormData] = useState({ destination: '', budget: '', days: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/trips/plan-trip', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data && res.data.success) {
        setTripData(res.data.data);
        navigate('/result');
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error generating plan. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 animate-slide-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-4 pb-1">
          Design Your Dream Trip
        </h1>
        <p className="text-xl text-gray-400">Our AI will craft the perfect itinerary optimized for your budget.</p>
      </div>

      <div className="glass-card p-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

        {error && (
          <div className="bg-danger/10 border border-danger/50 text-danger px-4 py-3 rounded-lg mb-8 relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
              Where do you want to go in India?
            </label>
            <div className="relative">
              <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                required
                placeholder="e.g. Varanasi, Jaipur, Delhi..."
                className="input-field pl-14 py-4 text-lg"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
                Total Budget (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-500 group-focus-within:text-primary text-lg">₹</span>
                <input
                  type="number"
                  required
                  min="1000"
                  step="500"
                  placeholder="e.g. 15000"
                  className="input-field pl-12 py-4 text-lg"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
                Number of Days
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="number"
                  required
                  min="1"
                  max="14"
                  placeholder="e.g. 5"
                  className="input-field pl-14 py-4 text-lg"
                  value={formData.days}
                  onChange={(e) => setFormData({...formData, days: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary !py-5 text-xl font-bold flex justify-center items-center gap-3 overflow-hidden relative group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Crafting Map & Itinerary...</span>
              </>
            ) : (
              <>
                <Plane className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                <span>Generate Smart Plan</span>
              </>
            )}
            
            {/* Shimmer effect */}
            {!isLoading && (
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            )}
          </button>

        </form>
      </div>

      <style jsx="true">{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
