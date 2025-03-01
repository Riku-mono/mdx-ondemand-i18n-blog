import type { OEmbedPhoto as OEmbedPhotoSchema } from './oEmbedSchema';

interface OEmbedPhotoProps {
  oEmbed: OEmbedPhotoSchema;
}

export const OEmbedPhoto = (props: OEmbedPhotoProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.oEmbed.url}
      alt={props.oEmbed.title}
      className="block h-full w-full object-cover"
      loading="lazy"
      decoding="async"
      data-oembed
    />
  );
};
