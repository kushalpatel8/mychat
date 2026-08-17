import Avatar from './avatar';

const UserCard = ({ username, email, onClick, selected }) => {
    return (
        <div 
            onClick={onClick}
            className={`flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-all hover:bg-gray-700 ${
                selected ? 'bg-gray-700 ring-1 ring-blue-500' : 'bg-transparent'
            }`}
        >
            <Avatar fallback={username?.charAt(0)} />
            <div className="flex flex-col truncate">
                <span className="font-semibold text-gray-200 truncate">{username}</span>
                <span className="text-xs text-gray-500 truncate">{email}</span>
            </div>
        </div>
    );
};

export default UserCard;
