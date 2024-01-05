// Voice.js
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const Voice = () => {
    const [socket, setSocket] = useState(null);

    const toggleWebSocket = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            setSocket(null);
        } else {
            const token = window.localStorage.getItem("token");
            const newSocket = new WebSocket(
                `ws://localhost:8000/ws/audio/?token=${token}`
            );

            newSocket.onopen = () => {
                setSocket(newSocket);

                // newSocket.send(JSON.stringify({ type: "start", Token: token, text : "회의 시작"}));
                newSocket.send("회의 시작");
            };
        }
    };

    const finishWebSocket = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("Finish");
            socket.close();
            setSocket(null);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "total") {
                    // 'total' 타입의 메시지를 받았을 때의 처리
                    console.log("Received total data:", data.total);
                    // 여기에 프론트에서 할 작업을 추가하세요.
                }
            };
        }
    }, [socket]);

    useEffect(() => {
        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [socket]);

    return (
        <div>
            <Button color="primary" size="lg" block onClick={toggleWebSocket}>
                Start
            </Button>
            <Button color="danger" size="lg" block onClick={finishWebSocket}>
                Finish
            </Button>
        </div>
    );
};

export default Voice;
