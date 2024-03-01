import { FC } from 'react';

import { Layout } from '@consta/uikit/Layout';

import { CurrencyChart } from 'components/CurrencyChart';
import { ThemeProvider } from 'components/providers/ThemeProvider';

import './app.css';

export const App: FC = () => {
  return (
    <ThemeProvider>
      <Layout className="app-wrapper">
        <CurrencyChart />
      </Layout>
    </ThemeProvider>
  );
};
