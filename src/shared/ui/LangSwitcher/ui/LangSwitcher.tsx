import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export default function LangSwitcher(props: LangSwitcherProps) {
    const { t, i18n } = useTranslation();
    const { className, short } = props;
    const toggleTranslation = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };
    return (
        <Button
            className={classNames(cls.LangSwitcher, {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={toggleTranslation}
        >
            {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
    );
}
