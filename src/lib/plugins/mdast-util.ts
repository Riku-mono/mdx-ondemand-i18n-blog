import { Node } from 'unist';
import { Link, Text, Paragraph } from 'mdast';

function isObject(target: unknown): target is { [key: string]: unknown } {
  return typeof target === 'object' && target !== null;
}

export function isNode(node: Node): node is Node {
  return isObject(node) && 'type' in node;
}

export function isParagraph(node: Node): node is Paragraph {
  return isNode(node) && node.type === 'paragraph';
}

export function isText(node: Node): node is Text {
  return isNode(node) && node.type === 'text';
}

export function isLink(node: Node): node is Link {
  return isNode(node) && node.type === 'link';
}

export function isNotHtmlAnchor(node: Link): boolean {
  return node.data?.hName != null && node.data?.hName !== 'a';
}

export function isSimpleUrlLink(paragraph: Paragraph): boolean {
  if (paragraph.children.length !== 1) return false;

  const link = paragraph.children[0];
  if (!isLink(link)) return false;

  if (isNotHtmlAnchor(link)) return false;

  if (link.children.length !== 1) return false;

  const text = link.children[0];
  if (!isText(text)) return false;

  return text.value === link.url;
}
