// // VttMic.jsx
// import React, { useState, useEffect, useRef } from "react";
// import * as audioUtils from "./audioUtils";
// import mic from "microphone-stream";
// // import "./style.scss";

// const VttMic = () => {
//     // 상태 관리를 위한 useState 훅 사용
//     const [started, setStarted] = useState(false);
//     const [transcription, setTranscription] = useState([]);
//     const timerIdRef = useRef(null); // 타이머 관련 ref
//     const SAMPLE_RATE = 16000;
//     const SAMPLE_SIZE = 16;
//     let socket;
//     let micStream;

//     // 사용자 브라우저가 오디오 스트림을 지원하는지 확인
//     const startTranscribe = () => {
//         window.navigator.mediaDevices
//             .getUserMedia({
//                 video: false,
//                 audio: {
//                     echoCancellation: true,
//                     channelCount: 1,
//                     sampleRate: {
//                         ideal: SAMPLE_RATE,
//                     },
//                     sampleSize: SAMPLE_SIZE,
//                 },
//             })
//             .then(streamAudioToWebSocket) // 오디오 스트림을 WebSocket으로 전송
//             // 오디오 스트림 전송에 실패한 경우
//             .catch((error) => {
//                 handleError(
//                     "Amazon Transcribe로 오디오를 전송하는 중 오류가 발생했습니다. 다시 시도해주세요."
//                 );
//             });
//     };

//     // WebSocket을 통해 오디오 스트림 서버로 전송 - 비동기 함수
//     const streamAudioToWebSocket = async (userMediaStream) => {
//         try {
//             micStream = new mic(); // micStream 전역으로 선언
//             micStream.on("format", (data) => {
//                 console.log("Audio Format Data:", data);
//                 const { sampleRate } = data;
//             });
//             micStream.setStream(userMediaStream);
//             socket = new WebSocket("ws://localhost:8000/ws/stt/"); // socket을 전역으로 선언
//             socket.binaryType = "arraybuffer";
//             socket.onopen = () => {
//                 micStream.on("data", (rawAudioChunk) => {
//                     const binary = convertAudioToBinaryMessage(rawAudioChunk);
//                     if (socket.readyState === socket.OPEN) socket.send(binary);
//                 });
//             };
//             wireSocketEvents(socket);
//         } catch (err) {
//             handleError("streamAudioToWebSocket에서 오류가 발생했습니다", err);
//         }
//     };

//     // WebSocket 이벤트 처리
//     const wireSocketEvents = (socket) => {
//         let transcribeException = false;
//         let socketError = false;

//         // 서버로부터 메시지를 수신했을 때 호출
//         socket.onmessage = (message) => {
//             // 서버에서 오는 메시지 처리
//         };

//         // WebSocket 연결 중 오류가 발생했을 때 호출
//         socket.onerror = () => {
//             socketError = true;
//             handleError("WebSocket 연결 오류. 다시 시도하세요.");
//         };

//         // WebSocket 연결이 종료되었을 때 호출
//         socket.onclose = (closeEvent) => {
//             if (!socketError && !transcribeException) {
//                 if (closeEvent.code !== 1000) {
//                     handleError("스트리밍 예외 발생: " + closeEvent.reason);
//                 }
//             }
//         };
//     };

//     // 오디오를 바이너리 메시지로 변환
//     const convertAudioToBinaryMessage = (audioChunk) => {
//         const raw = mic.toRaw(audioChunk);
//         if (raw == null) return;
//         const downsampledBuffer = audioUtils.downsampleBuffer(raw, SAMPLE_RATE, SAMPLE_RATE);
//         const pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);
//         return pcmEncodedBuffer;
//     };

//     // WebSocket 연결 종료
//     const closeSocket = () => {
//         if (socket && socket.readyState === socket.OPEN) {
//             micStream.stop();
//             socket.close();
//         }
//     };

//     // 오류 처리
//     const handleError = (err) => {
//         closeTranscription();

//         if (props.onError) {
//             props.onError(err);
//         } else {
//             console.error(err);
//         }
//     };

//     // 마이크 클릭 이벤트 처리
//     const handleMicClick = () => {
//         if (started) {
//             closeTranscription();
//         } else {
//             startTranscription();
//         }
//     };

//     // 음성 텍스트 변환 시작
//     const startTranscription = () => {
//         setStarted(true);
//         startTranscribe();
//     };

//     // 음성 텍스트 변환 종료
//     const closeTranscription = () => {
//         setStarted(false);
//         setTranscription([]);
//         closeSocket();
//         props.onClose && props.onClose();
//     };

