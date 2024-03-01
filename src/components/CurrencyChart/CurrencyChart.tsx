import { FC, useState } from 'react';
import { ReactECharts } from '../shared/Echarts/ReactECharts';

import './currencyChart.css';
import { Layout } from '@consta/uikit/Layout';
import { AverageValueLabel } from './AverageValueLabel';
import { currencyFormatter } from '../../utils/currencyFormatter';
import { CurrencyController } from './CurrencyController';
import { currencySymbols } from '../../constants/currencySymbols';

interface CurrencyChartProps {
  currencyData: CurrencyInfo[];
}

export const CurrencyChart: FC<CurrencyChartProps> = ({ currencyData }) => {
  const [currencyIndicator, setCurrencyIndicator] = useState<string>(
    currencyData[0].indicator
  );

  const filteredCurrencyByIndicator = currencyData.filter(
    (currency) => currency.indicator === currencyIndicator
  );

  const months = Array.from(
    new Set(filteredCurrencyByIndicator.map(({ month }) => month))
  );

  const currencies = Array.from(
    new Set(currencyData.map(({ indicator }) => indicator))
  );

  const values = filteredCurrencyByIndicator.map((currency) => currency.value);

  const averageValue = (
    values.reduce((sum, value) => sum + value, 0) / values.length
  ).toFixed(1);

  const option = {
    title: {
      text: `КУРС ДОЛЛАРА, ${currencySymbols[currencyIndicator]}/₽`,
      textStyle: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#002033',
      },
    },
    color: '#F38B00',
    grid: {
      right: 200,
    },
    tooltip: {
      trigger: 'axis',
      className: 'currency-tooltip',
      valueFormatter: (value: string | number): string =>
        currencyFormatter.format(Number(value)),
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        fontFamily: 'Open Sans',
        fontSize: 10,
        color: 'rgba(#002033, 0.6)',
      },
      data: months,
      offset: 25,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      scale: true,
      interval: 3,
      offset: 17,
      axisTick: {
        show: true,
        inside: false,
        length: 5,
        alignWithLabel: true,
        lineStyle: {
          color: '#D9D9D9',
        },
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: currencyIndicator,
        type: 'line',
        data: values,
        lineStyle: {
          color: 'orange',
        },
        symbol: 'none',
      },
    ],
  };

  return (
    <Layout className="chart-container">
      <ReactECharts option={option} />
      <AverageValueLabel value={averageValue} />
      <CurrencyController
        currencies={currencies}
        value={currencyIndicator}
        onChange={setCurrencyIndicator}
      />
    </Layout>
  );
};
