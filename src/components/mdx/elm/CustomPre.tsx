'use client';

import { Check, Clipboard } from 'lucide-react';
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
        className="absolute right-2 top-2 z-10 size-8 rounded-md bg-card p-1 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {isCopied ? <Check className="text-green-400" /> : <Clipboard />}
      </button>
      <pre ref={preRef} {...props} className={classNames}>
        {children}
      </pre>
    </div>
  );
}
