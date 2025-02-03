import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';
import { PostCard } from '@/components/post/PostCard';
import { getPostsForLocale } from '@/lib/post';
import { getCategoriesForLocale } from '@/lib/category';
import { LATEST_POSTS_PER_PAGE } from '@/lib/constants';

interface PageProps {
  params: Promise<{ locale: LocaleTypes }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'home');

  const filteredPosts = await getPostsForLocale(locale);
  const categories = await getCategoriesForLocale(locale);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4">
      <div className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="text-center text-4xl font-bold">{t('hello')}</h1>
        <h1 className="text-4xl font-bold">{t('latestPosts')}</h1>
        <section className="grid w-full grid-cols-1 gap-8 rounded-lg border p-4">
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredPosts.slice(0, LATEST_POSTS_PER_PAGE).map((post) => (
              <li key={post.slug}>
                <PostCard post={post} categories={categories} locale={locale} />
              </li>
            ))}
          </ul>
          <a
            href={`/${locale}/posts`}
            className="flex w-full justify-center rounded-md border p-2 hover:bg-slate-400"
          >
            {t('viewAllPosts')}
          </a>
        </section>
      </div>
    </div>
  );
}
