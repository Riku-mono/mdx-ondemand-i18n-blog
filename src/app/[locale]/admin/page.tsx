// Blog 管理用のページ
// development でのみ利用可能
/* eslint-disable */

import { CategoryCard } from '@/components/category/CategoryCard';
import { defaultLocale, locales } from '@/i18n/i18nLocales';
import { getCategoriesForLocale } from '@/lib/category';
import { getPostsForLocale } from '@/lib/post';
import { allCategories, allPosts, Post } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { LocaleCard, PostCard } from './Card';
import { PageLayout } from '@/components/layouts/PageLayout';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const areArraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const checkDataEquality = (data1: any, data2: any, keysToCheck: (keyof any)[]): boolean => {
  return keysToCheck.some((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const isEqual = Array.isArray(value1) ? areArraysEqual(value1, value2) : value1 === value2;

    if (!isEqual) {
      console.warn(key, value1, value2);
    }
    return !isEqual;
  });
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="border-b-2 pb-2 text-xl font-bold">{children}</h3>;
}
function Li({ children }: { children: React.ReactNode }) {
  return <li className="mt-4 flex justify-between gap-2">{children}</li>;
}

export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;
  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });

  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  const defaultLocalePosts = await getPostsForLocale(defaultLocale, true);
  const defaultLocaleCategories = await getCategoriesForLocale(defaultLocale);

  const defaultLocalePostsPublished = defaultLocalePosts.filter((post) => post.published);
  const defaultLocalePostsUnpublished = defaultLocalePosts.filter((post) => !post.published);

  const renderLocaleCards = (data: any, keysToCheck: (keyof any)[], type: 'post' | 'category') =>
    locales.map((locale) => {
      const dataForLocale =
        type === 'post'
          ? allPosts.find((p) => p.slug === data.slug && p.language === locale)
          : allCategories.find((c) => c.slug === data.slug && c.language === locale);
      const isExists = !!dataForLocale;
      const hasError = isExists && checkDataEquality(data, dataForLocale, keysToCheck);

      return (
        <LocaleCard
          key={locale}
          locale={locale}
          isExists={isExists}
          hasError={hasError}
          data={dataForLocale}
          type={type}
        />
      );
    });

  const postKeysToCheck: Array<keyof Post> = [
    'published',
    'icon',
    'date',
    'lastupdated',
    'categories',
  ];

  const categoryKeysToCheck: Array<keyof (typeof defaultLocaleCategories)[0]> = [
    'className',
    'icon',
  ];

  return (
    <PageLayout>
      <div className="grid gap-8">
        <h1 className="text-4xl font-black">管理用画面</h1>
        <section>
          <H2>ロケール一覧</H2>
          <div className="flex flex-row gap-2">
            {locales.map((locale) => (
              <LocaleCard
                key={locale}
                locale={locale}
                isExists={true}
                hasError={false}
                data={locale}
                type={'post'}
              />
            ))}
          </div>
        </section>

        <section>
          <H2>記事一覧</H2>
          <p className="text-muted space-y-4 py-3 text-sm">
            <span>{displayNames.of(defaultLocale)} の記事を元に、比較しています。</span>
            <br />
            <span>以下の properties の値が異なる場合は、エラーが表示されます:</span>
            <span className="flex gap-2">
              {postKeysToCheck.map((key) => (
                <code
                  key={key}
                  className="border-border bg-card rounded-md border px-1 py-0.5 text-sm"
                >
                  {key}
                </code>
              ))}
            </span>
          </p>
          {/* emoji */}
          <H3>公開中の記事🌐</H3>
          <ul>
            {defaultLocalePostsPublished.map((post) => (
              <Li key={post.slug}>
                <PostCard post={post} />
                <div className="flex gap-2">{renderLocaleCards(post, postKeysToCheck, 'post')}</div>
              </Li>
            ))}
          </ul>
          <H3>非公開の記事🚧</H3>
          <ul>
            {defaultLocalePostsUnpublished.map((post) => (
              <Li key={post.slug}>
                <PostCard post={post} />
                <div className="flex gap-2">{renderLocaleCards(post, postKeysToCheck, 'post')}</div>
              </Li>
            ))}
          </ul>
          <H3>不正な記事❌</H3>
          <p className="text-muted text-sm">
            {displayNames.of(defaultLocale)} が存在しないため、表示されません
          </p>
          <ul>
            {allPosts
              .filter((post) => !defaultLocalePosts.some((p) => p.slug === post.slug))
              .map((post) => (
                <Li key={post.slug}>
                  <PostCard post={post} />
                  <div className="flex gap-2">
                    {renderLocaleCards(post, postKeysToCheck, 'post')}
                  </div>
                </Li>
              ))}
          </ul>
        </section>
        <section>
          <H2>カテゴリ一覧</H2>
          <ul>
            {defaultLocaleCategories.map((category) => (
              <Li key={category.slug}>
                <CategoryCard slug={category.slug} locale={defaultLocale} />
                <div className="flex gap-2">
                  {renderLocaleCards(category, categoryKeysToCheck, 'category')}
                </div>
              </Li>
            ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
