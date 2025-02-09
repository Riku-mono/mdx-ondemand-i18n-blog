'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import siteMetadata from '@/contents/siteMetadata';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { useTranslation } from '@/i18n/i18nClient';
import { ThemeToggle } from '@/components/provider/ThemeToggle';

const Footer = () => {
  const locale = useParams().locale as LocaleTypes;
  const { t } = useTranslation(locale, 'navigation');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card px-6 py-4">
      <div className="container mx-auto flex min-h-64 flex-col items-center justify-between md:flex-row">
        <div className="text-sm">
          &copy; {currentYear} {siteMetadata.company}
        </div>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <Link href={`/${locale}/posts`} className="hover:text-gray-300">
            {t('posts')}
          </Link>
          <Link href={`/${locale}/categories`} className="hover:text-gray-300">
            {t('categories')}
          </Link>
          <Link href={`/${locale}/tags`} className="hover:text-gray-300">
            {t('tags')}
          </Link>
        </div>
        <div className="mt-4 text-sm md:mt-0">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
