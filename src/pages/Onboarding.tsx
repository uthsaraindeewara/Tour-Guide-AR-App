import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { ProgressDots } from '../components/UI/ProgressDots';
import { Card } from '../components/UI/Card';
import { ScanIcon, InfoIcon, SmartphoneIcon, ChevronRightIcon } from 'lucide-react';
export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slides = [{
    title: 'Scan Real-World Objects',
    description: 'Point your camera at objects around you to get instant AR feedback',
    icon: <ScanIcon size={48} className="text-blue-500" />
  }, {
    title: 'Interactive Overlays',
    description: 'Get detailed information and interactive 3D models overlaid on the real world',
    icon: <InfoIcon size={48} className="text-blue-500" />
  }, {
    title: 'Works in Your Browser',
    description: 'No app installation required - just open the website and start scanning',
    icon: <SmartphoneIcon size={48} className="text-blue-500" />
  }];
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/camera-permission');
    }
  };
  const currentSlideData = slides[currentSlide];
  return <div className="flex flex-col min-h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-sm mb-8 py-12 flex flex-col items-center">
          <div className="mb-6 w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
            {currentSlideData.icon}
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center">
            {currentSlideData.title}
          </h2>
          <p className="text-gray-400 text-center mb-6">
            {currentSlideData.description}
          </p>
        </Card>
        <Button variant="primary" onClick={nextSlide} icon={<ChevronRightIcon size={20} />} className="mb-8">
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
        </Button>
        <ProgressDots total={slides.length} current={currentSlide} />
      </div>
    </div>;
}