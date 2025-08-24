import React, { useEffect, useState, useRef } from 'react';
import { GlobeIcon, ChevronDownIcon } from 'lucide-react';
import { useLanguage, Language, languageNames } from '../LanguageContext';
export function LanguageSwitcher() {
  const {
    language,
    setLanguage,
    isLoading
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };
  return <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700" disabled={isLoading}>
        <GlobeIcon size={16} />
        <span className="text-sm">{languageNames[language].split(' ')[0]}</span>
        <ChevronDownIcon size={14} />
      </button>
      {isOpen && <div className="absolute right-0 mt-1 py-1 w-40 bg-white rounded-lg shadow-lg z-50 dark:bg-gray-800 dark:border dark:border-gray-700">
          {Object.entries(languageNames).map(([code, name]) => <button key={code} onClick={() => handleLanguageChange(code as Language)} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${language === code ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''}`}>
              {name}
            </button>)}
        </div>}
      {isLoading && <div className="absolute top-0 right-0 -mt-1 -mr-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>}
    </div>;
}