import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        </div>
    );
};

export default Loader;
