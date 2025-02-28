import { unfurl } from 'unfurl.js';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Metadata } from 'unfurl.js/dist/types';

type Props = HTMLAttributes<'a'> & {
  href: string;
  title?: string;
  description?: string;
  image?: string;
};

const getMetadata = async (href: string): Promise<Metadata | undefined> => {
  try {
    const url = new URL(href);
    return await unfurl(url.href);
  } catch (error) {
    console.warn('Failed to fetch metadata for link:', href, error);
    return undefined;
  }
};

const getTitle = (titleProps: string | undefined, metadata: Metadata, url: URL) => {
  return (
    titleProps ??
    metadata?.open_graph?.title ??
    metadata?.title ??
    metadata?.twitter_card?.title ??
    url.hostname
  );
};

const getDescription = (descriptionProps: string | undefined, metadata: Metadata) => {
  return (
    descriptionProps ??
    metadata?.open_graph?.description ??
    metadata?.description ??
    metadata?.twitter_card?.description
  );
};

const getImage = (imageProps: string | undefined, metadata: Metadata) => {
  return {
    url:
      imageProps ??
      metadata?.open_graph?.images?.[0]?.url ??
      metadata?.twitter_card?.images?.[0]?.url,
    alt: metadata?.open_graph?.images?.[0]?.alt ?? metadata?.twitter_card?.images?.[0]?.alt,
  };
};

export const CustomLinkCard = async (props: Props) => {
  const { href, title: titleProps, description: descriptionProps, image: imageProps } = props;
  const url = new URL(href ?? '');

  const metadata = await getMetadata(url.href);

  if (!metadata) {
    return (
      <div
        className="inline-block h-36 w-full overflow-hidden rounded-lg border border-border bg-card transition hover:bg-card-hover"
        data-oembed
      >
        <a
          className="not-prose flex min-h-full flex-row flex-wrap items-center"
          href={url.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-3 md:px-5">
            <p className="line-clamp-2 font-bold">{url.hostname}</p>
            <p className="line-clamp-3 text-xs text-muted">Could not fetch metadata</p>
          </div>
        </a>
      </div>
    );
  }

  const favicon = metadata?.favicon;
  const title = getTitle(titleProps, metadata, url);
  const description = getDescription(descriptionProps, metadata);
  const image = getImage(imageProps, metadata);

  const shouldInvertFavicon = ['github', 'example'].some((domain) => url.hostname.includes(domain));
  const hasImage = !!image.url;

  return (
    <div
      className="inline-block w-full overflow-hidden rounded-lg border border-border bg-card transition hover:bg-card-hover"
      data-oembed
    >
      <a
        className="not-prose flex min-h-full flex-col flex-wrap items-center sm:flex-row"
        href={url.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Link to external content"
      >
        {hasImage && (
          <div className="w-full shrink-0 sm:order-2 sm:w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              className="w-full bg-background object-contain sm:h-36 sm:w-auto sm:rounded-l-lg"
              alt={image.alt ?? ''}
              style={{ aspectRatio: '1200 / 630' }}
              loading="lazy"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 overflow-auto break-all p-3 md:order-1 md:p-5">
          <p className="line-clamp-2 text-sm font-bold sm:text-base">{title}</p>
          {description && <p className="line-clamp-3 text-xs text-muted">{description}</p>}
          <div className="flex flex-row items-center gap-2 text-xs">
            {favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={favicon}
                className={clsx('inline-block h-4 w-4', shouldInvertFavicon && 'dark:invert')}
                alt="Site favicon"
                loading="lazy"
              />
            ) : (
              <div className="h-4 w-4" />
            )}
            <p className="truncate text-muted">{url.hostname}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
