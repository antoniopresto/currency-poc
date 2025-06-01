import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { Currency } from 'dinero.js';
import { useEffect, useRef, useState } from 'react';

interface ConversionResult {
  convertedAmount: string;
  loading: boolean;
  error: string | null;
}

export function useCurrencyConverter(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
): ConversionResult {
  const [state, setState] = useState<ConversionResult>({
    convertedAmount: '',
    loading: false,
    error: null,
  });

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const convertCurrency = async () => {
      if (fromCurrency === toCurrency) {
        setState({
          convertedAmount: amount.toFixed(2),
          loading: false,
          error: null,
        });
        return;
      }

      if (amount === 0) {
        setState({
          convertedAmount: '0',
          loading: false,
          error: null,
        });
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetchRates(fromCurrency);
        const convertedAmount = (response[toCurrency] * amount).toFixed(2);

        setState({
          convertedAmount,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          convertedAmount: '',
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Currency conversion failed',
        });
      }
    };

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      convertCurrency();
    }, 100);
  }, [amount, fromCurrency, toCurrency]);

  return state;
}

const instance = Axios.create();
const http = setupCache(instance);

async function fetchRates(fromCurrency: Currency) {
  const response = await http.get(`https://api.frankfurter.app/latest`, {
    params: {
      from: fromCurrency,
    },
  });
  return response.data.rates as { [K in Currency]: number };
}
