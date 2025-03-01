/* eslint-disable */
'use client';

import { Post } from 'contentlayer/generated';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
}

interface LocaleCardProps {
  locale: string;
  isExists: boolean;
  hasError: boolean;
  data?: any; // 追加: データを格納する
  type: 'post' | 'category'; // 追加：post or category
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="flex flex-1 flex-col gap-2 rounded-xl p-4 hover:bg-gray-800">
      <div className="flex flex-row items-center justify-between gap-2">
        <h2 className="font-black">{post.title}</h2>{' '}
        <span className="text-sm">{`/${post.slug}`}</span>
      </div>
      <footer>
        <div>
          <span>投稿: {post.date}</span>
        </div>
        {post.lastupdated && (
          <div>
            <span>最終更新: {post.lastupdated}</span>
          </div>
        )}
      </footer>
    </article>
  );
};

// locale と 存在するかしないかと、問題があるかどうかを入力して表示する
const LocaleCard = ({ locale, isExists, hasError, data, type }: LocaleCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let displayContent;

  if (isExists && hasError) {
    displayContent = (
      <div
        className="flex cursor-pointer items-center rounded-md bg-yellow-300 px-2 py-1 text-black"
        onClick={handleClick}
      >
        <span>⚠️</span>
        <span>{locale}</span>
      </div>
    );
  } else if (hasError) {
    displayContent = (
      <div
        className="flex cursor-pointer items-center rounded-md bg-red-300 px-2 py-1 text-black"
        onClick={handleClick}
      >
        <span>❌</span>
        <span>{locale}</span>
      </div>
    );
  } else if (!isExists) {
    displayContent = (
      <div
        className="flex cursor-pointer items-center rounded-md bg-gray-500 px-2 py-1 text-black"
        onClick={handleClick}
      >
        <span className="font-bold">❌</span>
        <span>{locale}</span>
      </div>
    );
  } else {
    displayContent = (
      <div
        className="flex cursor-pointer items-center rounded-md bg-green-300 px-2 py-1 text-black"
        onClick={handleClick}
      >
        <span>✅</span>
        <span>{locale}</span>
      </div>
    );
  }

  return (
    <>
      {displayContent}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-black">
          <div className="relative">
            <div
              className="mt-20 max-w-3xl overflow-y-scroll rounded-md bg-white p-4"
              style={{ maxHeight: '80vh' }}
            >
              <h2 className="mb-2 text-xl font-bold">
                {locale} - {type === 'post' ? 'Post Data' : 'Category Data'}
              </h2>
              <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>{' '}
              {/* JSON を整形して表示 */}
            </div>
            <button
              onClick={handleCloseModal}
              className="absolute right-2 bottom-2 mt-4 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { PostCard, LocaleCard };
