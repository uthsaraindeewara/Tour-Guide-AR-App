import React from 'react';
interface ProgressDotsProps {
  total: number;
  current: number;
  className?: string;
}
export function ProgressDots({
  total,
  current,
  className = ''
}: ProgressDotsProps) {
  return <div className={`flex space-x-2 ${className}`}>
      {Array.from({
      length: total
    }).map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-blue-500 w-4' : 'bg-gray-600'}`} />)}
    </div>;
}