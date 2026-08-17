import Sidebar from '../components/Sidebar';
import { Smartphone } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col items-center justify-center bg-[#121214] border-l border-[#2D3139]">
                <div className="text-center max-w-md">
                    <Smartphone size={120} className="mx-auto mb-8 text-[#2D3139] font-thin" />
                    <h1 className="text-3xl font-bold text-[#E5E7EB] mb-4">Gaming Chat</h1>
                    <p className="text-[#8696a0] text-sm leading-relaxed">
                        Connect with your community, friends, and gamers.
                        <br />
                        Select a contact to start chatting.
                    </p>
                </div>
                
                {/* Bottom banner */}
                <div className="absolute bottom-10 flex items-center gap-1.5 text-xs text-[#8696a0] font-medium">
                    <svg viewBox="0 0 12 15" width="12" height="15" className="fill-current text-[#7C3AED]">
                        <path d="M5.996 0C2.924 0 0 2.215 0 5.432v2.793C0 11.455 2.684 14.4 5.996 14.4c3.313 0 5.997-2.945 5.997-6.175V5.432C11.993 2.215 9.069 0 5.996 0zM8.82 5.176l-3.328 3.328a.4.4 0 01-.565 0L3.176 6.753a.4.4 0 01.566-.566l1.464 1.464 3.048-3.048a.4.4 0 01.566.566l-.001.007z"></path>
                    </svg>
                    Secure Connection
                </div>
            </div>
        </div>
    );
};

export default Home;
