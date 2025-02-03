import { LocaleTypes } from '@/i18n/i18nConfig';
import { allPosts } from 'contentlayer/generated';

/**
 * locale に応じた記事を取得する
 * @param locale
 * @param slug
 * @returns
 */
export const getPostForLocale = async (locale: LocaleTypes, slug: string) => {
  const post = allPosts.find((post) => post.slug === slug && post.language === locale);
  if (!post) {
    return null;
  }

  return post;
};
