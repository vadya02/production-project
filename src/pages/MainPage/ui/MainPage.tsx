import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { RatingCard } from '@/entities/Rating';
import { Counter } from '@/entities/Counter';

export default function MainPage() {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
            11111
            <RatingCard title="555" feedbackTitle="555" hasFeedback />
            <Counter />
        </Page>
    );
}
