import React from 'react';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Card } from '../components/UI/Card';
import { ScanIcon, GlobeIcon, CodeIcon, HeartIcon } from 'lucide-react';
export default function About() {
  return <div className="flex flex-col min-h-screen pb-16">
      <Header title="About" showBack />
      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <ScanIcon size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">AR Vision</h1>
          <p className="text-gray-400 text-sm">Version 1.0.0</p>
        </div>
        <Card className="mb-6">
          <p className="text-gray-300 mb-4">
            AR Vision is a cutting-edge augmented reality tour guide that helps
            you discover and learn about landmarks and points of interest around
            you.
          </p>
          <p className="text-gray-300">
            Using your device's camera, AR Vision overlays information directly
            onto the real world, providing an immersive and educational
            experience.
          </p>
        </Card>
        <h2 className="text-lg font-medium mb-3 px-1">Features</h2>
        <Card className="mb-6">
          <div className="space-y-4">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <ScanIcon size={20} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">AR Scanning</h3>
                <p className="text-sm text-gray-400">
                  Scan landmarks to get detailed information overlaid in
                  real-time
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <GlobeIcon size={20} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Interactive Maps</h3>
                <p className="text-sm text-gray-400">
                  Navigate to nearby points of interest with our interactive map
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <HeartIcon size={20} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Personalized Recommendations</h3>
                <p className="text-sm text-gray-400">
                  Get tailored recommendations based on your interests and
                  history
                </p>
              </div>
            </div>
          </div>
        </Card>
        <h2 className="text-lg font-medium mb-3 px-1">Credits</h2>
        <Card className="mb-6">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium">Design & Development</h3>
              <p className="text-sm text-gray-400">Magic Patterns Team</p>
            </div>
            <div>
              <h3 className="font-medium">Photography</h3>
              <p className="text-sm text-gray-400">Unsplash Contributors</p>
            </div>
            <div>
              <h3 className="font-medium">Icons</h3>
              <p className="text-sm text-gray-400">Lucide Icons</p>
            </div>
          </div>
        </Card>
        <p className="text-center text-gray-500 text-sm">
          © 2023 AR Vision. All rights reserved.
        </p>
      </div>
      <BottomNav />
    </div>;
}