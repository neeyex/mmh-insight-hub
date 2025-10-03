import { Link, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('error_code=otp_expired')) {
      setError("This password reset link has expired.");
      setIsExpired(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Your password has been set successfully! Redirecting you to log in...");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
              className="mx-auto mb-4"
            />
          </a>
          <h1 className="text-3xl font-semibold text-[#0a0a10] tracking-tight">Create Your Secure Password</h1>
          <p className="mt-2 text-sm text-[#6f6f7e]">
            Welcome! This is the final step to activating your Agent Center account.
          </p>
        </div>

        {isExpired ? (
          <div className="text-center">
            <div className="p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">{error}</div>
            <p className="mt-4 text-sm text-[#6f6f7e]">
              For your security, invitation links can only be used once and are only valid for 24 hours. Not a problem—you can easily get a new one.
            </p>
            <p className="mt-2 text-sm text-[#6f6f7e]">
              Please return to the login page, enter your email address, and click the &quot;Forgot password?&quot; link to have a fresh link sent to you.
            </p>
            <Link to="/login" className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#ff4f00] hover:bg-[#e64500]">
                Return to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg">{error}</div>}
            {success && <div className="p-4 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg">{success}</div>}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#0a0a10]">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 bg-white border border-[#e3e3e6] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4f00] focus:border-transparent"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0a0a10]">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 bg-white border border-[#e3e3e6] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4f00] focus:border-transparent"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || success !== null}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#ff4f00] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4f00] disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Set Password & Access Agent Center'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
