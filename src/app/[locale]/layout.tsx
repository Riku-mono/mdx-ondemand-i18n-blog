import { Metadata } from 'next';
import siteMetadata from '@/contents/siteMetadata';
import { title, description } from '@/contents/siteLocaleMetadata';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { locales } from '@/i18n/i18nLocales';
import { dir } from 'i18next';
import { LocaleTypes } from '@/i18n/i18nConfig';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LocaleTypes }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: title[locale],
      template: `%s | ${title[locale]}`,
    },
    description: description[locale],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: LocaleTypes }>;
}) {
  const locale = (await params).locale;

  return (
    <html lang={locale} dir={dir(locale)} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-background font-sans antialiased`}
      >
        <main className="relative flex flex-1 flex-col gap-4 overflow-x-hidden p-4 md:gap-8 md:px-10">
          <main className="relative flex flex-1 flex-col gap-4 md:gap-8">{children}</main>
        </main>
      </body>
    </html>
  );
}
