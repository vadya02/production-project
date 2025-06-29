import { StateSchema } from 'app/providers/StoreProvider';
import { uiActions } from 'features/UI';
import { getUIScrollByPath } from 'features/UI/model/selectors/ui';
import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    const onScroll = useThrottle((e: UIEvent) => {
        dispatch(
            uiActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            })
        );
    }, 500);

    return (
        <main onScroll={onScroll} ref={wrapperRef} className={classNames(cls.Page, {}, [className])} id={PAGE_ID}>
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </main>
    );
};
