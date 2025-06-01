import { styled } from '@linaria/react';
import cx from 'clsx';
import * as React from 'react';
import { useState } from 'react';
import logo from '../../assets/x.svg';
import { currencySelectorHelpers } from '../../utils/currency';
import { useCurrencyConverter } from '../../utils/useCurrencyConverter.tsx';
import { CurrencyValueSelector } from '../CurrencyValueSelector';

const CurrencyConverterWrapper = styled.div`
  border-radius: var(--rounding);
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: var(--spacing-02);
  gap: var(--spacing-02);
  border-radius: 16px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-03) var(--spacing-03);
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  background-image: url('${logo}');
  background-size: contain;
  background-repeat: no-repeat;
  height: 24px;
  padding-left: 39px;
  font-size: 14px;
  line-height: 25px;
  color: rgba(10, 16, 55, 0.7);
`;

export function CurrencyConverter(props: CurrencyConverterProps) {
  const { className } = props;

  const [valueA, setValueA] = useState(currencySelectorHelpers.defaultValue);
  const [valueB, setValueB] = useState(currencySelectorHelpers.defaultValueAlt);
  const [lastChanged, setLastChanged] = useState<'a' | 'b'>('a');
  const inverted = lastChanged === 'b';

  const { convertedAmount, loading } = useCurrencyConverter(
    inverted ? +valueB.amount : +valueA.amount,
    inverted ? valueB.code : valueA.code,
    inverted ? valueA.code : valueB.code,
  );

  return (
    <CurrencyConverterWrapper className={cx('CurrencyConverter', className)}>
      <Header>
        <Logo title={'Logotype Currency Converter'}> ❘ Currency Converter</Logo>
      </Header>

      <Container className={cx({ inverted })}>
        <CurrencyValueSelector
          loading={loading}
          convertedAmount={convertedAmount}
          origin={!inverted}
          value={valueA}
          onChange={(value, changed) => {
            setValueA(value);
            if (changed === 'amount') setLastChanged('a');
          }}
        />

        <CurrencyValueSelector
          loading={loading}
          convertedAmount={convertedAmount}
          origin={inverted}
          value={valueB}
          onChange={(value, changed) => {
            setValueB(value);
            if (changed === 'amount') setLastChanged('b');
          }}
        />
      </Container>
    </CurrencyConverterWrapper>
  );
}

export type CurrencyConverterProps = {
  className?: string;
  children?: React.ReactNode;
};
