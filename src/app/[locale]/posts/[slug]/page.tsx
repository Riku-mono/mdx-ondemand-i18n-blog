import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostForLocale } from '@/lib/post';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { defaultLocale } from '@/i18n/i18nLocales';
import PostLayout from '@/components/post/PostLayout';
import MDXRenderer from '@/components/mdx/MDXRenderer';
import '@/styles/post.css';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata | undefined> {
  const { slug, locale } = await params;
  const post = await getPostForLocale(locale, slug);
  const defaultLocalePost = await getPostForLocale(defaultLocale, slug);
  if (!defaultLocalePost) return;

  if (!post) {
    return {
      title: defaultLocalePost.title,
      description: defaultLocalePost.description,
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  let isFallback = false;

  const post = await getPostForLocale(locale, slug);
  const defaultLocalePost = await getPostForLocale(defaultLocale, slug);

  if (!post) isFallback = true;
  if (!defaultLocalePost) return notFound();

  const displayPost = isFallback ? defaultLocalePost : post;
  if (!displayPost) {
    return notFound();
  }

  return (
    <PostLayout post={displayPost} locale={locale} isFallback={isFallback}>
      <MDXRenderer code={displayPost.body.code} />
    </PostLayout>
  );
}
