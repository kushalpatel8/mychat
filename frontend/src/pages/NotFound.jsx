import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="mb-4 text-6xl font-bold text-blue-500">404</h1>
            <p className="mb-8 text-xl text-gray-400">Page not found</p>
            <Link to="/" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
