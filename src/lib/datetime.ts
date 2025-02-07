import { LocaleTypes } from '@/i18n/i18nConfig';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'shortOffset',
  calendar: 'gregory',
};

export const datetimeToLocaleString = (datetime: Date, locale: LocaleTypes): string => {
  return datetime.toLocaleDateString(locale, postDateTemplate);
};
