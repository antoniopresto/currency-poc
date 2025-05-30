import Dinero, { Currency } from 'dinero.js';

import { keyBy, Merge } from 'powership';

export type { Currency };
export type CurrencyOption = { code: Currency; emoji: string; label: string };
export type CurrencySelection = Merge<CurrencyOption, { amount: string }>;

export type FormatCurrencyInput = {
  amount: string | number;
  currency: Currency;
};

export function formatCurrency(input: FormatCurrencyInput) {
  const precision = 2;
  const amount = +`${input.amount}`.replace(/[^\d.]/g, '');

  const amountInMinimalUnit = Math.round(amount * Math.pow(10, precision));

  return Dinero({
    amount: amountInMinimalUnit,
    currency: input.currency,
    precision: precision,
  }).toFormat();
}

const currencies = [
  // Fiat Currencies (ISO 4217)
  { code: 'USD', emoji: '🇺🇸', label: 'US Dollar' },
  { code: 'EUR', emoji: '🇪🇺', label: 'Euro' },
  { code: 'JPY', emoji: '🇯🇵', label: 'Japanese Yen' },
  { code: 'GBP', emoji: '🇬🇧', label: 'British Pound' },
  { code: 'CNY', emoji: '🇨🇳', label: 'Chinese Yuan' },
  { code: 'AUD', emoji: '🇦🇺', label: 'Australian Dollar' },
  { code: 'CAD', emoji: '🇨🇦', label: 'Canadian Dollar' },
  { code: 'CHF', emoji: '🇨🇭', label: 'Swiss Franc' },
  { code: 'HKD', emoji: '🇭🇰', label: 'Hong Kong Dollar' },
  { code: 'SGD', emoji: '🇸🇬', label: 'Singapore Dollar' },
  { code: 'SEK', emoji: '🇸🇪', label: 'Swedish Krona' },
  { code: 'NZD', emoji: '🇳🇿', label: 'New Zealand Dollar' },
  { code: 'KRW', emoji: '🇰🇷', label: 'South Korean Won' },
  { code: 'INR', emoji: '🇮🇳', label: 'Indian Rupee' },
  { code: 'BRL', emoji: '🇧🇷', label: 'Brazilian Real' },
  { code: 'MXN', emoji: '🇲🇽', label: 'Mexican Peso' },
  { code: 'RUB', emoji: '🇷🇺', label: 'Russian Ruble' },
  { code: 'ZAR', emoji: '🇿🇦', label: 'South African Rand' },
  { code: 'TRY', emoji: '🇹🇷', label: 'Turkish Lira' },
  { code: 'SAR', emoji: '🇸🇦', label: 'Saudi Riyal' },
] satisfies CurrencyOption[];

const currencyByCode = keyBy(currencies, (el) => el.code) as Record<
  string,
  CurrencyOption
>;

const defaultValue: CurrencySelection = {
  ...currencies[0],
  amount: '',
};

const defaultValueAlt: CurrencySelection = {
  ...currencies[1],
  amount: '',
};

export const currencySelectorHelpers = {
  defaultValue,
  defaultValueAlt,
  currencyByCode,
  currencies,
};
