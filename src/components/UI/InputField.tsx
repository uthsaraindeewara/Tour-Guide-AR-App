import React from 'react';
interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}
export function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = ''
}: InputFieldProps) {
  return <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
        {label}
        {required && <span className="text-blue-500 ml-1">*</span>}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`w-full bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-2xl py-2.5 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
        dark:bg-gray-800 dark:border-gray-700 dark:text-white`} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>;
}