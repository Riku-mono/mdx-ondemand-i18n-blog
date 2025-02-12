import type { MDXComponents } from 'mdx/types';

import TwoGridLayout from './elm/CustomTwoGridLayout';

// 事前に提供しているコンポーネント
const defaultComponents = {
  TwoGridLayout,
};

export const components: MDXComponents = {
  code: (props) => <code {...props} />,
  ...defaultComponents,
};
