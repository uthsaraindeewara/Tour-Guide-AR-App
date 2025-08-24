import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { InputField } from '../../components/UI/InputField';
import { ScanIcon, ArrowLeftIcon } from 'lucide-react';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/ar-scanner');
    }, 1500);
  };
  return <div className="flex flex-col min-h-screen p-4 bg-gradient-to-br from-gray-950 to-gray-900">
      <button onClick={() => navigate('/')} className="self-start p-2 mb-6" aria-label="Go back">
        <ArrowLeftIcon size={20} />
      </button>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ScanIcon size={32} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>
        <Card className="w-full max-w-sm mb-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
            <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" type="button" onClick={() => navigate('/auth/forgot-password')} className="text-blue-500">
                Forgot password?
              </Button>
            </div>
            <Button variant="primary" fullWidth type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" fullWidth>
              Google
            </Button>
            <Button variant="outline" fullWidth>
              Apple
            </Button>
          </div>
        </Card>
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <Button variant="ghost" size="sm" onClick={() => navigate('/auth/signup')} className="text-blue-500 p-0 hover:bg-transparent">
            Sign up
          </Button>
        </p>
      </div>
    </div>;
}