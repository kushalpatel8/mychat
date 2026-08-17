import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="flex items-center justify-between bg-gray-800 px-6 py-4 shadow-md">
            <h1 className="text-xl font-bold text-blue-400">MyChat</h1>
            
            <div className="flex items-center space-x-4">
                {user && (
                    <>
                        <span className="text-gray-300">{user.username}</span>
                        <button className="text-gray-400 hover:text-white" onClick={logout}>
                            <LogOut className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
