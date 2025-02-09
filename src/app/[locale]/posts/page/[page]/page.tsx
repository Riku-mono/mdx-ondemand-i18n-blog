import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { defaultLocale, locales } from '@/i18n/i18nLocales';
import { createTranslation } from '@/i18n/i18nServer';
import { getPostsForLocale } from '@/lib/post';
import ListLayout from '@/components/post/PostListLayout';
import { POSTS_PER_PAGE } from '@/lib/constants';

interface PageProps {
  params: Promise<{
    page: string;
    locale: LocaleTypes;
  }>;
}

export async function generateStaticParams() {
  const defaultLocalePosts = await getPostsForLocale(defaultLocale);
  const totalPages = Math.ceil(defaultLocalePosts.length / POSTS_PER_PAGE);
  const paths = locales.flatMap((locale) =>
    Array.from({ length: totalPages }, (_, i) => ({
      params: { locale, page: (i + 1).toString() },
    }))
  );

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page, locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  return {
    title: `${t('posts')} - ${page}`,
    description: `${t('posts')} ${locale} - ${page}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { page, locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  const filteredPosts = await getPostsForLocale(locale);

  const pageNumber = parseInt(page as string);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound();
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages,
  };

  return (
    <ListLayout
      locale={locale}
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      i18n={{
        title: t('posts'),
        notfound: t('notfound'),
        searchPlaceholder: t('searchPlaceholder'),
        prevPageText: t('prevPageText'),
        nextPageText: t('nextPageText'),
      }}
    />
  );
}
