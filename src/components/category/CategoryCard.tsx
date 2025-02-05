import Link from 'next/link';
import { allCategories, Category } from 'contentlayer/generated';

interface CategoryCardProps {
  slug: string;
  locale: string;
}

export const CategoryCard = ({ slug, locale }: CategoryCardProps) => {
  const category = allCategories.find((c) => c.slug === slug && c.language === locale) as Category;

  return (
    <Link
      href={`/${category.language}/categories/${category.slug}`}
      className={`flex flex-row items-center gap-1 rounded-md bg-blue-500 px-2.5 py-1 text-sm font-bold text-white transition hover:bg-blue-400 sm:px-4 sm:text-base ${category.className}`}
    >
      <div>{category.icon}</div>
      <div>{category.title}</div>
    </Link>
  );
};
