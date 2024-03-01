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
    const getCurrencyData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await CurrencyService.getAll();
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
  }, []);

  const filteredCurrencyByIndicator = currencyData.filter(
    (currency) => currency.indicator === currencyIndicator
  );

  const uniqueMonths = Array.from(
    new Set(filteredCurrencyByIndicator.map(({ month }) => month))
  );

  const uniqueIndicators = Array.from(
    new Set(currencyData.map(({ indicator }) => indicator))
  );

  const currencyValues = filteredCurrencyByIndicator.map(
    (currency) => currency.value
  );

  const averageValue = (
    currencyValues.reduce((sum, value) => sum + value, 0) /
    currencyValues.length
  ).toFixed(1);

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
