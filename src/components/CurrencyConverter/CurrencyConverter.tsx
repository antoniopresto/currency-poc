import { styled } from '@linaria/react';
import cx from 'clsx';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { currencySelectorHelpers } from '../../utils/currency';
import { CurrencyValueSelector } from '../CurrencyValueSelector';

const CurrencyConverterWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  max-width: 600px;
  background: var(--pico-color-grey-300);
  border-radius: var(--rounding);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: var(--spacing-03);
  gap: var(--spacing-03);
`;

const Hero = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  color: #1a1a1a;
  > h1 {
    font-size: 1.8rem;
    width: 100%;
    text-align: center;
  }
`;

export function CurrencyConverter(props: CurrencyConverterProps) {
  const { className } = props;

  const [valueA, setValueA] = useState(currencySelectorHelpers.defaultValue);
  const [valueB, setValueB] = useState(currencySelectorHelpers.defaultValueAlt);
  const [lastChanged, setLastChanged] = useState<'a' | 'b'>('a');
  const lastChangedRef = useRef(lastChanged);

  useEffect(() => {
    if (lastChangedRef.current === lastChanged) return;
    lastChangedRef.current = lastChanged;
    if (valueA.code === valueB.code) return;

    if (lastChangedRef.current === 'a') {
      // setValueB()
    } else {
      // setValueA()
    }
  }, [lastChanged]);

  return (
    <CurrencyConverterWrapper className={cx('CurrencyConverter', className)}>
      <Hero>
        <h1>Currency converter</h1>
      </Hero>

      <Container>
        <CurrencyValueSelector
          value={valueA}
          onChange={(value) => {
            setValueA(value);
            setLastChanged('a');
          }}
        />

        <CurrencyValueSelector
          value={valueB}
          onChange={(value) => {
            setValueB(value);
            setLastChanged('b');
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
