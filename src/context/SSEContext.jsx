import { createContext, useEffect, useRef, useContext, useState } from 'react';

const SSEContext = createContext();

export const SSEProvider = ({ children }) => {
    const eventSourceRef = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("token");
    const roomId = localStorage.getItem("id");

    if (!token || !roomId) return;
        
        const eventSource = new EventSource(`https://triviaapi.artemrudenko.com/rooms/${roomId}/events?token=${token}`,{
            allowCredentials: true
        });
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log("SSE connection established");
            setConnected(true);
        };
        
        return () => {
            eventSource.close();
            setConnected(false);
        };
    },[]);

    return (
        <SSEContext.Provider value={{ 
            connected,
            addEventListener: (eventType, callback) => {
                if (eventSourceRef.current) {
                    eventSourceRef.current.addEventListener(eventType, callback);
                }
            },
            removeEventListener: (eventType, callback) => {
                if (eventSourceRef.current) {
                    eventSourceRef.current.removeEventListener(eventType, callback);
                }
            }
         }}>
            {children}
        </SSEContext.Provider>
    );
}

export const useSSE = () => useContext(SSEContext);