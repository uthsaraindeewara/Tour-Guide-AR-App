import React from 'react';
interface MapMarkerProps {
  type?: 'landmark' | 'user' | 'visited';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  onClick?: () => void;
  className?: string;
}
export function MapMarker({
  type = 'landmark',
  size = 'md',
  active = false,
  onClick,
  className = ''
}: MapMarkerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };
  const typeClasses = {
    landmark: 'bg-blue-500',
    user: 'bg-green-500',
    visited: 'bg-purple-500'
  };
  return <button onClick={onClick} className={`${sizeClasses[size]} rounded-full ${typeClasses[type]} flex items-center justify-center shadow-lg ${active ? 'ring-4 ring-blue-500/30 scale-110' : ''} transition-all duration-200 ${className}`}>
      {type === 'landmark' && <div className="w-2 h-2 bg-white rounded-full"></div>}
      {type === 'user' && <div className="w-3 h-3 bg-white rounded-full"></div>}
      {type === 'visited' && <div className="w-2 h-2 bg-white rounded-full"></div>}
    </button>;
}