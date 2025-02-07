// ボタンを設置し、クリックすると目次を表示する
'use client';

import React, { useState } from 'react';
import { TableOfContents } from './TableOfContents';

export const MobileTableOfContentsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-toc relative">
      <button className="rounded-l-lg bg-zinc-200 p-2 dark:bg-zinc-900" onClick={handleClick}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && (
        <div className="absolute -right-4 w-screen rounded-b-lg bg-zinc-200 p-4 dark:bg-zinc-900">
          <TableOfContents onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
