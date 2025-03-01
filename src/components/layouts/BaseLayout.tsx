import siteMetadata from '@/contents/siteMetadata';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { Page } from 'contentlayer/generated';
import { TableOfContents } from '@/components/mdx/toc/TableOfContents';
import { MobileTableOfContentsButton } from '@/components/mdx/toc/MobileTableOfContentsButton';
import SubHeaderLayout from '@/components/navigation/SubHeaderLayout';
import { datetimeToLocaleString } from '@/lib/datetime';

interface BaseLayoutProps {
  children: React.ReactNode;
  page: Page;
  locale: LocaleTypes;
  isFallback: boolean;
}

export default async function BaseLayout({ children, page, locale, isFallback }: BaseLayoutProps) {
  const { slug, title, date, lastupdated, layout } = page;
  // layout = 'default' | 'full-width'
  const { t } = await createTranslation(locale, 'post');

  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
  const githubRepoUrl = siteMetadata.siteRepo;
  const githubEditUrl = `${githubRepoUrl}/edit/main/src/contents/posts/${locale}/${slug}`;
  const postedOn = datetimeToLocaleString(new Date(date), locale);
  const updatedOn = lastupdated ? datetimeToLocaleString(new Date(lastupdated), locale) : postedOn;

  return (
    <article className="mx-auto w-full space-y-8 md:space-y-10">
      <SubHeaderLayout mbOnly>
        <a className="text-sm font-bold" href={`/${locale}/`}>
          {'< .../'}
          {slug}
        </a>
        <MobileTableOfContentsButton title={t('tableOfContents')} />
      </SubHeaderLayout>
      <header className="max-w-content mx-auto space-y-4 px-4 text-center md:space-y-8 md:px-10">
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        {isFallback && (
          <div className="text-destructive mb-2 rounded-md border bg-red-200 p-2 text-sm">
            ※ {t('notTranslated')} {displayNames.of(locale)} {t('version')}.
          </div>
        )}
      </header>
      {layout === 'full-width' && (
        <div className="max-w-content mx-auto grid gap-4 px-8 md:px-10">
          <div className="mdx-post prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      )}
      {layout === 'default' && (
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
                <div className="space-y py-2 text-sm">
                  <p>
                    <span>{t('postedOn')} : </span>
                    <time dateTime={date}>{postedOn}</time>
                  </p>
                  <p>
                    <span>{t('updated')} : </span>
                    <time dateTime={date}>{updatedOn}</time>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </article>
  );
}
