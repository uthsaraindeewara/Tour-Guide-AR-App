import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { StarIcon, MapPinIcon } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';
interface LandmarkCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  distance?: string;
  rating?: number;
  category?: string;
  onViewDetails?: () => void;
  onStartTour?: () => void;
  className?: string;
}
export function LandmarkCard({
  id,
  title,
  description,
  imageUrl,
  distance,
  rating,
  category,
  onViewDetails,
  onStartTour,
  className = ''
}: LandmarkCardProps) {
  const {
    t
  } = useLanguage();
  return <Card className={`overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow ${className}`} onClick={onViewDetails}>
      <div className="h-40 w-full relative">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        {category && <Badge variant="primary" size="sm" className="absolute top-3 left-3">
            {t(category)}
          </Badge>}
        {distance && <div className="absolute bottom-3 left-3 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-700 shadow-sm
          dark:bg-black/60 dark:text-white">
            <MapPinIcon size={12} className="mr-1" />
            <span>{distance}</span>
          </div>}
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
            {t(title)}
          </h3>
          {rating !== undefined && <div className="flex items-center">
              <StarIcon size={14} className="text-yellow-500 mr-1" />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {rating.toFixed(1)}
              </span>
            </div>}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-400">
          {t(description)}
        </p>
        <div className="flex justify-between mt-auto">
          <Button variant="outline" size="sm" onClick={e => {
          e.stopPropagation();
          onViewDetails && onViewDetails();
        }}>
            Details
          </Button>
          <Button variant="primary" size="sm" onClick={e => {
          e.stopPropagation();
          onStartTour && onStartTour();
        }}>
            Start Tour
          </Button>
        </div>
      </div>
    </Card>;
}