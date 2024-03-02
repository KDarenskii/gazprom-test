import { useEffect, useState } from 'react';

import { CurrencyService } from 'service/CurrencyService';

import { getChartConfig } from './getChartConfig';

export const useCurrencyChart = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currencyIndicator, setCurrencyIndicator] = useState<string | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();

    const getCurrencyData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await CurrencyService.getAll({
          signal: controller.signal,
        });
        setCurrencyData(data);
        if (data.length > 0) {
          setCurrencyIndicator(data[0].indicator);
        }
      } catch (error) {
        setError('Не удалось получить данные');
      } finally {
        setIsLoading(false);
      }
    };

    getCurrencyData();

    return () => {
      // cancel request if components is unmounted
      controller.abort();
    };
  }, []);

  // get currency only with chosen indicator
  const filteredCurrencyByIndicator = currencyData.filter(
    (currency) => currency.indicator === currencyIndicator
  );

  // get all unique months
  const uniqueMonths = Array.from(
    new Set(filteredCurrencyByIndicator.map(({ month }) => month))
  );

  // get all unique indicators
  const uniqueIndicators = Array.from(
    new Set(currencyData.map(({ indicator }) => indicator))
  );

  // get values from chosen currency
  const currencyValues = filteredCurrencyByIndicator.map(
    (currency) => currency.value
  );

  // calculate average currency value
  const averageValue = (
    currencyValues.reduce((sum, value) => sum + value, 0) /
    currencyValues.length
  ).toFixed(1);

  // initiate chart config
  const config = getChartConfig({
    indicator: currencyIndicator,
    values: currencyValues,
    months: uniqueMonths,
  });

  return {
    isLoading,
    error,
    config,
    averageValue,
    uniqueIndicators,
    currencyIndicator,
    setCurrencyIndicator,
  };
};
