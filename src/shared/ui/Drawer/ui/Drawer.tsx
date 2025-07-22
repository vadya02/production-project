import { useTheme } from 'app/providers/ThemeProvider';
import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
    isOpen?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
    const { children, className, isOpen, onClose } = props;
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
    };
    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={onClose} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
});
