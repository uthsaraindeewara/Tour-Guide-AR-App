import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { InputField } from '../../components/UI/InputField';
import { ArrowLeftIcon, MailIcon, CheckCircleIcon } from 'lucide-react';
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate email sending process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  return <div className="flex flex-col min-h-screen p-4 bg-gradient-to-br from-gray-950 to-gray-900">
      <button onClick={() => navigate('/auth/login')} className="self-start p-2 mb-6" aria-label="Go back">
        <ArrowLeftIcon size={20} />
      </button>
      <div className="flex-1 flex flex-col items-center justify-center">
        {!isSubmitted ? <>
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <MailIcon size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center">
              Reset Password
            </h1>
            <p className="text-gray-400 text-center mb-6 max-w-xs">
              Enter your email and we'll send you instructions to reset your
              password
            </p>
            <Card className="w-full max-w-sm mb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
                <Button variant="primary" fullWidth type="submit" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </Card>
          </> : <>
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CheckCircleIcon size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center">
              Check Your Email
            </h1>
            <p className="text-gray-400 text-center mb-6 max-w-xs">
              We've sent a password reset link to {email}
            </p>
            <Button variant="primary" onClick={() => navigate('/auth/login')}>
              Back to Login
            </Button>
            <Button variant="ghost" className="mt-3" onClick={() => setIsSubmitted(false)}>
              Didn't receive an email? Try again
            </Button>
          </>}
      </div>
    </div>;
}