'use client';

import { fromHtml } from 'hast-util-from-html';
import { select } from 'hast-util-select';
import { toHtml } from 'hast-util-to-html';
import type { OEmbedRich as OEmbedRichSchema } from './oEmbedSchema';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';

/**
 * aspect-ratioが指定されているiframeのwidthとheightを100%に変更する
 */
const transform = (html: string) => {
  const hast = fromHtml(html);
  const iframe = select('iframe', hast);

  if (!iframe) return html;

  iframe.properties.title = 'oembed rich';

  const style = iframe.properties.style?.toString();
  const width = iframe.properties.width;
  const height = iframe.properties.height;

  if (style?.toString().includes('aspect-ratio:')) {
    iframe.properties.width = '100%';
    iframe.properties.height = '100%';
  } else if (width && height) {
    if (width === '100%' && height !== '100%') {
      iframe.properties.height = height;
    } else {
      iframe.properties.style = `aspect-ratio: ${width}/${height};`;
      iframe.properties.width = '100%';
      iframe.properties.height = '100%';
    }
  }

  return toHtml(hast);
};

interface OEmbedRichProps {
  oEmbed: OEmbedRichSchema & {
    thumbnails?: { url: string; width: number; height: number }[];
  };
}

export const OEmbedRich = (props: OEmbedRichProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    setLoaded(true);
  };
  let style = {};

  if (props.oEmbed.thumbnails && props.oEmbed.thumbnails.length > 0) {
    const thumbnail = props.oEmbed.thumbnails[0];
    style = {
      maxWidth: thumbnail.width,
      aspectRatio: `${thumbnail.width}/${thumbnail.height}`,
      backgroundImage: `url(${thumbnail.url})`,
    };
  } else {
    style = {
      maxWidth: props.oEmbed.thumbnail_width,
      aspectRatio: props.oEmbed.thumbnail_width + '/' + props.oEmbed.thumbnail_height,
      backgroundImage: `url(${props.oEmbed.thumbnail_url})`,
    };
  }

  return (
    <>
      {!loaded ? (
        <div
          className="relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border p-4"
          onClick={handleClick}
          style={{
            ...style,
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 z-0 rounded-md bg-black/50" />
          <p className="z-10 text-white">{props.oEmbed.title}</p>
          <button
            className="bg-card text-primary hover:bg-background z-10 cursor-pointer rounded-md border px-4 py-2 transition-colors"
            title="Click to load"
          >
            <RotateCw />
          </button>
          <a
            className="text-muted z-10 text-sm"
            href={props.oEmbed.provider_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.oEmbed.provider_url}
          </a>
        </div>
      ) : (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: transform(props.oEmbed.html) }}
          data-oembed
        />
      )}
    </>
  );
};
