import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { LanguageSwitcher } from '../UI/LanguageSwitcher';
import { useLanguage } from '../LanguageContext';
interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}
export function Header({
  title,
  showBack = false,
  rightAction
}: HeaderProps) {
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  return <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-gray-200 px-4 py-3 shadow-sm
    dark:bg-gray-900/80 dark:backdrop-blur-lg dark:border-gray-800">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center">
          {showBack && <button onClick={() => navigate(-1)} className="mr-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Go back">
              <ArrowLeftIcon size={20} className="text-gray-700 dark:text-white" />
            </button>}
          {title && <h1 className="font-bold text-lg text-gray-800 dark:text-white">
              {t(title)}
            </h1>}
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          {rightAction && <div>{rightAction}</div>}
        </div>
      </div>
    </header>;
}