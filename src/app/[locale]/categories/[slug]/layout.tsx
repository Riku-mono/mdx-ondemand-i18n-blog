import Link from 'next/link';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { defaultLocale, locales } from '@/i18n/i18nLocales';
import { getCategoriesForLocale } from '@/lib/category';
import '@/styles/category.css';

interface CategoriesLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    locale: LocaleTypes;
  }>;
}

export async function generateStaticParams() {
  const defaultLocaleCategories = await getCategoriesForLocale(defaultLocale);
  const paths = locales.flatMap((locale) =>
    defaultLocaleCategories.map((category) => ({
      params: { locale, slug: category.slug },
    }))
  );

  return paths;
}

export default async function CategoriesLayout({ children, params }: CategoriesLayoutProps) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const categories = await getCategoriesForLocale(locale);

  return (
    <>
      <nav className="category-nav mx-auto my-10 w-full max-w-screen-xl px-4 md:px-10">
        <ul className="flex flex-wrap gap-2 border-b border-border pb-4">
          {categories.map((category) =>
            category.slug === slug ? (
              <li key={category.slug}>
                <Link
                  href={`/${locale}/categories/${category.slug}`}
                  className={`is-active rounded-md bg-card px-4 py-2 text-sm font-bold`}
                >
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </Link>
              </li>
            ) : (
              <li key={category.slug}>
                <Link
                  href={`/${locale}/categories/${category.slug}`}
                  className={`rounded-md bg-transparent px-4 py-2 text-sm font-bold text-muted transition-colors hover:text-neutral-100 ${category.className}`}
                >
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
      {children}
    </>
  );
}
