import { LocaleTypes } from '@/i18n/i18nConfig';
import { createTranslation } from '@/i18n/i18nServer';

interface PageProps {
  params: Promise<{ locale: LocaleTypes }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await createTranslation(locale, 'home');

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4">
      <div className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="text-center text-4xl font-bold">{t('hello')}</h1>
      </div>
    </div>
  );
}
