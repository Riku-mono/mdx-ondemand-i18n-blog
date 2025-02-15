import siteMetadata from '@/contents/siteMetadata';

export const dynamic = 'force-static';

const siteUrl = siteMetadata.siteUrl;

const robotsTxt = `User-Agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

export async function GET() {
  return new Response(robotsTxt, {
    headers: {
      'content-type': 'text/plain',
    },
  });
}
