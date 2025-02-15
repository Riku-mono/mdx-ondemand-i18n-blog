import { NextResponse } from 'next/server';
import siteMetadata from '@/contents/siteMetadata';
import { defaultLocale, locales } from '@/i18n/i18nLocales';
import { getPostsForLocale } from '@/lib/post';
import { getPagesForLocale } from '@/lib/pages';
import { POSTS_PER_PAGE } from '@/lib/constants';

export const dynamic = 'force-static';

interface Route {
  url: string;
  lastModified: string;
  alternates: {
    languages: Record<string, string>;
  };
}

async function generateSitemapXml() {
  const siteUrl = siteMetadata.siteUrl;
  const today = new Date().toISOString().split('T')[0];

  const defaultLocalePosts = await getPostsForLocale(defaultLocale);
  const totalPages = Math.ceil(defaultLocalePosts.length / POSTS_PER_PAGE);

  const rootRoute = {
    url: siteUrl,
    lastModified: today,
    alternates: {
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `${siteMetadata.siteUrl}/${locale}/`,
        }),
        {}
      ),
    },
    // priority: 1,
  };

  const subRoutes = ['categories'].map((subRoute) => {
    return {
      url: `${siteUrl}/${subRoute}`,
      lastModified: today,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: `${siteUrl}/${locale}/${subRoute}`,
          }),
          {}
        ),
      },
      // priority: 0.6,
    };
  });

  const postsRoutes = [
    {
      url: `${siteUrl}/posts`,
      lastModified: today,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: `${siteUrl}/${locale}/posts`,
          }),
          {}
        ),
      },
      // priority: 0.7,
    },
    ...Array.from({ length: totalPages - 1 }, (_, i) => ({
      url: `${siteUrl}/posts/page/${i + 2}`,
      lastModified: today,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: `${siteUrl}/${locale}/posts/page/${i + 2}`,
          }),
          {}
        ),
      },
      // priority: 0.7,
    })),
  ];

  const postRoutes = defaultLocalePosts.map((post) => {
    return {
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: post.lastupdated || post.date,
      alternates: {
        languages: locales.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: `${siteUrl}/${locale}/posts/${post.slug}`,
          }),
          {}
        ),
      },
      // priority: 0.8,
    };
  });

  const pageRoutes = await getPagesForLocale(defaultLocale).then((pages) => {
    return pages.map((page) => {
      return {
        url: `${siteUrl}/${page.slug}`,
        lastModified: page.lastupdated || page.date,
        alternates: {
          languages: locales.reduce(
            (acc, locale) => ({
              ...acc,
              [locale]: `${siteUrl}/${locale}/${page.slug}`,
            }),
            {}
          ),
        },
        // priority: 0.8,
      };
    });
  });

  const routes: Route[] = [rootRoute, ...subRoutes, ...pageRoutes, ...postsRoutes, ...postRoutes];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${routes
    .map((route) => {
      return `<url>
        <loc>${route.url}</loc>
        ${Object.entries(route.alternates.languages)
          .map(([locale, url]) => {
            return `<xhtml:link rel="alternate" hreflang="${locale}" href="${url}" />`;
          })
          .join('')}
        <lastmod>${route.lastModified}</lastmod>
      </url>`;
    })
    .join('')}
  </urlset>`;
}

export async function GET() {
  const sitemap = await generateSitemapXml();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
