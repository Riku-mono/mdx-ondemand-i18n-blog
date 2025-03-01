'use client';

import { useParams, usePathname } from 'next/navigation';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { useTranslation } from '@/i18n/i18nClient';
import LangSwitch from '@/components/langSwitch/LangSwitch';

const Header = () => {
  const locale = useParams().locale as LocaleTypes;
  const { t } = useTranslation(locale, 'navigation');
  const pathname = usePathname();

  return (
    <header className="bg-card z-50 h-16 border-b-2">
      <div className="max-w-wide container mx-auto flex h-16 items-center justify-between px-8">
        <a href={`/${locale}`}>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
        </a>
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-4 font-semibold">
            <li>
              <a href={`/${locale}/`} className={pathname === `/${locale}/` ? 'font-bold' : ''}>
                {t('home')}
              </a>
            </li>
            <li>
              <a
                href={`/${locale}/posts`}
                className={pathname === `/${locale}/posts` ? 'font-bold' : ''}
              >
                {t('posts')}
              </a>
            </li>
            <li>
              <a
                href={`/${locale}/categories`}
                className={pathname === `/${locale}/categories` ? 'font-bold' : ''}
              >
                {t('categories')}
              </a>
            </li>
            <li className="flex gap-2">
              <LangSwitch />
            </li>
          </ul>
        </nav>
        <nav className="block lg:hidden">
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
};

export default Header;
