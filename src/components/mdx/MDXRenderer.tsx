import { components } from '@/components/mdx/MDXComponents';
import { useMDXComponent } from 'next-contentlayer2/hooks';

const MDXRenderer = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);
  return <MDXContent components={components} />;
};

export default MDXRenderer;
