import { compareDesc } from 'date-fns';
import { defaultLocale } from '@/i18n/i18nLocales';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { allPosts } from 'contentlayer/generated';

/**
 * locale に応じた記事を取得し、defaultLocale に存在していて、locale に存在しない記事には翻訳前ラベルを付与して defaultLocale の記事を追加する
 * @param locale
 * @returns
 */
export const getPostsForLocale = async (locale: LocaleTypes, dev: boolean = false) => {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const defaultLocalePosts = posts.filter((post) => post.language === defaultLocale);
  const filteredPosts = posts.filter((post) => post.language === locale);

  defaultLocalePosts.forEach((defaultPost) => {
    if (!filteredPosts.find((post) => post.slug === defaultPost.slug)) {
      const newPost = { ...defaultPost, isFallback: true };

      let insertIndex = filteredPosts.findIndex(
        (post) => new Date(post.date) <= new Date(newPost.date)
      );
      if (insertIndex === -1) {
        insertIndex = filteredPosts.length;
      }

      filteredPosts.splice(insertIndex, 0, newPost);
    }
  });

  // 本番モードの場合は published が true の記事のみ返す
  if (dev) {
    return filteredPosts;
  }

  return filteredPosts.filter((post) => post.published);
};

export const getPostsForLocaleV2 = async (locale: LocaleTypes, dev: boolean = false) => {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const defaultLocalePosts = posts.filter((post) => post.language === defaultLocale);
  const filteredPosts = posts.filter((post) => post.language === locale);

  const mergedPosts = [
    ...filteredPosts,
    ...defaultLocalePosts.map((post) => ({ ...post, isFallback: true })),
  ];
  mergedPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  // 本番モードの場合は published が true の記事のみ返す
  if (dev) {
    return mergedPosts;
  }

  return mergedPosts.filter((post) => post.published);
};

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

// export const debugRunningsTime = async () => {
//   // getPostsForLocale 0.08314999999129213
//   const startTime = performance.now();
//   await getPostsForLocale(defaultLocale);
//   const endTime = performance.now();
//   console.log('getPostsForLocale', endTime - startTime);

//   // getPostsForLocaleV2 0.6981629999936558
//   const startTimeV2 = performance.now();
//   await getPostsForLocaleV2(defaultLocale);
//   const endTimeV2 = performance.now();
//   console.log('getPostsForLocaleV2', endTimeV2 - startTimeV2);
// };
