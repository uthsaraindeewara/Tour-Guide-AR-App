import React, { Children } from 'react';
import { useLanguage } from '../LanguageContext';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const {
    t
  } = useLanguage();
  const baseStyles = 'rounded-2xl font-medium transition-all duration-200 flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-md hover:shadow-blue-500/15 active:scale-95 disabled:opacity-70 disabled:active:scale-100',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 disabled:opacity-70 disabled:active:scale-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95 disabled:opacity-70 disabled:active:scale-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
    ghost: 'text-gray-600 hover:bg-gray-100 active:scale-95 disabled:opacity-70 disabled:active:scale-100 dark:text-gray-300 dark:hover:bg-gray-800'
  };
  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-2.5 px-6',
    lg: 'text-lg py-3 px-8'
  };
  const widthStyle = fullWidth ? 'w-full' : '';
  // Translate button text if it's a string
  const translatedChildren = typeof children === 'string' ? t(children) : children;
  return <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {translatedChildren}
    </button>;
}