import { type Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { unfurl } from 'unfurl.js';
import { isParagraph, isSimpleUrlLink } from './mdast-util';

export type headingProperties = Record<string, string>;

export type Transformer = {
  hName: string | ((url: URL) => Promise<string>);
  hProperties?: headingProperties | ((url: URL) => Promise<headingProperties>);
  match: (url: URL) => Promise<boolean>;
};

export type RemarkOEmbedPluginOptions = {
  transformers: Transformer[];
};

const defaultOptions: RemarkOEmbedPluginOptions = {
  transformers: [],
};

// 他で match しなかった場合のデフォルトの transformer
// url 先が oEmbed に対応しているかどうかをチェックする
export const oEmbedTransformer: Readonly<Transformer> = {
  hName: async (url) => {
    const metadata = await unfurl(url.href);
    return metadata.oEmbed != null ? 'oembed' : 'link-card';
  },
  hProperties: async (url) => {
    const metadata = await unfurl(url.href);
    if (metadata.oEmbed != null) return { oEmbed: JSON.stringify(metadata.oEmbed) };
    return { url: url.href } as headingProperties;
  },
  match: async () => true, // Always match as fallback
};

export const youTubeTransformer: Readonly<Transformer> = {
  hName: 'iframe',
  hProperties: async (url): Promise<headingProperties> => {
    const convertToEmbedUrl = (url: string): string => {
      const match = url.match(/^.*(watch\?v=|embed\/)([^#&?]*).*/);

      if (match && match[2]) {
        return 'https://www.youtube.com/embed/' + match[2];
      } else {
        throw new Error('Invalid YouTube URL');
      }
    };

    return {
      src: convertToEmbedUrl(url.href),
      width: '100%',
      style: 'aspect-ratio: 16/9; border-radius: 1rem; border: 2px solid var(--border);',
      loading: 'lazy',
      title: 'YouTube video embed',
    };
  },
  match: async (url) => {
    return url.hostname === 'www.youtube.com';
  },
};

export const remarkOEmbed: Plugin<[RemarkOEmbedPluginOptions?], Root> = (
  options = defaultOptions
) => {
  return async (tree, file) => {
    const transforms: Promise<void>[] = [];

    visit(tree, 'link', (link, index, paragraph) => {
      if (!paragraph || !isParagraph(paragraph)) return;
      if (!isSimpleUrlLink(paragraph)) return;

      const url = new URL(link.url);

      const transform = async () => {
        for (const transformer of options.transformers) {
          if (!(await transformer.match(url))) continue;

          if (!link.data) link.data = {};

          link.data.hName = await getHName(transformer, url);
          link.data.hProperties = {
            ...(link.data?.hProperties ?? {}),
            ...(await getHProperties(transformer, url)),
            url: link.url,
          };
          return;
        }
      };
      transforms.push(
        transform().catch((e) => {
          file.message(
            `[ERROR] Failed to embed ${link.url} in ${file.path} at line ${link.position?.start?.line}; ${String(e)}`,
            link.position,
            'remarkEmbed'
          );
        })
      );
    });

    await Promise.all(transforms);
  };
};

const getHName = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hName === 'function') return transformer.hName(url);
  return transformer.hName;
};

const getHProperties = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hProperties === 'function') return transformer.hProperties(url);
  return transformer.hProperties;
};
