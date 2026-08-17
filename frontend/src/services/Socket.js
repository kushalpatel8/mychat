export const createSocketConnection = (userId) => {
    const ws = new WebSocket(`ws://localhost:8080/ws?user_id=${userId}`);
    return ws;
};
