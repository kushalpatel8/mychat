import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex h-full items-center justify-center bg-gray-900">
            <div className="w-96 rounded-xl bg-gray-800 p-8 shadow-2xl text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-700">
                    <User className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">{user?.username}</h2>
                <p className="text-gray-400">{user?.email}</p>
            </div>
        </div>
    );
};

export default Profile;
