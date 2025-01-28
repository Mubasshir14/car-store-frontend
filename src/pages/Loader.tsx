import { Vortex } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="vortex-wrapper min-h-[calc(100vh-200px)] flex items-center justify-center">
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    );
};

export default Loader;