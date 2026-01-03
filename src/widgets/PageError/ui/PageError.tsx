import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import cls from './PageError.module.scss';

type PageErrorProps = {
    className?: string;
};

const PageError = (props: PageErrorProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const reload = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (
        <div className={classNames(cls.PageError)}>
            <p>{t('Ошибка')}</p>
            <Button onClick={reload}>{t('Обновить страницу')}</Button>
        </div>
    );
};

export default PageError;
