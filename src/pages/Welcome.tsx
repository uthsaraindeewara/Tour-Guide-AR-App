import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { ScanIcon } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
export default function Welcome() {
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  return <div className="flex flex-col min-h-screen justify-between p-6 bg-gradient-to-br from-blue-50 to-white
    dark:from-gray-950 dark:to-gray-900">
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Language switcher will be visible on all pages, even those without a header */}
              {!window.location.pathname.includes('/ar-scanner') && <div className="pt-2 pr-2">
                  <div className="flex items-center">
                    {/* We'll use the header's language switcher for most pages */}
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-10 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ScanIcon size={40} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          {t('AR Vision')}
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-xs dark:text-gray-400">
          {t('Experience augmented reality directly in your browser')}
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/onboarding')} className="animate-bounce">
          {t('Get Started')}
        </Button>
      </div>
      <p className="text-gray-500 text-sm text-center mt-8">
        {t('No downloads required • Works on all devices')}
      </p>
    </div>;
}