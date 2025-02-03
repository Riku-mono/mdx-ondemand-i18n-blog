import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { getPostForLocale } from '@/lib/post';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { defaultLocale } from '@/i18n/i18nLocales';
import { createTranslation } from '@/i18n/i18nServer';
// import { Post } from 'contentlayer/generated';

export const dynamic = 'force-static';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    slug: string;
    locale: LocaleTypes;
  }>;
}

export async function generateStaticParams() {
  // const posts = allPosts;
  // return posts.map((post: Post) => ({
  //   slug: post.slug,
  // }));
  return [];
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  const { t } = await createTranslation(locale, 'post');
  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });

  let isFallback = false;

  const post = await getPostForLocale(locale, slug);
  if (!post) isFallback = true;
  const defaultLocalePost = await getPostForLocale(defaultLocale, slug);
  const displayPost = isFallback ? defaultLocalePost : post;
  if (!displayPost) {
    return notFound();
  }

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={displayPost.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(displayPost.date), 'yyyy年MM月dd日 HH時mm分')}
        </time>
        <h1 className="text-3xl font-bold">{displayPost.title}</h1>
        <p>Revalidated at: {new Date().toLocaleString()}</p>
        {isFallback && (
          <div className="mb-2 rounded-md border bg-red-200 p-2 text-xs text-red-700">
            ※ {t('notTranslated')} {displayNames.of(locale)} {t('version')}.
          </div>
        )}
      </div>
      <div
        className="[&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: displayPost.body.raw }}
      />
    </article>
  );
}
