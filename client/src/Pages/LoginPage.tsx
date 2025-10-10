// In client/src/pages/LoginPage.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Loader2 } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // If login is successful, the token will be in the response
      const { token } = response.data;

      // IMPORTANT: Store the token in localStorage
      // This makes it persist even if the user refreshes the page
      localStorage.setItem('token', token);

      // Redirect the user to the admin dashboard (we will create this page next)
      navigate('/admin');

    } catch (err) {
      console.error('Login failed:', err);
      // Check if the server sent a specific error message
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700 shadow-lg shadow-cyan-500/10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-25" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">
              Admin Login
            </h2>
            
            {error && (
              <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-slate-400 mb-2 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
              <div>
                <label className="text-slate-400 mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-lg text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn /> Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};