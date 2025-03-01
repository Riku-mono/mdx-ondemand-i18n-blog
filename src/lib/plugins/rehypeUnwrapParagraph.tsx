import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Parent, Root } from 'mdast';

/**
 * rehype plugin: Fixes invalid HTML by unwrapping p tags.
 *
 * This plugin removes p tags that contain only specific child elements
 * (oembed, link-card, iframe) to prevent invalid HTML structures where
 * block-level elements like div would be direct children of p tags.
 * This ensures HTML validation and maintains a correct document structure.
 */
export const rehypeUnwrapParagraph: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element, index, parent: Parent) => {
      if (node.tagName !== 'p') return;
      const children = node.children;
      if (children.length === 1 && children[0].tagName) {
        const child = children[0] as Element;
        const p = {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [],
        };
        if (
          child.tagName === 'oembed' ||
          child.tagName === 'link-card' ||
          child.tagName === 'iframe'
        ) {
          parent.children.splice(index! - 1, 1, p as unknown as Root['children'][number]);
          parent.children.splice(index!, 1, child as unknown as Root['children'][number]);
          parent.children.splice(index! + 1, 1, p as unknown as Root['children'][number]);
        }
      }
      return;
    });
  };
};
