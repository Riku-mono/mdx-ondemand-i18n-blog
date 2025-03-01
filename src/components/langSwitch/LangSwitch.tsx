import { useState, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LocaleTypes, locales } from '@/i18n/i18nConfig';

const LangSwitch = () => {
  const pathname = usePathname();
  // const params = useParams();
  // const locale = (params.locale as string) || '';
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menubarRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = useCallback(
    (newLocale: string): string => {
      const segments = pathname!.split('/');
      const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes));
      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }
      const newPath = segments.join('/').replace(/\/$/, '');
      return newPath;
    },
    [pathname]
  );

  const handleLinkClick = useCallback(
    (newLocale: string) => {
      const resolvedUrl = handleLocaleChange(newLocale);
      router.push(resolvedUrl);
      setIsMenuOpen(false);
    },
    [handleLocaleChange, router]
  );

  // const currentLocale = useMemo(() => {
  //   return new Intl.DisplayNames(locale, { type: 'language' }).of(locale);
  // }, [locale]);

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          aria-label="Change language menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:ring-focus border-border bg-background text-primary hover:bg-background/50 inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <span className="i-lucide-languages h-6 w-6"></span>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="bg-background absolute right-0 mt-2 w-56 origin-top-right rounded-md border shadow-lg ring-1 ring-black/5 focus:outline-hidden">
          <div className="py-1">
            {locales.map((locale) => (
              <a
                key={locale}
                href={handleLocaleChange(locale)}
                className="hover:bg-card block px-4 py-2 text-sm transition-colors"
                onClick={() => handleLinkClick(locale)}
              >
                {new Intl.DisplayNames(locale, { type: 'language' }).of(locale)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSwitch;
