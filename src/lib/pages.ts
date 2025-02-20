import { compareDesc } from 'date-fns';
import { defaultLocale } from '@/i18n/i18nLocales';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { allPages } from 'contentlayer/generated';

/**
 * locale に応じたページを取得
 *
 * defaultLocale のページを基準として、locale に存在しないページには翻訳前ラベルを付与して defaultLocale のページを追加
 * @param locale string 取得するページの言語
 * @param debug boolean? 開発モードかどうか (false の場合は published が true のページのみ返す)
 * @returns Page[]
 */
export const getPagesForLocale = async (locale: LocaleTypes, debug: boolean = false) => {
  const pages = debug ? allPages : allPages.filter((page) => page.published);
  const defaultLocalePages = pages.filter((page) => page.language === defaultLocale);
  const localePages = pages.filter((page) => page.language === locale);

  const displayablePages = defaultLocalePages.map((defaultPage) => {
    return (
      localePages.find((page) => page.slug === defaultPage.slug) || {
        ...defaultPage,
        isFallback: true,
      }
    );
  });

  return displayablePages.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
};

/**
 * locale に応じたページを取得
 * @param locale string 取得するページの言語
 * @param slug string 取得するページのスラッグ
 * @param debug boolean? 開発モードかどうか (false の場合は published が true のページのみ返す)
 * @returns Page | null
 **/
export const getPageForLocale = async (
  locale: LocaleTypes,
  slug: string,
  debug: boolean = false
) => {
  const page = allPages.find(
    (page) => page.slug === slug && page.language === locale && (debug || page.published)
  );
  if (!page) {
    return null;
  }

  return page;
};
