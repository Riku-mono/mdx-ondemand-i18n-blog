'use client';

import { Check, Copy } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';

export default function Pre({
  children,
  className: classNames,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <div className="group relative">
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className={`absolute right-2 top-2 z-10 rounded-md border border-border bg-background p-2 opacity-0 transition-opacity hover:bg-background-hover group-hover:opacity-100 ${isCopied ? 'cursor-not-allowed opacity-100' : ''}`}
        title="Copy code"
      >
        {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre ref={preRef} {...props} className={classNames}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-card" />
        {children}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card" />
      </pre>
    </div>
  );
}
