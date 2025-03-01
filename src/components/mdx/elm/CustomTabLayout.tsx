'use client';

import { Children, useState } from 'react';

// contents groupings layout

interface CodeTabsProps {
  children: React.ReactNode[];
}

interface TabProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const Tab = ({ children, active, onClick }: TabProps) => (
  <button
    className={`rounded-full px-4 py-2 text-xs font-medium ${active ? 'bg-card text-primary' : 'text-muted'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const CodeTabs = ({ children }: CodeTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = Children.map(children, (child) => {
    if (typeof child === 'object' && child !== null && 'props' in child) {
      const props = child.props as { title?: string };
      if ('title' in props) {
        return props.title;
      }
    }
    return null;
  });
  const contents = Children.map(children, (child) => child);

  return (
    <div className="relative mt-2 rounded-md border" data-tab-layout>
      <div className="flex border-b p-2">
        {tabs?.map((tab, i) => (
          <Tab key={i} active={activeTab === i} onClick={() => setActiveTab(i)}>
            {tab}
          </Tab>
        ))}
      </div>
      {contents?.map((content, i) => (
        <div key={i} className={`${activeTab === i ? 'block p-2' : 'hidden'}`}>
          {content}
        </div>
      ))}
    </div>
  );
};

export default CodeTabs;
