import './Loader.scss';

interface LoaderProps {
    className?: string;
}
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
