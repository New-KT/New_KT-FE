// Voice.js

import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const Voice = () => {
    const [socket, setSocket] = useState(null);
    const [isStarted, setIsStarted] = useState(false);

    const toggleWebSocket = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            setSocket(null);

            // 현재 연결이 열려 있을 경우 Finish 버튼만 보이도록 설정
            setIsStarted(false);
        } else {
            const token = window.localStorage.getItem("token");
            const newSocket = new WebSocket(
                `ws://localhost:8000/ws/audio/?token=${token}`
            );

            newSocket.onopen = () => {
                setSocket(newSocket);

                // 현재 연결이 열려 있을 경우 Finish 버튼만 보이도록 설정
                setIsStarted(true);
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
            setIsStarted(false);
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
            {isStarted ? (
                <Button color="danger" onClick={finishWebSocket}>
                    Finish
                </Button>
            ) : (
                <Button color="primary" onClick={toggleWebSocket}>
                    Start
                </Button>
            )}
        </div>
    );
};

export default Voice;
