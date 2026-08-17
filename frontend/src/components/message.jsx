const Message = ({ content, isOwn, senderName, timestamp }) => {
    return (
        <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'} mb-1`}>
            <div 
                className={`relative max-w-[65%] px-2 pt-1.5 pb-1 ${
                    isOwn 
                        ? 'bg-[#7C3AED] text-[#F9FAFB] rounded-lg rounded-tr-none' 
                        : 'bg-[#2D3139] text-[#E5E7EB] rounded-lg rounded-tl-none'
                }`}
                style={{ boxShadow: '0 1px 0.5px rgba(0,0,0,.2)' }}
            >
                {/* Tail SVG could go here, but omitted for simplicity. We use rounded corners instead. */}
                
                {/* Group sender name (optional, if we had groups and it wasn't own message) */}
                {/* {!isOwn && <div className="text-xs text-[#F43F5E] font-semibold mb-0.5">{senderName || 'Contact'}</div>} */}

                <div className="flex flex-wrap items-end gap-2">
                    <span className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{content}</span>
                    <span className={`text-[11px] ml-auto pb-0.5 min-w-[50px] text-right ${isOwn ? 'text-indigo-200' : 'text-[#8696a0]'}`}>
                        {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Message;
