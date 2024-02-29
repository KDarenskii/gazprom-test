import { FC, useState } from 'react';
import { ReactECharts } from '../shared/Echarts/ReactECharts';

import './currencyChart.css';
import { Layout } from '@consta/uikit/Layout';

interface CurrencyChartProps {
  currencyData: CurrencyInfo[];
}

export const CurrencyChart: FC<CurrencyChartProps> = ({ currencyData }) => {
  const [currencyIndicator] = useState<string>(currencyData[0].indicator);

  const filteredCurrencyData = currencyData.filter(
    (currency) => currency.indicator === currencyIndicator
  );

  const months = Array.from(
    new Set(filteredCurrencyData.map(({ month }) => month))
  );

  const values = filteredCurrencyData.map((currency) => currency.value);

  const averageValue = (
    values.reduce((sum, value) => sum + value, 0) / values.length
  ).toFixed(1);

  const option = {
    title: {
      text: 'КУРС ДОЛЛАРА, $/₽',
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
      // formatter: (params) => {
      //   console.log(params);
      //   const tooltipTitle = params[0].name;
      //   let tooltipContent = '';

      //   params.forEach(function (item) {
      //     tooltipContent += item.seriesName + ': ' + item.value + '<br>';
      //   });

      //   // Apply HTML styling to make the title bold
      //   return '<strong>' + tooltipTitle + '</strong><br>' + tooltipContent;
      // },
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
      <div className="average-container">
        <h5 className="average-title">Среднее за период</h5>
        <div>
          <span className="average-value">{averageValue}&nbsp;</span>
          <span className="average-currency">₽</span>
        </div>
      </div>
      <div className="parent">
        <div>
          <div>
            <div className="child"></div>
            <div></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
