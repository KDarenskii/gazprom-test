import { currencyFormatter } from 'utils/currencyFormatter';

import { currencySymbols } from 'constants/currencySymbols';

interface GetChartConfigParams {
  indicator: string | null;
  months: string[];
  values: number[];
}

export const getChartConfig = ({
  indicator,
  months,
  values,
}: GetChartConfigParams) => {
  return {
    title: {
      text: indicator
        ? `${indicator.toUpperCase()}, ${currencySymbols[indicator]}/₽`
        : 'КУРС',
      textStyle: {
        fontWeight: 'bold',
        fontFamily: 'Inter',
        fontSize: 20,
        color: '#002033',
      },
    },
    color: '#F38B00',
    grid: {
      right: 85,
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
      boundaryGap: false,
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
        name: indicator,
        type: 'line',
        data: values,
        lineStyle: {
          color: 'orange',
        },
        symbol: 'none',
      },
    ],
  };
};
