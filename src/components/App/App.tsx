import { FC } from 'react';

import './app.css';

import { Layout } from '@consta/uikit/Layout';
import { CurrencyChart } from '../CurrencyChart';

import { mockData } from '../../assets/data/data';
import { ThemeProvider } from '../providers/ThemeProvider';

export const App: FC = () => {
  return (
    <ThemeProvider>
      <Layout className="app-wrapper">
        <CurrencyChart currencyData={mockData} />
      </Layout>
    </ThemeProvider>
  );
};
