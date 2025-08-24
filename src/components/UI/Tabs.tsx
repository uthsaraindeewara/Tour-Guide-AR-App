import React, { useState } from 'react';
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}
export function Tabs({
  tabs,
  defaultTab,
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  return <div className={className}>
      <div className="flex space-x-2 border-b border-gray-200 mb-4 dark:border-gray-800">
        {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-4 text-sm font-medium transition-all ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-500 dark:text-blue-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}>
            {tab.label}
          </button>)}
      </div>
      <div>{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>;
}