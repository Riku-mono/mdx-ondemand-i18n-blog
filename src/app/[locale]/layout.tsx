import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import siteMetadata from '@/contents/siteMetadata';
import { title, description } from '@/contents/siteLocaleMetadata';
import { dir } from 'i18next';
import { locales } from '@/i18n/i18nLocales';
import { LocaleTypes } from '@/i18n/i18nConfig';
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google';
import '../../styles/globals.css';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
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
    <html
      lang={locale}
      dir={dir(locale)}
      className="scroll-pt-16 scroll-smooth lg:scroll-pt-4"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.className} ${geistMono.className} ${notoSansJP.className} bg-background text-primary flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
