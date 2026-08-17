import { useEffect, useRef } from 'react';
import Message from './message';

const ChatBox = ({ messages, currentUserId }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 p-[5%]">
            {!messages || messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                    <div className="rounded-lg bg-[#2D3139] px-4 py-2 text-center shadow-sm">
                        <p className="text-sm font-medium text-[#E5E7EB]">Send a message to start the conversation!</p>
                    </div>
                </div>
            ) : (
                messages.map((msg, idx) => (
                    <Message
                        key={idx}
                        content={msg.content}
                        isOwn={msg.sender_id === currentUserId}
                        timestamp={msg.created_at}
                    />
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatBox;
