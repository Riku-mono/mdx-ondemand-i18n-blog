import Link from 'next/link';

// カスタムリンクコンポーネント
export default function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href || '';

  const isInternal = href && href.startsWith('/');
  const isAnchor = href && href.startsWith('#');

  if (isInternal) {
    return <Link href={href} {...props} />;
  }

  if (isAnchor) {
    return <a {...props} />;
  }

  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="after:i-lucide-external-link after:ml-0.5"
    />
  );
}
