import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { createSocketConnection } from '../services/Socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const ws = createSocketConnection(user.id);
            setSocket(ws);

            return () => {
                ws.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
