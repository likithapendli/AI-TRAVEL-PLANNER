import { Link } from 'react-router-dom';
import { Compass, Map, LogOut } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 mb-8 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg group-hover:scale-105 transition-transform">
          <Compass className="text-white w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">TravelGenius AI</h1>
      </Link>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link to="/plan-trip" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Map className="w-5 h-5" />
              <span className="font-medium">Plan Trip</span>
            </Link>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-danger/20 hover:text-danger text-gray-300 border border-white/10 hover:border-danger/50 transition-all font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Login</Link>
            <Link to="/register" className="px-5 py-2.5 bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-white rounded-lg font-medium transition-all">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
