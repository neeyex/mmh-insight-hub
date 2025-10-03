import { Link, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async () => {
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent! Please check your email. For verification, please ensure this is the same email address you used during checkout.");
      setCountdown(60);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcfcfc]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#ffffff] rounded-2xl shadow-lg border border-[#e3e3e6]">
        <div className="text-center">
          <a href="https://modernmarketinghouse.com/" title="Go Back to Home">
            <Image
              src="https://cc.modernmarketinghouse.com/MMH-Assets/MMH-Modern-Marketing-House-Logo.svg"
              alt="Modern Marketing House Logo"
              width={192}
              height={192}
              className="mx-auto mb-4 transition-opacity duration-300 hover:opacity-80"
            />
          </a>
          <p className="mt-2 text-sm text-[#6f6f7e]">
            Log in to access your Agent Center.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <div className="p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">{error}</div>}
          {message && <div className="p-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg">{message}</div>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0a0a10]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 bg-white border border-[#e3e3e6] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4f00] focus:border-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0a0a10]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 bg-white border border-[#e3e3e6] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4f00] focus:border-transparent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="mailto:hi@modernmarketinghouse.com" className="font-medium text-[#ff4f00] hover:text-[#e64500] transition-colors">
              Contact Support
            </a>

            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={isLoading || countdown > 0}
              className="font-medium text-[#ff4f00] hover:text-[#e64500] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {countdown > 0 ? `Try again in ${countdown}s` : "Forgot password?"}
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#ff4f00] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4f00] disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
