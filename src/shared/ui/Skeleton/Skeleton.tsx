import { CSSProperties } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

export const Skeleton = (props: SkeletonProps) => {
    const {
        className,
        border,
        height,
        width,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />
    );
};
