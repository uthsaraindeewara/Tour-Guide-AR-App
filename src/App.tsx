import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import CameraPermission from './pages/CameraPermission';
import ARScanner from './pages/ARScanner';
import Settings from './pages/Settings';
import SavedScans from './pages/SavedScans';
import Map from './pages/Map';
import Recommendations from './pages/Recommendations';
import VisitedPlaces from './pages/VisitedPlaces';
import LandmarkDetails from './pages/LandmarkDetails';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import About from './pages/About';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './components/LanguageContext';
export function App() {
  return <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800 dark:bg-gradient-to-br dark:from-gray-950 dark:to-gray-900 dark:text-white">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/camera-permission" element={<CameraPermission />} />
              <Route path="/ar-scanner" element={<ARScanner />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/saved-scans" element={<SavedScans />} />
              <Route path="/map" element={<Map />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/visited-places" element={<VisitedPlaces />} />
              <Route path="/landmark/:id" element={<LandmarkDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>;
}