import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScanIcon, MapIcon, CompassIcon, ClockIcon, UserIcon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    t
  } = useLanguage();
  const navItems = [{
    path: '/ar-scanner',
    icon: <ScanIcon size={24} />,
    label: 'AR View'
  }, {
    path: '/map',
    icon: <MapIcon size={24} />,
    label: 'Map'
  }, {
    path: '/recommendations',
    icon: <CompassIcon size={24} />,
    label: 'Discover'
  }, {
    path: '/visited-places',
    icon: <ClockIcon size={24} />,
    label: 'Visited'
  }, {
    path: '/profile',
    icon: <UserIcon size={24} />,
    label: 'Profile'
  }];
  return <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200 py-2 px-4 z-50 shadow-md
    dark:bg-gray-900/80 dark:backdrop-blur-lg dark:border-gray-800">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map(item => <button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center p-2 ${location.pathname === item.path ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>
            {item.icon}
            <span className="text-xs mt-1">{t(item.label)}</span>
          </button>)}
      </div>
    </nav>;
}