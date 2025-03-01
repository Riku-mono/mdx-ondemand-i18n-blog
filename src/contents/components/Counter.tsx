'use client';

import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="text-xl font-bold">Counter</p>
      <div className="flex items-center gap-4">
        <button className="bg-card rounded-md p-2" onClick={() => setCount(count - 1)}>
          -
        </button>
        <span>{count}</span>
        <button className="bg-card rounded-md p-2" onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
