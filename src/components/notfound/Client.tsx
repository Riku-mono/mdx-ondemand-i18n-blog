'use client';

import { LocaleTypes } from '@/i18n/i18nConfig';
import Button from './Button';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/i18nClient';

export default function NotFoundclient() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'notfound');

  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="pt-6 pb-8">
        <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl leading-normal font-bold md:text-2xl">{t('title')}</p>
        <p className="mb-8">{t('description')}</p>
        <Button href={`/${locale}`} text={t('back')} />
      </div>
    </div>
  );
}
