import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { getCategoriesForLocale } from '@/lib/category';
import { PageLayout } from '@/components/layouts/PageLayout';

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
  const { t } = await createTranslation(locale, 'post');

  return {
    title: t('categories'),
    description: `${t('categories')} ${locale}`,
  };
}

export default async function PostsPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'post');

  const categories = await getCategoriesForLocale(locale);

  if (!categories) {
    return notFound();
  }

  return (
    <PageLayout>
      <div className="grid gap-8">
        <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl">
          {t('categories')}
        </h1>
        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/${locale}/categories/${category.slug}`}
                className={`flex flex-col space-y-4`}
              >
                <p
                  className={`items-center rounded-xl p-4 text-base font-bold text-neutral-100 transition-all hover:shadow-md ${category.className}`}
                >
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </p>
                <p className="text-sm text-gray-500">{category.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
