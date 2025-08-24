import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Toggle } from '../components/UI/Toggle';
import { useTheme } from '../components/ThemeProvider';
import { UserIcon, SettingsIcon, LogOutIcon, HeartIcon, AwardIcon, HelpCircleIcon, InfoIcon, MoonIcon, SunIcon } from 'lucide-react';
export default function Profile() {
  const navigate = useNavigate();
  const {
    theme,
    toggleTheme
  } = useTheme();
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    joinDate: 'Member since June 2023',
    stats: {
      visited: 12,
      favorites: 5,
      achievements: 3
    }
  };
  return <div className="flex flex-col min-h-screen pb-16">
      <Header title="Profile" />
      <div className="p-4">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <p className="text-gray-500 text-xs mt-1">{user.joinDate}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {user.stats.visited}
              </div>
              <div className="text-xs text-gray-400">Places Visited</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {user.stats.favorites}
              </div>
              <div className="text-xs text-gray-400">Favorites</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {user.stats.achievements}
              </div>
              <div className="text-xs text-gray-400">Achievements</div>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </Button>
        </Card>
        {/* Settings */}
        <h3 className="font-medium text-gray-400 mb-2 px-1">Preferences</h3>
        <Card className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  {theme === 'dark' ? <MoonIcon size={18} className="text-blue-500" /> : <SunIcon size={18} className="text-blue-500" />}
                </div>
                <span>Dark Mode</span>
              </div>
              <Toggle enabled={theme === 'dark'} onChange={toggleTheme} />
            </div>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigate('/settings')}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <SettingsIcon size={18} className="text-blue-500" />
                </div>
                <span>Settings</span>
              </div>
              <span className="text-gray-500">→</span>
            </Button>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigate('/favorites')}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <HeartIcon size={18} className="text-blue-500" />
                </div>
                <span>My Favorites</span>
              </div>
              <span className="text-gray-500">→</span>
            </Button>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigate('/achievements')}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <AwardIcon size={18} className="text-blue-500" />
                </div>
                <span>Achievements</span>
              </div>
              <span className="text-gray-500">→</span>
            </Button>
          </div>
        </Card>
        {/* Help & Info */}
        <h3 className="font-medium text-gray-400 mb-2 px-1">Help & Info</h3>
        <Card className="mb-6">
          <div className="space-y-4">
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigate('/help')}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <HelpCircleIcon size={18} className="text-blue-500" />
                </div>
                <span>Help & Support</span>
              </div>
              <span className="text-gray-500">→</span>
            </Button>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigate('/about')}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <InfoIcon size={18} className="text-blue-500" />
                </div>
                <span>About</span>
              </div>
              <span className="text-gray-500">→</span>
            </Button>
          </div>
        </Card>
        <Button variant="outline" className="w-full flex items-center justify-center text-red-500 border-red-500/30 hover:bg-red-500/10" onClick={() => navigate('/')}>
          <LogOutIcon size={18} className="mr-2" />
          Log Out
        </Button>
      </div>
      <BottomNav />
    </div>;
}