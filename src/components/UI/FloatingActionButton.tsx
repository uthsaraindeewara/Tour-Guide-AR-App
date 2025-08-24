import React from 'react';
interface FABProps {
  icon: React.ReactNode;
  onClick: () => void;
  label?: string;
  className?: string;
}
export function FloatingActionButton({
  icon,
  onClick,
  label,
  className = ''
}: FABProps) {
  return <button onClick={onClick} className={`flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-200 ${className}`} aria-label={label || 'Action button'}>
      {icon}
    </button>;
}