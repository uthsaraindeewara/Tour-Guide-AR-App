import React from 'react';
interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
}
export function Toggle({
  enabled,
  onChange,
  label
}: ToggleProps) {
  return <div className="flex items-center">
      {label && <span className="mr-3 text-sm text-gray-600 dark:text-gray-300">
          {label}
        </span>}
      <button type="button" className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`} onClick={onChange}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>;
}