import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({
  children,
  className = '',
  onClick
}: CardProps) {
  return <div onClick={onClick} className={`bg-white shadow-md rounded-2xl p-6 border border-gray-100 
      dark:bg-gray-900/80 dark:backdrop-blur-lg dark:rounded-3xl dark:shadow-lg dark:border-gray-800 ${className}`}>
      {children}
    </div>;
}