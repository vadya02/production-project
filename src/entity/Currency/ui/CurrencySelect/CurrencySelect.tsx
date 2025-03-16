import { Currency } from 'entity/Currency/model/types/currency';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

interface CurrencySelectProps {
  className?: string;
  readonly?: boolean;
  onChange?: (value: Currency) => void;
  value?: string;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className,
    onChange,
    readonly,
    value
  } = props;

  const onChangeHandler = useCallback(() => {
    onChange?.(value as Currency);
  }, [])

  return (
    <Select
      options={options}
      readonly={readonly}
      value={value}
      onChange={onChangeHandler}
      className={classNames('', {}, [className])}
    />
  );
});