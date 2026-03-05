import { createContext, useEffect, useRef, useContext, useState } from 'react';

const SSEContext = createContext();

export const SSEProvider = ({ id, token, children }) => {
    const eventSourceRef = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {

        
        const eventSource = new EventSource(`http://localhost:8083/rooms/${id}/events?token=${token}`);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log("SSE connection established");
            setConnected(true);
        };

        eventSource.addEventListener("player-joined", (event) => {
            const data = event.data;
            console.log("jugadir unido:", data);
        });

        eventSource.addEventListener("player-left", (event) => {
            const data = event.data;
            console.log("jugador salió:", data);
        });

        return () => {
            eventSource.close();
            setConnected(false);
        };
    },[id, token]);

    return (
        <SSEContext.Provider value={{ connected }}>
            {children}
        </SSEContext.Provider>
    );
}

export const useSSE = () => useContext(SSEContext);