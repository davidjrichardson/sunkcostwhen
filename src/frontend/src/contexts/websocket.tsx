import { createContext, useEffect, useState } from "react";

const WebsocketContext = createContext<WebSocket | null>(null);

function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('/ws');
    let interval: number;
    ws.onopen = () => {
        setSocket(ws);
        console.log('Connected to websocket');
        ws.send(JSON.stringify({
            type: 'reset',
            data: null
        }));
        interval = setInterval(() => {
            ws.send(JSON.stringify({
                type: 'ping',
                data: null
            }));
        }, 30e3);
    };
    ws.onclose = () => {
        console.log('Disconnected from websocket');
        clearInterval(interval);
        setSocket(null);
    };
    return () => {
        ws.close();
    };
  }, []);

  return <WebsocketContext.Provider value={socket}>{children}</WebsocketContext.Provider>;
}

export { WebsocketContext, WebsocketProvider };
