import type { MDXComponents } from 'mdx/types';

import TwoGridLayout from './elm/CustomTwoGridLayout';
import Pre from './elm/CustomPre';
import TabLayout from './elm/CustomTabLayout';

// 事前に提供しているコンポーネント
const defaultComponents = {
  TabLayout,
  TwoGridLayout,
};

export const components: MDXComponents = {
  code: (props) => <code {...props} />,
  pre: (props) => <Pre {...props} />,
  ...defaultComponents,
};
