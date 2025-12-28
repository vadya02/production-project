import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer';
import { Text } from '@/shared/ui/Text';

interface ArticleGreetingProps {
    className?: string;
}

export const ArticleGreeting = memo((props: ArticleGreetingProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setOpen(true);
            dispatch(saveJsonSettings({isArticlesPageWasOpened: true}))
        }
    }, [])

    const onClose = () => setOpen(false);
    
    const text = (
        <Text
            title={t('Добро пожаловать на страницу статей')}
            text={t(
                'Здесь вы можете искать и просматривать статьи на различные темы',
            )}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={open} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={open} onClose={onClose}>
            {text}
        </Modal>
    );
});