import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    success: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
  };
  const sizeStyles = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5'
  };
  return <span className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>;
}