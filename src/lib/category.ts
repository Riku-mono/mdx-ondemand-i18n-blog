import { LocaleTypes } from '@/i18n/i18nConfig';
import { allCategories } from 'contentlayer/generated';

/**
 * locale に応じた category を取得する
 */
export const getCategoriesForLocale = async (locale: LocaleTypes) => {
  const categories = allCategories;
  return categories.filter((category) => category.language === locale);
};

/**
 * category の slug と locale に応じた category を取得する
 */
export const getCategoryForLocale = async (slug: string, locale: LocaleTypes) => {
  const categories = await getCategoriesForLocale(locale);
  const category = categories.find((category) => category.slug === slug);

  return category;
};
