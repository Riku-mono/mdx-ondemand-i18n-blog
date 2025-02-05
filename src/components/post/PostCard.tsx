import { Post } from 'contentlayer/generated';
import { CategoryCard } from '../category/CategoryCard';

export type PostCardProps = {
  post: Post & { isFallback?: boolean };
  locale: string;
};

export const PostCard = ({ post, locale }: PostCardProps) => {
  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });

  return (
    <article className="animate-in fade-in-0 flex flex-row items-center gap-2 rounded-xl p-4 duration-1000 ease-out hover:bg-gray-800">
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
        <p className="text-fg-subtle prose text-pretty font-mono text-sm text-gray-400">
          {post.description}
        </p>
        <footer className="text-fg-subtle flex flex-row flex-wrap gap-2 text-xs font-semibold sm:gap-4 sm:text-sm">
          <div className="flex flex-row items-center gap-2">
            <span>投稿: {new Date(post.date).toDateString()}</span>
          </div>
          {post.lastupdated && (
            <div className="flex flex-row items-center gap-2">
              <span>最終更新: {post.lastupdated}</span>
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
