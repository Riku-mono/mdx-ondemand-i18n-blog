import Link from 'next/link';
import siteMetadata from '@/contents/siteMetadata';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { Post } from 'contentlayer/generated';
import { CategoryCard } from '@/components/category/CategoryCard';
import { TableOfContents } from '@/components/mdx/toc/TableOfContents';
import { MobileTableOfContentsButton } from '@/components/mdx/toc/MobileTableOfContentsButton';
import SubHeaderLayout from '@/components/navigation/SubHeaderLayout';
import { datetimeToLocaleString } from '@/lib/datetime';

interface PostLayoutProps {
  children: React.ReactNode;
  post: Post;
  locale: LocaleTypes;
  isFallback: boolean;
}

export default async function PostLayout({ children, post, locale, isFallback }: PostLayoutProps) {
  const { slug, icon, title, date, lastupdated, categories, tags } = post;
  const { t } = await createTranslation(locale, 'post');

  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
  const githubRepoUrl = siteMetadata.siteRepo;
  const githubEditUrl = `${githubRepoUrl}/edit/main/src/contents/posts/${locale}/${slug}`;
  const postedOn = datetimeToLocaleString(new Date(date), locale);
  const updatedOn = lastupdated ? datetimeToLocaleString(new Date(lastupdated), locale) : postedOn;

  return (
    <article className="mx-auto w-full space-y-8 md:space-y-10">
      <SubHeaderLayout mbOnly>
        <a className="text-sm font-bold" href={`/${locale}/posts`}>
          {'< .../'}
          {slug}
        </a>
        <MobileTableOfContentsButton title={t('tableOfContents')} />
      </SubHeaderLayout>
      <header className="max-w-content mx-auto space-y-4 px-4 text-center md:space-y-8 md:px-10">
        {icon && <p className="mb-2 text-4xl">{icon}</p>}
        <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 text-right">
          {categories.map((category) => (
            <CategoryCard key={category} slug={category} locale={locale} />
          ))}
          <p className="text-md text-muted">/</p>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/tags/${tag}`}
              className="bg-default group bg-card flex flex-row items-center gap-1 rounded-lg px-4 py-2 font-mono text-xs transition"
            >
              <span className="font-bold">#</span>
              <span className="group-hover:underline">{tag}</span>
            </Link>
          ))}
        </div>
        <div className="text-md grid grid-cols-1 gap-4 py-2 font-bold lg:grid-cols-3 lg:py-8">
          <div className="flex items-center justify-center gap-2 px-2 lg:flex-col">
            <p>{t('postedOn')}</p>
            <time dateTime={date}>{postedOn}</time>
          </div>
          <div className="flex items-center justify-center gap-2 px-2 lg:flex-col">
            <p>{t('updated')}</p>
            <time dateTime={date}>{updatedOn}</time>
          </div>
          <div className="flex items-center justify-center gap-2 px-2 lg:flex-col">
            <p>{t('readTime')}</p>
            <p>約 n 分</p>
          </div>
        </div>
        {/* <p>Revalidated at: {new Date().toLocaleString()}</p> */}

        {isFallback && (
          <div className="text-destructive mb-2 rounded-md border bg-red-200 p-2 text-sm">
            ※ {t('notTranslated')} {displayNames.of(locale)} {t('version')}.
          </div>
        )}
      </header>
      <div className="max-w-content mx-auto grid grid-cols-7 gap-4 px-8 md:px-10">
        <div className="mdx-post prose prose-neutral dark:prose-invert col-span-7 max-w-none lg:col-span-5">
          {children}
        </div>
        <aside className="col-span-2 col-end-8 hidden h-full lg:flex">
          <div className="w-full">
            <div className="sticky top-10 space-y-2">
              <div className="bg-card rounded-lg p-4">
                <h2 className="mb-2 text-lg font-bold">{t('tableOfContents')}</h2>
                <TableOfContents />
              </div>
              <a
                href="#"
                className="flex flex-row items-center rounded-lg border px-4 py-2 text-sm transition hover:underline"
              >
                {t('backToTop')}
              </a>
              <a
                href={githubEditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center rounded-lg border px-4 py-2 text-sm transition hover:underline"
              >
                {t('editPage')}
              </a>
            </div>
          </div>
        </aside>
      </div>
      <div className="max-w-content mx-auto flex flex-wrap py-4">
        <Link
          href={`/${locale}`}
          className="flex flex-row items-center rounded-lg px-4 py-2 text-sm transition hover:underline"
        >
          {'<'} {t('backToHome')}
        </Link>
      </div>
    </article>
  );
}
