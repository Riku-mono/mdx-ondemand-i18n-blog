import { Metadata } from 'next';
import { LocaleTypes } from '@/i18n/i18nConfig';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  return {
    title: `${t('posts')}`,
    description: `${t('posts')} ${locale}`,
  };
}

export default async function PostsPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  const filteredPosts = await getPostsForLocale(locale);

  const pageNumber = 1;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE * pageNumber);
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
