import { FC } from 'react';

import './averageValueLabel.css';

interface AverageValueLabelProps {
  value: string | number;
  className?: string;
}

export const AverageValueLabel: FC<AverageValueLabelProps> = ({
  value,
  className,
}) => {
  return (
    <div className={[`average-container`, className].join(' ')}>
      <h5 className="average-title">Среднее за период</h5>
      <div>
        <span className="average-value">{value}&nbsp;</span>
        <span className="average-currency">₽</span>
      </div>
    </div>
  );
};
