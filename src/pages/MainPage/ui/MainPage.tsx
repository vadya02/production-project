import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
    const { t } = useTranslation('about');
    return (
        <div>
            <Counter />
            {t('Главная страница')}
        </div>
    );
}
