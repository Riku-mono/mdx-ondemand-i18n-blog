import { notFound } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { defaultLocale } from '@/i18n/i18nLocales';
import { getPageForLocale, getPagesForLocale } from '@/lib/pages';
import MDXRenderer from '@/components/mdx/MDXRenderer';
import BaseLayout from '@/components/layouts/BaseLayout';
import '@/styles/post.css';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: LocaleTypes;
  }>;
}

export async function generateStaticParams() {
  const defaultLocalePages = await getPagesForLocale(defaultLocale);
  return defaultLocalePages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  let isFallback = false;

  const page = await getPageForLocale(locale, slug);
  const defaultLocalePage = await getPageForLocale(defaultLocale, slug);

  if (!page) isFallback = true;
  if (!defaultLocalePage) return notFound();

  const displayPage = isFallback ? defaultLocalePage : page;
  if (!displayPage) return notFound();

  return (
    <BaseLayout page={displayPage} locale={locale} isFallback={isFallback}>
      <MDXRenderer code={displayPage.body.code} />
    </BaseLayout>
  );
}
