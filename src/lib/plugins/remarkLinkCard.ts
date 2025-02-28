import { type Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { isParagraph, isSimpleUrlLink } from './mdast-util';

export const remarkLinkCard: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'link', (link, index, paragraph) => {
      if (!paragraph || !isParagraph(paragraph)) return;
      if (!isSimpleUrlLink(paragraph)) return;

      if (!link.data) link.data = {};

      link.data.hName = 'link-card';
      link.children = [];
    });
  };
};
