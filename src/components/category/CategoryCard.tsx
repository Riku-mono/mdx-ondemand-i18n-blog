import Link from 'next/link';
import { Category } from 'contentlayer/generated';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
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
