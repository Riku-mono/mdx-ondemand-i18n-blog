import { compareDesc } from 'date-fns';
import { defaultLocale } from '@/i18n/i18nLocales';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { allPosts } from 'contentlayer/generated';

/**
 * locale に応じた記事を取得
 *
 * defaultLocale の記事を基準として、locale に存在しない記事には翻訳前ラベルを付与して defaultLocale の記事を追加
 * @param locale string 取得する記事の言語
 * @param debug boolean? 開発モードかどうか (false の場合は published が true の記事のみ返す)
 * @returns Post[]
 */
export const getPostsForLocale = async (locale: LocaleTypes, debug: boolean = false) => {
  // const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const posts = debug ? allPosts : allPosts.filter((post) => post.published);
  const defaultLocalePosts = posts.filter((post) => post.language === defaultLocale);
  const localePosts = posts.filter((post) => post.language === locale);

  const displayablePosts = defaultLocalePosts.map((defaultPost) => {
    return (
      localePosts.find((post) => post.slug === defaultPost.slug) || {
        ...defaultPost,
        isFallback: true,
      }
    );
  });

  return displayablePosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
};

/**
 * locale に応じた記事を取得
 * @param locale string 取得する記事の言語
 * @param slug string 取得する記事のスラッグ
 * @param debug boolean? 開発モードかどうか (false の場合は published が true の記事のみ返す)
 * @returns Post | null
 **/
export const getPostForLocale = async (
  locale: LocaleTypes,
  slug: string,
  debug: boolean = false
) => {
  const post = allPosts.find(
    (post) => post.slug === slug && post.language === locale && (debug || post.published)
  );
  if (!post) {
    return null;
  }

  return post;
};
