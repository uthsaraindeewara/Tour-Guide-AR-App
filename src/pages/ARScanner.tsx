// src/pages/ARScanner.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FloatingActionButton } from '../components/UI/FloatingActionButton';
import { BottomNav } from '../components/Layout/BottomNav';
import { Button } from '../components/UI/Button';
import { Loader } from '../components/UI/Loader';
import { Card } from '../components/UI/Card';
import { CameraIcon, XIcon, InfoIcon, ShareIcon, BookmarkIcon } from 'lucide-react';

export default function ARScanner() {
  const [scanState, setScanState] = useState<'scanning' | 'found' | 'error' | 'loading'>('scanning');
  const [showResults, setShowResults] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Start camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error(err);
        setCameraError('Camera access denied or not available.');
        setScanState('error');
      }
    }

    startCamera();

    // Cleanup: stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleScan = () => {
    setScanState('loading');
    setTimeout(() => {
      setScanState('found');
      setShowResults(true);
    }, 1500);
  };

  const handleError = () => {
    setScanState('error');
  };

  const resetScan = () => {
    setScanState('scanning');
    setShowResults(false);
    setCameraError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Camera View */}
      <div className="flex-1 relative">
        <video ref={videoRef} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

        {/* Scanner UI */}
        {scanState === 'scanning' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-blue-500 rounded-lg opacity-70 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-1 bg-blue-500/50 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {scanState === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader size="lg" />
          </div>
        )}

        {scanState === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="max-w-xs text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <XIcon size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Scan Failed</h3>
                <p className="text-gray-400 mb-4">
                  {cameraError || 'Unable to recognize object. Please try again.'}
                </p>
                <Button variant="primary" onClick={resetScan}>
                  Try Again
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="text-lg font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            AR Vision
          </div>
          <Button
            variant="ghost"
            className="bg-black/40 backdrop-blur-sm rounded-full p-2"
            onClick={handleError}
          >
            <XIcon size={20} />
          </Button>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center">
          <FloatingActionButton icon={<CameraIcon size={24} />} onClick={handleScan} />
        </div>
      </div>

      {/* Results Overlay */}
      {showResults && (
        <div className="absolute inset-x-0 bottom-0 p-4 animate-slide-up">
          <Card className="w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Modern Chair</h3>
              <Button variant="ghost" className="p-1" onClick={() => setShowResults(false)}>
                <XIcon size={20} />
              </Button>
            </div>
            <p className="text-gray-400 mb-4">
              Mid-century modern design chair with ergonomic shape and premium materials.
            </p>
            <div className="flex space-x-3 mb-2">
              <Button variant="primary" icon={<InfoIcon size={18} />}>
                Details
              </Button>
              <Button variant="outline" icon={<ShareIcon size={18} />}>
                Share
              </Button>
              <Button variant="outline" icon={<BookmarkIcon size={18} />}>
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}

      <BottomNav />
    </div>
  );
}