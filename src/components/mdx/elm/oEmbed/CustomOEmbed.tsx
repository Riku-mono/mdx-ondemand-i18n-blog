import { OEmbedRich } from './OEmbedRich';
import type { OEmbed } from './oEmbedSchema';
import { CustomLinkCard } from '../CustomLinkCard';
import { OEmbedVideo } from './OEmbedVideo';
import { OEmbedPhoto } from './OEmbedPhoto';

interface CustomOEmbedProps {
  oEmbed: OEmbed;
  href: string;
}

const getProps = (props: CustomOEmbedProps) => {
  const oEmbed = JSON.parse(props.oEmbed as unknown as string);
  return { ...props, oEmbed };
};

export default function CustomOEmbed(props: CustomOEmbedProps) {
  const { oEmbed, href } = getProps(props);

  return oEmbed.type === 'photo' && oEmbed.url ? (
    <OEmbedPhoto oEmbed={oEmbed} />
  ) : oEmbed.type === 'video' && oEmbed.html ? (
    <OEmbedVideo oEmbed={oEmbed} />
  ) : oEmbed.type === 'rich' && oEmbed.html ? (
    <OEmbedRich oEmbed={oEmbed} />
  ) : (
    <CustomLinkCard
      href={href}
      title={oEmbed.title}
      description={oEmbed.description}
      image={oEmbed.thumbnail_url}
    />
  );
}
