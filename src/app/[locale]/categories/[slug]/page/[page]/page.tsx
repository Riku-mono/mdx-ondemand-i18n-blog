import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { defaultLocale, locales } from '@/i18n/i18nLocales';
import { getPostsForLocale } from '@/lib/post';
import { getCategoriesForLocale, getCategoryForLocale } from '@/lib/category';
import ListLayout from '@/components/post/PostListLayout';
import { POSTS_PER_PAGE } from '@/lib/constants';

interface PageProps {
  params: Promise<{
    slug: string;
    page: string;
    locale: LocaleTypes;
  }>;
}

export async function generateStaticParams() {
  const defaultLocaleCategories = await getCategoriesForLocale(defaultLocale);
  const totalPages = Math.ceil(defaultLocaleCategories.length / POSTS_PER_PAGE);
  const paths = locales.flatMap((locale) =>
    defaultLocaleCategories.map((category) =>
      Array.from({ length: totalPages }, (_, i) => ({
        params: { locale, page: (i + 1).toString(), slug: category },
      }))
    )
  );

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | undefined> {
  const { slug, page, locale } = await params;
  const { t } = await createTranslation(locale, 'post');
  const category = await getCategoryForLocale(slug, locale);

  if (!category) return;

  return {
    title: `${category.icon}${category.title} - ${page}`,
    description: `${t('posts')} ${category.icon}${category.title} - ${page}`,
  };
}

export default async function PostLayout({ params }: PageProps) {
  const { slug, page, locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  const filteredPosts = await getPostsForLocale(locale);
  const category = await getCategoryForLocale(slug, locale);
  if (!category) {
    return notFound();
  }

  const hitCategoryPosts = filteredPosts.filter((post) => post.categories.includes(category.slug));

  const pageNumber = parseInt(page as string);
  const totalPages = Math.ceil(hitCategoryPosts.length / POSTS_PER_PAGE);

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound();
  }
  const initialDisplayPosts = hitCategoryPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
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
