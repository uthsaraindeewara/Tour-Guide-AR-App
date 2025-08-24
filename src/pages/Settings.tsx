import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Card } from '../components/UI/Card';
import { Toggle } from '../components/UI/Toggle';
import { useTheme } from '../components/ThemeProvider';
import { VolumeIcon, InfoIcon, ShieldIcon, HelpCircleIcon, MoonIcon, SunIcon, ZapIcon } from 'lucide-react';
export default function Settings() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  return <div className="flex flex-col min-h-screen pb-16">
      <Header title="Settings" showBack={true} />
      <div className="flex-1 p-4">
        <h2 className="text-lg font-medium text-gray-400 mb-3 px-2">
          Preferences
        </h2>
        <Card className="mb-4">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <VolumeIcon size={18} className="text-blue-500" />
                </div>
                <span>Sound Effects</span>
              </div>
              <Toggle enabled={soundEnabled} onChange={() => setSoundEnabled(!soundEnabled)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <ZapIcon size={18} className="text-blue-500" />
                </div>
                <span>Haptic Feedback</span>
              </div>
              <Toggle enabled={hapticEnabled} onChange={() => setHapticEnabled(!hapticEnabled)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  {theme === 'dark' ? <MoonIcon size={18} className="text-blue-500" /> : <SunIcon size={18} className="text-blue-500" />}
                </div>
                <span>Dark Mode</span>
              </div>
              <Toggle enabled={theme === 'dark'} onChange={toggleTheme} />
            </div>
          </div>
        </Card>
        <h2 className="text-lg font-medium text-gray-400 mb-3 mt-6 px-2">
          About
        </h2>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <InfoIcon size={18} className="text-blue-500" />
              </div>
              <span>About AR Vision</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <ShieldIcon size={18} className="text-blue-500" />
              </div>
              <span>Privacy Policy</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <HelpCircleIcon size={18} className="text-blue-500" />
              </div>
              <span>Help & Support</span>
            </div>
          </div>
        </Card>
        <div className="text-center mt-8 text-gray-500 text-sm">
          AR Vision v1.0.0
        </div>
      </div>
      <BottomNav />
    </div>;
}