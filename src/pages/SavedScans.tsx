import React from 'react';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { SearchIcon, ClockIcon, TrashIcon } from 'lucide-react';
export default function SavedScans() {
  const savedScans = [{
    id: 1,
    title: 'Modern Chair',
    date: 'Today, 2:30 PM',
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 2,
    title: 'Coffee Table',
    date: 'Yesterday, 11:20 AM',
    thumbnail: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
  }, {
    id: 3,
    title: 'Floor Lamp',
    date: 'Jul 12, 2023',
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
  }];
  return <div className="flex flex-col min-h-screen pb-16">
      <Header title="Saved Scans" />
      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-gray-500" />
          </div>
          <input type="text" placeholder="Search saved scans" className="bg-gray-900 border border-gray-800 text-gray-300 rounded-lg pl-10 pr-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        {/* Saved Scans List */}
        <div className="space-y-4">
          {savedScans.map(scan => <Card key={scan.id} className="flex items-center p-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                <img src={scan.thumbnail} alt={scan.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{scan.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <ClockIcon size={14} className="mr-1" />
                  <span>{scan.date}</span>
                </div>
              </div>
              <Button variant="ghost" className="p-2 text-gray-500 hover:text-red-500" onClick={() => {}}>
                <TrashIcon size={18} />
              </Button>
            </Card>)}
        </div>
        {savedScans.length === 0 && <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <ClockIcon size={24} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No saved scans yet</h3>
            <p className="text-gray-500 text-center mb-6">
              Your saved scans will appear here
            </p>
          </div>}
      </div>
      <BottomNav />
    </div>;
}