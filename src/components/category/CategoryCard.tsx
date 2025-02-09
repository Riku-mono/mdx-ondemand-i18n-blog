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
      className={`flex flex-row items-center gap-1 rounded-md px-2.5 py-1 text-sm font-bold text-neutral-100 transition sm:px-4 sm:text-base ${category.className}`}
    >
      <span>{category.icon}</span>
      <span>{category.title}</span>
    </Link>
  );
};
