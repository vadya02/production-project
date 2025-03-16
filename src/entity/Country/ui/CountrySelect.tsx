import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../model/types/country';

interface CountrySelectProps {
  className?: string;
  readonly?: boolean;
  onChange?: (value: Country) => void;
  value?: string;
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    className,
    onChange,
    readonly,
    value
  } = props;

  const onChangeHandler = useCallback(() => {
    onChange?.(value as Country);
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