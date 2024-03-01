import { FC } from 'react';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { currencySymbols } from '../../../constants/currencySymbols';

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
