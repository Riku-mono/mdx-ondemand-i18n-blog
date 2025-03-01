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
      <pre ref={preRef} {...props} className={classNames}>
        <div className="from-card pointer-events-none absolute inset-y-0 left-0 w-4 bg-linear-to-r" />
        {children}
        <div className="from-card pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l" />
      </pre>
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className={`bg-background hover:bg-background-hover focus:ring-offset-card focus:ring-ring absolute top-2 right-2 z-10 rounded-md border p-2 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:outline-hidden ${isCopied ? 'cursor-not-allowed opacity-100' : ''}`}
        title="Copy code"
      >
        {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
