import { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    src?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    alt?: string;
}

export const AppImage = (props: AppImageProps) => {
    const { className, src, alt, fallback, errorFallback, ...ohterProps } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading) {
        return fallback;
    }

    if (hasError) {
        return errorFallback;
    }

    return <img src={src} alt={alt} className={className} {...ohterProps} />;
};
