import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Button } from '../components/UI/Button';
import { MapMarker } from '../components/UI/MapMarker';
import { Card } from '../components/UI/Card';
import { MapPinIcon, ZoomInIcon, ZoomOutIcon, LayersIcon, XIcon } from 'lucide-react';
export default function Map() {
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Mock landmarks for demonstration
  const landmarks = [{
    id: '1',
    name: 'Historic Museum',
    description: 'A museum showcasing local history and artifacts',
    position: {
      top: '30%',
      left: '40%'
    },
    type: 'landmark'
  }, {
    id: '2',
    name: 'City Park',
    description: 'Beautiful urban park with gardens and walking paths',
    position: {
      top: '45%',
      left: '60%'
    },
    type: 'landmark'
  }, {
    id: '3',
    name: 'Art Gallery',
    description: 'Modern art gallery featuring local artists',
    position: {
      top: '60%',
      left: '35%'
    },
    type: 'visited'
  }];
  return <div className="flex flex-col min-h-screen pb-16">
      <Header title="Explore Map" />
      {/* Map Container */}
      <div className="flex-1 relative bg-gray-800 overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 opacity-10">
            {/* Grid pattern to simulate map */}
            <div className="h-full w-full grid grid-cols-12 grid-rows-12">
              {Array.from({
              length: 144
            }).map((_, i) => <div key={i} className="border border-gray-700"></div>)}
            </div>
          </div>
          {/* Roads */}
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-700/50"></div>
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-700/50"></div>
          <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gray-700/50"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-700/50"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-700/50"></div>
          <div className="absolute right-1/3 top-0 bottom-0 w-1 bg-gray-700/50"></div>
        </div>
        {/* Landmarks */}
        {landmarks.map(landmark => <div key={landmark.id} style={{
        position: 'absolute',
        top: landmark.position.top,
        left: landmark.position.left
      }}>
            <MapMarker type={landmark.type as any} active={selectedLandmark === landmark.id} onClick={() => setSelectedLandmark(landmark.id)} />
          </div>)}
        {/* User location */}
        <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
          <MapMarker type="user" size="lg" />
        </div>
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="secondary" className="w-10 h-10 rounded-full p-0 flex items-center justify-center" onClick={() => {}}>
            <ZoomInIcon size={20} />
          </Button>
          <Button variant="secondary" className="w-10 h-10 rounded-full p-0 flex items-center justify-center" onClick={() => {}}>
            <ZoomOutIcon size={20} />
          </Button>
          <Button variant="secondary" className="w-10 h-10 rounded-full p-0 flex items-center justify-center" onClick={() => setShowFilters(!showFilters)}>
            <LayersIcon size={20} />
          </Button>
        </div>
        {/* Current Location Button */}
        <div className="absolute bottom-24 right-4">
          <Button variant="primary" className="w-12 h-12 rounded-full p-0 flex items-center justify-center" onClick={() => {}}>
            <MapPinIcon size={20} />
          </Button>
        </div>
        {/* Filters Panel */}
        {showFilters && <div className="absolute top-4 left-4 right-16 animate-slide-up">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Map Filters</h3>
                <Button variant="ghost" className="p-1" onClick={() => setShowFilters(false)}>
                  <XIcon size={18} />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="landmarks" className="mr-2" defaultChecked />
                  <label htmlFor="landmarks" className="text-sm">
                    Landmarks
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="restaurants" className="mr-2" defaultChecked />
                  <label htmlFor="restaurants" className="text-sm">
                    Restaurants
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="visited" className="mr-2" defaultChecked />
                  <label htmlFor="visited" className="text-sm">
                    Visited Places
                  </label>
                </div>
              </div>
            </Card>
          </div>}
        {/* Selected Landmark Info */}
        {selectedLandmark && <div className="absolute bottom-0 left-0 right-0 p-4 animate-slide-up">
            <Card>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">
                    {landmarks.find(l => l.id === selectedLandmark)?.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {landmarks.find(l => l.id === selectedLandmark)?.description}
                  </p>
                </div>
                <Button variant="ghost" className="p-1 h-8 w-8" onClick={() => setSelectedLandmark(null)}>
                  <XIcon size={16} />
                </Button>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm">
                  Directions
                </Button>
                <Button variant="primary" size="sm">
                  Start Tour
                </Button>
              </div>
            </Card>
          </div>}
      </div>
      <BottomNav />
    </div>;
}