// ボタンを設置し、クリックすると目次を表示する
'use client';

import React, { useState } from 'react';
import { TableOfContents } from './TableOfContents';

interface Props {
  title: string;
}

export const MobileTableOfContentsButton = ({ title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-toc relative">
      <button className="p-2" onClick={handleClick}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && (
        <div className="bg-card absolute -right-4 w-screen rounded-b-lg p-4">
          <h2 className="mb-2 pl-2 text-xl font-bold">{title}</h2>
          <TableOfContents onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
