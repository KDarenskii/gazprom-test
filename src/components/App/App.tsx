import { FC } from 'react';

import './app.css';

import { Layout } from '@consta/uikit/Layout';
import { CurrencyChart } from '../CurrencyChart';

import { mockData } from '../../assets/data/data';

export const App: FC = () => {
  return (
    <Layout flex={1} className="app-wrapper">
      <CurrencyChart currencyData={mockData} />
    </Layout>
  );
};
