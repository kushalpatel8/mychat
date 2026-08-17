import { useState } from 'react';
import { Send, Smile, Plus, Mic } from 'lucide-react';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex min-h-[62px] items-center bg-[#202225] px-4 py-2 gap-3 border-t border-[#2D3139]">
            <div className="flex gap-4 text-[#aebac1]">
                <button type="button" className="hover:text-white transition-colors"><Smile size={24} /></button>
                <button type="button" className="hover:text-white transition-colors"><Plus size={24} /></button>
            </div>
            <div className="flex-1">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="w-full rounded-lg bg-[#2D3139] px-4 py-2.5 text-[#E5E7EB] placeholder-[#8696a0] focus:outline-none"
                />
            </div>
            <div className="flex items-center justify-center text-[#aebac1]">
                {message.trim() ? (
                    <button type="submit" className="text-[#7C3AED] hover:text-[#9F7AEA] transition-colors">
                        <Send size={24} />
                    </button>
                ) : (
                    <button type="button" className="hover:text-white transition-colors">
                        <Mic size={24} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default ChatInput;
