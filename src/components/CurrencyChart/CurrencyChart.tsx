import { FC } from 'react';
import { ReactECharts } from '../shared/Echarts/ReactECharts';
import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';

import './currencyChart.css';
import { Layout } from '@consta/uikit/Layout';
import { AverageValueLabel } from './AverageValueLabel';
import { CurrencyController } from './CurrencyController';
import { useCurrencyChart } from './useCurrencyChart';

export const CurrencyChart: FC = () => {
  const {
    config,
    averageValue,
    uniqueIndicators,
    isLoading,
    error,
    currencyIndicator,
    setCurrencyIndicator,
  } = useCurrencyChart();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Informer status="alert" title="Произошла ошибка" label={error} />;
  }

  return (
    <Layout className="chart-container">
      <ReactECharts option={config} />
      <AverageValueLabel value={averageValue} />
      {currencyIndicator && (
        <CurrencyController
          currencies={uniqueIndicators}
          value={currencyIndicator}
          onChange={setCurrencyIndicator}
        />
      )}
    </Layout>
  );
};
