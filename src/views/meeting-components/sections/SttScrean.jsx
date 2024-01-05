import React, { useState, useEffect } from "react";

const getUserMedia = navigator.mediaDevices.getUserMedia;


const SttScreen = () => {
    const [audioStream, setAudioStream] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const startStreaming = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const socket = new WebSocket("ws://localhost:3000");

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // setAudioStream(stream);
            const microphone = audioContext.createMediaStreamSource(stream);

            // WebRTC 설정
            const peerConnection = new RTCPeerConnection();
            // peerConnection.addTrack(microphone);
            peerConnection.addTrack(stream.getAudioTracks()[0]);

            socket.addEventListener("open", () => {
                // WebRTC 연결 시작
                peerConnection
                    .createOffer()
                    .then((offer) => peerConnection.setLocalDescription(offer))
                    .then(() =>
                        socket.send(
                            JSON.stringify({
                                type: "offer",
                                offer: peerConnection.localDescription,
                            })
                        )
                    );
            });

            socket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);

                if (data.type === "answer") {
                    // 서버로부터 받은 응답 처리
                    peerConnection.setRemoteDescription(
                        new RTCSessionDescription(data.answer)
                    );
                }
            });

            setIsStreaming(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopStreaming = () => {
        if (audioStream) {
            // 오디오 스트림 중지
            audioStream.getTracks().forEach((track) => track.stop());
            setAudioStream(null);
        }

        setIsStreaming(false);
    };

    const handleButtonClick = () => {
        if (isStreaming) {
            stopStreaming();
        } else {
            startStreaming();
        }
    };

    useEffect(() => {
        // 컴포넌트 언마운트 시 오디오 스트림 중지
        return () => {
            if (isStreaming) {
                stopStreaming();
            }
        };
    }, []);

    return (
        <div>
            <h1>SttScreen</h1>
            <button onClick={handleButtonClick}>
                {isStreaming ? "Stop Streaming" : "Start Streaming"}
            </button>
            {/* 추가적인 UI 혹은 상태 표시를 위한 부분 */}
        </div>
    );
};

export default SttScreen;


// const SttScreen = () => {
//     const [audioStream, setAudioStream] = useState(null);
//     const [isStreaming, setIsStreaming] = useState(false);

//     const socket = new WebSocket("ws://localhost:3000");

//     // 실시간으로 음성을 받아서 BE로 전송 - websocket
//     const startStreaming = async () => {
//         try {
//             const stream = await getUserMedia({ audio: true, video: false });
//             const audioStream = audioContext.createMediaStreamSource(stream);
//             setAudioStream(audioStream);

//             audioStream.connect(audioContext.destination);
//             audioStream.connect(socket);

//             setIsStreaming(true);
//         } catch (err) {
//             console.log('마이크에 접근하는 중 오류 발생:', err);
//         }
//     }

//     // 음성 전송 중지
//     const stopStreaming = () => {
//         if (audioStream) {
//             audioStream.disconnect(audioContext.destination);
//             audioStream.disconnect(socket);
//             setAudioStream(null);
//         }
//         setIsStreaming(false);
//     };

//     return (
//         <div>
//             <h1>SttScreen</h1>
//             <button onClick={isStreaming ? stopStreaming : startStreaming}>
//                 {isStreaming ? '스트리밍 중지' : '스트리밍 시작'}
//             </button>
//         </div>
//     )
// }

// export default SttScreen;