//     // 일정 시간 동안 아무 동작이 없을 경우 자동으로 종료하는 타이머 시작
//     const startCloseWaitTimer = () => {
//         if (timerIdRef.current) {
//             clearTimeout(timerIdRef.current);
//         }

//         timerIdRef.current = setTimeout(() => {
//             closeTranscription();
//         }, 10000);
//     };

//     useEffect(() => {
//         return () => {
//             // 정리 로직 구현
//             closeTranscription();
//         };
//     }, []); // 빈 배열은 컴포넌트가 마운트되었을 때 한 번만 실행

//     // 컴포넌트의 UI 반환
//     return (
//         <div className="stt-mic-container" onClick={handleMicClick}>
//             <i className={`sttMic fa fa-microphone text-primary`} />
//             <div className={`circle-ani ${started ? "active" : ""}`} />
//         </div>
//     );
// };

// export default VttMic;

import React, { Component } from "react";
import * as audioUtils from "./audioUtils";
import mic from "microphone-stream";
// import "./style.scss";

class VttMic extends Component {
    state = {};
    transcription = [];
    SAMPLE_RATE = 16000;
    SAMPLE_SIZE = 16;

    startTranscribe = () => {
        window.navigator.mediaDevices
            .getUserMedia({
                video: false,
                audio: {
                    echoCancellation: true,
                    channelCount: 1,
                    sampleRate: {
                        ideal: this.SAMPLE_RATE,
                    },
                    sampleSize: this.SAMPLE_SIZE,
                },
            })
            .then(this.streamAudioToWebSocket)
            .catch((error) => {
                this.handleError(
                    "There was an error streaming your audio to Amazon Transcribe. Please try again."
                );
            });
    };

    streamAudioToWebSocket = async (userMediaStream) => {
        try {
            this.micStream = new mic();
            this.micStream.on("format", (data) => {
                this.inputSampleRate = data.sampleRate;
            });
            this.micStream.setStream(userMediaStream);
            this.socket = new WebSocket("ws://localhost:8000/ws/stt/");
            this.socket.binaryType = "arraybuffer";
            this.socket.onopen = () => {
                this.micStream.on("data", (rawAudioChunk) => {
                    let binary =
                        this.convertAudioToBinaryMessage(rawAudioChunk);
                    if (this.socket.readyState === this.socket.OPEN)
                        this.socket.send(binary);
                });
            };
            this.wireSocketEvents();
        } catch (err) {
            this.handleError("An error occured at streamAudioToWebSocket", err);
        }
    };

    wireSocketEvents() {
        // handle inbound messages from Transcribe
        let transcribeException = false;
        let socketError = false;
        this.socket.onmessage = (message) => {
            //handle socket transcribe response here
        };

        this.socket.onerror = () => {
            socketError = true;
            this.handleError("WebSocket connection error. Try again.");
        };

        this.socket.onclose = (closeEvent) => {
            this.micStream.stop();
            if (!socketError && !transcribeException) {
                if (closeEvent.code != 1000) {
                    this.handleError(
                        "Streaming Exception: " + closeEvent.reason
                    );
                }
            }
        };
    }

    convertAudioToBinaryMessage(audioChunk) {
        //converting audiochunks to pcm buffer

        let raw = mic.toRaw(audioChunk);
        if (raw == null) return;
        let downsampledBuffer = audioUtils.downsampleBuffer(
            raw,
            this.inputSampleRate,
            this.sampleRate
        );
        let pcmEncodedBuffer = new Uint8Array(audioUtils.pcmEncode(downsampledBuffer)).buffer;
        return pcmEncodedBuffer;
    }

    closeSocket = () => {
        if (this.socket && this.socket.readyState === this.socket.OPEN) {
            this.micStream.stop();
            this.socket.close();
        }
    };

    handleError = (err) => {
        this.closeTranscription();
        this.props.onError && this.props.onError(err);
    };

    handleMicClick = () => {
        if (this.state.started) {
            this.closeTranscription();
        } else {
            this.startTranscription();
        }
    };

    startTranscription = () => {
        this.setState({ started: true });
        this.startTranscribe();
    };

    closeTranscription = () => {
        this.setState({ started: false });
        this.transcription = [];
        this.closeSocket();
        this.props.onClose && this.props.onClose();
    };

    startCloseWaitTimer = () => {
        if (this.t) clearTimeout(this.t);
        this.t = setTimeout(() => {
            this.closeTranscription();
        }, 10000);
    };

    render() {
        let { started } = this.state;
        return (
            <div className="stt-mic-container" onClick={this.handleMicClick}>
                <i className={`sttMic fa fa-microphone text-primary`} />
                <div class={`circle-ani ${started ? "active" : ""}`} />
            </div>
        );
    }
}

export default VttMic;
