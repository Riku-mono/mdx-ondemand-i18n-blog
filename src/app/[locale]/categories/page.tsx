import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { getCategoriesForLocale } from '@/lib/category';
import { CategoryCard } from '@/components/category/CategoryCard';

interface PageProps {
  params: Promise<{
    locale: LocaleTypes;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LocaleTypes }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Posts',
    description: `Posts for ${locale}`,
  };
}

export default async function PostsPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'category');

  const categories = await getCategoriesForLocale(locale);

  if (!categories) {
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-4xl dark:text-gray-100">
        {t('title')}
      </h1>
      <ul className="mt-4 flex gap-4">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </ul>
    </div>
  );
}
