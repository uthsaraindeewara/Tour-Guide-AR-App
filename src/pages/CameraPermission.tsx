import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { CameraIcon, ShieldIcon } from 'lucide-react';
export default function CameraPermission() {
  const navigate = useNavigate();
  const requestPermission = async () => {
    try {
      // In a real app, this would actually request camera permission
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/ar-scanner');
    } catch (error) {
      console.error('Camera permission denied');
      // Would handle permission denial here
    }
  };
  return <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <Card className="w-full max-w-sm mb-8">
          <div className="flex flex-col items-center">
            <div className="mb-6 w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
              <CameraIcon size={36} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-center">
              Camera Access
            </h2>
            <p className="text-gray-400 text-center mb-8">
              We need access to your camera to enable AR scanning. Your privacy
              is important to us.
            </p>
            <Button variant="primary" size="lg" onClick={requestPermission} fullWidth icon={<CameraIcon size={20} />}>
              Allow Camera Access
            </Button>
            <div className="flex items-center mt-6 text-gray-500 text-sm">
              <ShieldIcon size={16} className="mr-2" />
              <span>We only use your camera for AR scanning</span>
            </div>
          </div>
        </Card>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Not now
        </Button>
      </div>
    </div>;
}