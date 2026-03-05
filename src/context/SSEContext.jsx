import { createContext, useEffect, useRef, useContext } from 'react';

const SSEContext = createContext();

const SSEProvider = ({ id, token, children }) => {
    const eventSourceRef = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8083/rooms/${id}/events?token=${token}`);
        eventSourceRef.current = eventSource;

        eventSource,addEventListener("player-joined", (event) => {
            const data = event.data;
            console.log("Evento recibido:", data);
        });

        return () => {
            eventSource.close();
            setConnected(false);
        };
    })

    return (
        <SSEContext.Provider value={{ connected }}>
            {children}
        </SSEContext.Provider>
    );
}

export const useSSE = () => useContext(SSEContext);