import Link from 'next/link';
import siteMetadata from '@/contents/siteMetadata';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { getPostForLocale } from '@/lib/post';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { defaultLocale } from '@/i18n/i18nLocales';
import { createTranslation } from '@/i18n/i18nServer';
import { CategoryCard } from '@/components/category/CategoryCard';
import MDXRenderer from '@/components/mdx/MDXRenderer';
import SubHeaderLayout from '@/components/navigation/SubHeaderLayout';

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

  const githubRepoUrl = siteMetadata.siteRepo;
  const githubEditLink = `${githubRepoUrl}/edit/main/src/contents/posts/${displayPost.language}/${displayPost.slug}`;

  return (
    <article className="mx-auto w-full">
      <SubHeaderLayout mbOnly>
        <p className="text-lg font-bold">{t('tableOfContents')}</p>
        <p>{t('toc')}</p>
      </SubHeaderLayout>
      <header className="m-8 space-y-4 px-4 text-center md:px-10">
        {displayPost.icon && <p className="mb-2 text-4xl">{displayPost.icon}</p>}
        <h1 className="text-3xl font-bold md:text-4xl">{displayPost.title}</h1>
        <time dateTime={displayPost.date} className="mb-1 text-sm text-gray-200">
          {format(parseISO(displayPost.date), 'yyyy年MM月dd日 HH時mm分')}
        </time>
        <div className="flex flex-wrap items-center justify-center gap-2 text-right">
          {displayPost.categories.map((category) => (
            <CategoryCard key={category} slug={category} locale={locale} />
          ))}
          <p className="text-md text-gray-200">/</p>
          {displayPost.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/tags/${tag}`}
              className="bg-default hover:bg-muted group flex flex-row items-center gap-1 rounded-lg bg-zinc-900 px-4 py-2 font-mono text-xs transition hover:bg-zinc-800"
            >
              <span className="font-bold">#</span>
              <span className="group-hover:underline">{tag}</span>
            </Link>
          ))}
        </div>
        <p>Revalidated at: {new Date().toLocaleString()}</p>
        {isFallback && (
          <div className="mb-2 rounded-md border bg-red-200 p-2 text-xs text-red-700">
            ※ {t('notTranslated')} {displayNames.of(locale)} {t('version')}.
          </div>
        )}
      </header>
      <div className="mx-auto flex max-w-screen-xl justify-between gap-4 px-4 md:px-10">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <MDXRenderer code={displayPost.body.code} />
        </div>
        <aside>
          <div className="hidden h-full w-80 lg:block">
            <div className="sticky top-10">
              <div className="bg-bg-default rounded-lg bg-zinc-900 p-4">
                <h2 className="text-lg font-bold">{t('tableOfContents')}</h2>
              </div>
              <a
                href={githubEditLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-default hover:bg-bg-muted flex flex-row items-center gap-1 rounded-lg px-4 py-2 text-sm transition"
              >
                {t('editPage')}
              </a>
            </div>
          </div>
        </aside>
      </div>
      <div className="mx-auto flex max-w-screen-xl flex-wrap py-4">
        <Link
          href={`/${locale}`}
          className="bg-bg-default hover:bg-bg-muted m-1 flex flex-row items-center gap-1 rounded-lg px-4 py-2 text-sm transition"
        >
          {t('backToHome')}
        </Link>
        <a
          href="#"
          className="bg-bg-default hover:bg-bg-muted m-1 flex flex-row items-center gap-1 rounded-lg px-4 py-2 text-sm transition"
        >
          {t('backToTop')}
        </a>
      </div>
    </article>
  );
}
