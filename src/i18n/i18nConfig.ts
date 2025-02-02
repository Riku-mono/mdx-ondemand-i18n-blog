import { InitOptions } from 'i18next';
import { defaultLocale, locales as i18nLocales } from './i18nLocales';

export const locales = i18nLocales;
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = 'common';

export function getOptions(locale = defaultLocale, ns = defaultNS): InitOptions {
  return {
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    lng: locale,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    debug: false,
  };
}
