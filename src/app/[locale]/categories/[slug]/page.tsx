import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { getPostsForLocale } from '@/lib/post';
import { getCategoriesForLocale, getCategoryForLocale } from '@/lib/category';
import ListLayout from '@/components/post/PostListLayout';
import { POSTS_PER_PAGE } from '@/lib/constants';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: LocaleTypes;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | undefined> {
  const { slug, locale } = await params;
  const { t } = await createTranslation(locale, 'post');
  const category = await getCategoryForLocale(slug, locale);

  if (!category) return;

  return {
    title: `${category.icon}${category.title}`,
    description: `${t('posts')} ${category.icon}${category.title}`,
  };
}

export default async function PostLayout({ params }: PageProps) {
  const { slug, locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  const filteredPosts = await getPostsForLocale(locale);
  const categories = await getCategoriesForLocale(locale);

  const category = categories.find((category) => category.slug === slug);
  if (!category) {
    return notFound();
  }

  const hitCategoryPosts = filteredPosts.filter((post) => post.categories.includes(category.slug));

  const pageNumber = 1;
  const totalPages = Math.ceil(hitCategoryPosts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = hitCategoryPosts.slice(0, POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages,
  };

  return (
    <>
      <ListLayout
        locale={locale}
        posts={hitCategoryPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        i18n={{
          title: `${category.icon}${category.title}`,
          notfound: t('notfound'),
          searchPlaceholder: t('searchPlaceholder'),
          prevPageText: t('prevPageText'),
          nextPageText: t('nextPageText'),
        }}
      />
    </>
  );
}
