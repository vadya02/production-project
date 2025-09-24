import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '@/entity/Currency/model/types/currency';
import { ListBox } from '@/shared/ui/Popups';

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
        className, onChange, readonly, value,
    } = props;
    const { t } = useTranslation();
    const onChangeHandler = useCallback(() => {
        onChange?.(value as Currency);
    }, [onChange, value]);

    return (
        <ListBox
            items={options}
            readonly={readonly}
            value={value}
            defaultValue={t('Укажите валюту')}
            label={t('Укажите валюту')}
            onChange={onChangeHandler}
            // className={classNames('', {}, [className])}
            direction="bottom right"
        />
    );
});
