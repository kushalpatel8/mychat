import { useEffect, useState, useContext } from 'react';
import { getGroups, getUsers, createGroup } from '../services/chat';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from './avatar';
import { MessageSquare, MoreVertical, Search, ArrowLeft, Users } from 'lucide-react';

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getGroups().then(setGroups).catch(console.error);
        getUsers().then(data => {
            const others = (data || []).filter(u => u.id !== user?.id);
            setUsers(others);
        }).catch(console.error);
    }, [user]);

    const handleStartChat = async (otherUser) => {
        try {
            const existingChat = groups.find(
                (g) => g.members.includes(otherUser.id) && g.members.length === 2
            );

            if (existingChat) {
                navigate(`/chat/${existingChat.id}`);
            } else {
                const newGroup = await createGroup(otherUser.username, [otherUser.id]);
                navigate(`/chat/${newGroup.id}`);
            }
            setShowUsers(false);
        } catch (error) {
            console.error('Failed to start chat:', error);
        }
    };

    const displayList = showUsers ? users : groups;
    const filteredList = displayList.filter(item => 
        (item.name || item.username || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getChatName = (group) => {
        if (group.members && group.members.length === 2) {
            const otherMemberId = group.members.find(m => m !== user?.id);
            const otherUser = users.find(u => u.id === otherMemberId);
            if (otherUser) return otherUser.username;
        }
        return group.name;
    };

    return (
        <div className="flex h-full w-[30%] min-w-[300px] max-w-[450px] flex-col border-r border-[#2D3139] bg-[#121214]">
            {/* Header */}
            <div className="flex h-16 items-center justify-between bg-[#202225] px-4 py-2">
                <Avatar fallback={user?.username?.charAt(0)} />
                <div className="flex gap-4 text-[#aebac1]">
                    <button onClick={() => setShowUsers(!showUsers)} className="hover:text-white transition-colors" title="New Chat">
                        {showUsers ? <ArrowLeft size={20} /> : <MessageSquare size={20} />}
                    </button>
                    <button className="hover:text-white transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="border-b border-[#2D3139] p-2">
                <div className="flex items-center rounded-lg bg-[#202225] px-3 py-1.5">
                    <Search size={18} className="text-[#aebac1]" />
                    <input
                        type="text"
                        placeholder={showUsers ? "Search contacts" : "Search or start new chat"}
                        className="ml-4 flex-1 bg-transparent text-sm text-[#E5E7EB] placeholder-[#8696a0] focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {showUsers && <div className="py-4 px-4 text-[#F43F5E] text-sm uppercase font-bold tracking-wide">Contacts</div>}
                
                {filteredList.map((item) => (
                    showUsers ? (
                        <div 
                            key={item.id} 
                            onClick={() => handleStartChat(item)}
                            className="flex cursor-pointer items-center px-3 py-3 hover:bg-[#202225] transition-colors"
                        >
                            <Avatar fallback={item.username?.charAt(0)} />
                            <div className="ml-4 flex-1 border-b border-[#2D3139] pb-3">
                                <span className="text-[#E5E7EB] text-base font-medium">{item.username}</span>
                            </div>
                        </div>
                    ) : (
                        <Link
                            key={item.id}
                            to={`/chat/${item.id}`}
                            className="flex cursor-pointer items-center px-3 py-3 hover:bg-[#202225] transition-colors"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-sm">
                                <Users size={24} />
                            </div>
                            <div className="ml-4 flex-1 border-b border-[#2D3139] pb-3">
                                <div className="flex justify-between">
                                    <span className="text-[#E5E7EB] text-base font-medium">{getChatName(item)}</span>
                                </div>
                                <span className="text-sm text-[#8696a0] truncate mt-0.5 block">Click to view chat...</span>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
