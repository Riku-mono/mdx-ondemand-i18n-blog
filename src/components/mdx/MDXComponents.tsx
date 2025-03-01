import type { MDXComponents } from 'mdx/types';
import { ContentComponents } from '@/contents/components/index';

import Pre from './elm/CustomPre';
import CustomLink from './elm/CustomLink';
import CustomOEmbed from './elm/oEmbed/CustomOEmbed';
import { CustomLinkCard } from './elm/CustomLinkCard';
import TwoGridLayout from './elm/CustomTwoGridLayout';
import TabLayout from './elm/CustomTabLayout';

// 事前に提供しているコンポーネント
const defaultComponents = {
  TabLayout,
  TwoGridLayout,
};

export const components: MDXComponents = {
  oembed: CustomOEmbed,
  'link-card': CustomLinkCard,
  a: CustomLink,
  code: (props) => <code {...props} />,
  pre: (props) => <Pre {...props} />,
  ...defaultComponents,
  ...ContentComponents,
};
