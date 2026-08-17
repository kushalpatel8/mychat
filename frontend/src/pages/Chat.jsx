import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatInput from '../components/chatInput';
import ChatBox from '../components/chatbox';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';
import { getMessages, getGroups, getUsers } from '../services/chat';
import Avatar from '../components/avatar';
import { Search, MoreVertical } from 'lucide-react';

const Chat = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [chatDetails, setChatDetails] = useState(null);
    const [users, setUsers] = useState([]);
    const { socket } = useContext(SocketContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        getMessages(id).then(setMessages).catch(console.error);
        getGroups().then(groups => {
            const current = groups.find(g => g.id === id);
            setChatDetails(current);
        }).catch(console.error);
        getUsers().then(setUsers).catch(console.error);
    }, [id]);

    const getChatName = () => {
        if (!chatDetails) return 'Loading...';
        if (chatDetails.members && chatDetails.members.length === 2) {
            const otherMemberId = chatDetails.members.find(m => m !== user?.id);
            const otherUser = (users || []).find(u => u.id === otherMemberId);
            if (otherUser) return otherUser.username;
        }
        return chatDetails.name;
    };

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.chat_id === id) {
                setMessages((prev) => [...prev, data]);
            }
        };

        socket.addEventListener('message', handleMessage);
        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket, id]);

    const handleSend = (content) => {
        if (!socket) return;
        const msg = {
            type: 'chat_message',
            chat_id: id,
            sender_id: user.id,
            content: content
        };
        socket.send(JSON.stringify(msg));
    };

    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col bg-[#121214] border-l border-[#2D3139]">
                {/* Chat Header */}
                <div className="flex h-16 items-center justify-between bg-[#202225] px-4 py-2 border-b border-[#2D3139]">
                    <div className="flex items-center gap-4 cursor-pointer">
                        <Avatar fallback={getChatName().charAt(0) || '?'} />
                        <span className="text-[#E5E7EB] text-base font-bold">{getChatName()}</span>
                    </div>
                    <div className="flex gap-4 text-[#aebac1]">
                        <button className="hover:text-white transition-colors"><Search size={20} /></button>
                        <button className="hover:text-white transition-colors"><MoreVertical size={20} /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto">
                    <ChatBox messages={messages} currentUserId={user.id} />
                </div>

                {/* Input Area */}
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    );
};

export default Chat;
