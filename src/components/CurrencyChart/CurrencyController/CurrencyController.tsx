import { FC } from 'react';

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';

import { currencySymbols } from 'constants/currencySymbols';

import './currencyController.css';

interface CurrencyControllerProps {
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
}

export const CurrencyController: FC<CurrencyControllerProps> = ({
  currencies,
  onChange,
  value,
}) => {
  return (
    <div>
      <ChoiceGroup
        className="chart-choice"
        value={value}
        onChange={({ value }) => onChange(value)}
        getItemLabel={(indicator) => currencySymbols[indicator]}
        items={currencies}
        name="currency"
        view="primary"
        size="s"
      />
    </div>
  );
};
