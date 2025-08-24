import React from 'react';
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function Loader({
  size = 'md',
  className = ''
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };
  return <div className={`${className} flex justify-center items-center`}>
      <div className={`${sizeClasses[size]} rounded-full border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin`}></div>
    </div>;
}