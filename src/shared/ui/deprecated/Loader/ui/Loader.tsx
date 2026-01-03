import './Loader.scss';

interface LoaderProps {
    className?: string;
}

/**
* Устарел, используем новые компоненты из папки redesigned
* @deprecated
*/
const Loader = (props: LoaderProps) => {
    const { className } = props;
    return (
        <div className="lds-spinner">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

export default Loader;
