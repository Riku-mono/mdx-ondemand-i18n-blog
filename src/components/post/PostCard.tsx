import { Post } from 'contentlayer/generated';
import { CategoryCard } from '../category/CategoryCard';
import { datetimeToLocaleString } from '@/lib/datetime';

export type PostCardProps = {
  post: Post & { isFallback?: boolean };
  locale: string;
};

export const PostCard = ({ post, locale }: PostCardProps) => {
  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
  const postedOn = datetimeToLocaleString(new Date(post.date), locale);
  const updatedOn = post.lastupdated
    ? datetimeToLocaleString(new Date(post.lastupdated), locale)
    : null;

  return (
    <article className="fade-in-0 hover:bg-card flex flex-row items-center gap-2 rounded-xl p-4 transition-colors">
      {/* <div className="bg-fg-subtle text-bg-primary flex h-full flex-col items-center justify-center rounded-full p-4 text-4xl sm:text-6xl">
        {post.icon == null ? '📄' : post.icon}
      </div> */}
      <div className="my-1 flex flex-col gap-2 sm:gap-3">
        <header>
          <div className="flex flex-row flex-wrap gap-2">
            {post.categories.map((category) => (
              <CategoryCard key={category} slug={category} locale={locale} />
            ))}
          </div>
        </header>
        <a href={`/${locale}/posts/${post.slug}`}>
          <h2 className="text-lg font-black hover:underline sm:text-xl md:text-2xl">
            {post.title}
          </h2>
        </a>
        <p className="text-fg-subtle prose text-muted font-mono text-sm font-bold text-pretty">
          {post.description}
        </p>
        <footer className="text-fg-subtle flex flex-row flex-wrap gap-2 text-xs font-semibold sm:gap-4 sm:text-sm">
          <div className="flex flex-row items-center gap-2">
            <span>投稿: {postedOn}</span>
          </div>
          {updatedOn && (
            <div className="flex flex-row items-center gap-2">
              <span>最終更新: {updatedOn}</span>
            </div>
          )}
          {post.isFallback && (
            <div className="text-xs text-red-500">※ {displayNames.of(post.language)}</div>
          )}
        </footer>
      </div>
    </article>
  );
};
