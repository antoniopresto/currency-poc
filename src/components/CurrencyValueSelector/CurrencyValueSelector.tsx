import { styled } from '@linaria/react';
import cx from 'clsx';

import getSymbolFromCurrency from 'currency-symbol-map';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { useMemo } from 'react';
import MaskedInput from 'react-text-mask';
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
    box-shadow: 0 0 0 1px var(--pico-form-element-active-border-color);
  }

  input,
  select {
    --pico-border-color: transparent;
    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }

  select {
    max-width: 150px;
  }

  input {
    margin-right: -16px;
    max-width: 180px;
    z-index: 2;
  }
`;

export function CurrencyValueSelector(props: CurrencyValueSelectorProps) {
  const {
    className,
    onChange,
    value: selectedOption = currencySelectorHelpers.defaultValue,
  } = props;

  const mask = useMemo(() => {
    return createNumberMask({
      prefix: getSymbolFromCurrency(selectedOption.code),
      allowDecimal: true,
      allowNegative: true,
      includeThousandsSeparator: false,
      suffix: '',
    });
  }, [selectedOption.code]);

  return (
    <Wrapper className={cx('CurrencyValueSelector', className)}>
      <MaskedInput
        mask={mask}
        placeholder="0.00"
        aria-label="Value"
        onChange={(event) => {
          let amount = event.currentTarget.value;
          onChange({ ...selectedOption, amount });
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
          onChange({ ...currency, amount: selectedOption.amount });
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
  value?: CurrencySelection;
  onChange(currency: CurrencySelection): void;
  name?: string;
};
