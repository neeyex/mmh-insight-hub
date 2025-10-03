import { Link } from 'react-router-dom';
import Image from '@/components/ui/Image';

const AuthErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcfcfc]">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-2xl shadow-lg border border-[#e3e3e6]">

        <a href="https://modernmarketinghouse.com/" title="Go Back to Home">
          <Image
            src="https://cc.modernmarketinghouse.com/MMH-Assets/MMH-Modern-Marketing-House-Logo.svg"
            alt="Modern Marketing House Logo"
            width={192}
            height={192}
            className="mx-auto mb-4"
          />
        </a>

        <h1 className="text-2xl font-semibold text-[#0a0a10] tracking-tight">
          Your Invitation Link Has Expired
        </h1>
        <p className="mt-2 text-[#6f6f7e]">
          For your security, our initial setup links can only be used once and are valid for 24 hours.
        </p>

        <div className="pt-4 text-left border-t border-gray-200">
          <p className="text-sm font-medium text-[#0a0a10] mb-2">
            Not a problem, getting a fresh link is simple:
          </p>
          <ol className="text-sm text-[#6f6f7e] list-decimal list-inside space-y-2">
            <li>Return to the login page.</li>
            <li>Enter the email address you used to subscribe.</li>
            <li>Click the <strong>"Forgot password?"</strong> link.</li>
          </ol>
           <p className="mt-4 text-xs text-gray-500">
            This will immediately send you a new, secure link. Remember, this new link can also only be used once and is valid for 24 hours.
          </p>
        </div>

        <Link to="/login">
            <button
              className="w-full flex justify-center py-3 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#ff4f00] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4f00]"
            >
              Return to Login Page
            </button>
        </Link>

      </div>
    </div>
  );
};

export default AuthErrorPage;
