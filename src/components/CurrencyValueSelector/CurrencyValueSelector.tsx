import { styled } from '@linaria/react';
import cx from 'clsx';

import getSymbolFromCurrency from 'currency-symbol-map';

import { useMemo } from 'react';
import CurrencyInput from 'react-currency-input-field';
import {
  CurrencySelection,
  currencySelectorHelpers,
} from '../../utils/currency';

const Wrapper = styled.div`
  --pico-spacing: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: var(--rounding);
  overflow: hidden;

  &:focus-within {
    box-shadow:
      0 0 0 1px rgba(50, 151, 211, 0.7),
      0 1px 1px 0 rgba(0, 0, 0, 0.07),
      0 0 0 4px rgba(50, 151, 211, 0.3);
  }

  input,
  select {
    --pico-border-color: transparent;
    --pico-background-color: #f2f2f2;
    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }

  select {
    max-width: 150px;
    background: #e8e4e4;
    border-radius: 0 var(--pico-border-radius) var(--pico-border-radius) 0;
  }

  input {
    max-width: 180px;
    z-index: 2;
    border-radius: var(--pico-border-radius) 0 0;
  }
`;

export function CurrencyValueSelector(props: CurrencyValueSelectorProps) {
  const {
    className,
    onChange,
    value: selectedOption = currencySelectorHelpers.defaultValue,
    loading,
    convertedAmount,
    origin,
  } = props;

  const value = (() => {
    const v = origin ? selectedOption.amount : convertedAmount;
    if (v === '') return '0.00';
    if (v === '0') return '0.00';
    return v;
  })();

  const symbol = useMemo(() => {
    return getSymbolFromCurrency(selectedOption.code);
  }, [selectedOption.code]);

  return (
    <Wrapper
      className={cx('CurrencyValueSelector', className, { loading, origin })}
    >
      <CurrencyInput
        className="CurrencyInput"
        placeholder="0.00"
        prefix={symbol}
        aria-label="Value"
        defaultValue={'1.00'}
        value={value}
        disableGroupSeparators
        allowDecimals
        onFocus={(ev) => {
          ev.currentTarget.selectionStart = 0;
          ev.currentTarget.selectionEnd = 1000;
        }}
        onValueChange={(value = '') => {
          onChange({ ...selectedOption, amount: value }, 'amount');
        }}
      />

      <select
        aria-label="Select a currency"
        required
        defaultValue={selectedOption.code}
        onChange={(ev) => {
          ev.preventDefault();
          const code = ev.currentTarget.value;
          const currency = currencySelectorHelpers.currencyByCode[code];
          onChange({ ...currency, amount: value }, 'currency');
        }}
      >
        <option disabled value="">
          Select a currency...
        </option>

        {currencySelectorHelpers.currencies.map((item, idx) => {
          const label = `${item.emoji} ${item.code}`;
          return (
            <option key={`${item.code}#${idx}`} value={item.code}>
              {label}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}

export type CurrencyValueSelectorProps = {
  className?: string;
  value: CurrencySelection;
  onChange(currency: CurrencySelection, changed: 'currency' | 'amount'): void;
  loading: boolean;
  origin: boolean;
  convertedAmount: string;
};
