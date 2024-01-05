// const Recorder = function () {
//     this.serverUrl = null;
//     this.audioContext =
//         window.AudioContext ||
//         window.webkitAudioContext ||
//         window.mozAudioContext ||
//         window.oAudioContext ||
//         window.msAudioContext;
//     this.context = null; // new audioContext
//     this.audioInput = null;
//     this.recorder = null;
//     this.recording = false;
//     this.stream = null;
//     this.wsServiceConfig = {
//         repeat: "repeat",
//         drop: "nodrop",
//     };
//     this.callback = {
//         onStart: (f) => f,
//         onResult: (f) => f,
//         onClose: (f) => f,
//         onError: (f) => f,
//     };
//     this.webSocket = null;
//     navigator.getUserMedia =
//         navigator.getUserMedia ||
//         navigator.webkitGetUserMedia ||
//         navigator.mozGetUserMedia;

//     const self = this;
//     this.init = function ({ path, onStart, onResult, onClose, onError }) {
//         // 서버 초기 연결 : repeat / drop 설정
//         self.serverUrl = `wss://ai-mediazen.com:${path}/ws`;
//         const wsService = new WsService({
//             path: self.serverUrl,
//             onOpen: function (event) {
//                 if (wsService.ws.readyState === 1) {
//                     wsService.ws.send(wsService.initMsg);
//                 }
//             },
//             onMessage: function (event) {
//                 const _arr = event.data.split(",");

//                 self.wsServiceConfig.repeat =
//                     _arr[1] === "0" ? "norepeat" : "repeat";
//                 self.wsServiceConfig.filedrop =
//                     _arr[2] === "0" ? "nodrop" : "drop";

//                 wsService.ws.close();
//             },
//         });

//         // 콜백 저장
//         self.callback.onStart = onStart;
//         self.callback.onResult = onResult;
//         self.callback.onClose = onClose;
//         self.callback.onError = onError;
//     };

//     this.setup = async function () {
//         try {
//             this.stream = await navigator.mediaDevices.getUserMedia({
//                 audio: { optional: [{ echoCancellation: false }] },
//                 video: false,
//             });
//         } catch (err) {
//             return console.log("getStream 오류");
//         }
//         this.context = new this.audioContext({
//             sampleRate: 16000,
//         });
//         this.audioInput = this.context.createMediaStreamSource(this.stream);

//         const bufferSize = 4096;
//         this.recorder = this.audioInput.context.createScriptProcessor(
//             bufferSize,
//             1,
//             1
//         ); // mono channel
//         this.recorder.onaudioprocess = function (event) {
//             // 녹음 데이터 처리
//             if (!self.recording) return;
//             self.sendChannel(event.inputBuffer.getChannelData(0));
//         };
//         this.recorder.connect(this.context.destination);
//         this.audioInput.connect(this.recorder);
//     };

//     this.sendChannel = function (channel) {
//         console.log("[Recorder] process channel");
//         const dataview = this.encodeRAW(channel);
//         const blob = new Blob([dataview], { type: "audio/x-raw" });

//         // send : 최초 1회 연결
//         if (!self.webSocket) {
//             self.webSocket = new WsService({
//                 path: self.serverUrl,
//                 onOpen: function (event) {
//                     console.log("open");
//                     self.webSocket.ws.send(
//                         '{"language":"ko","intermediates":true,"cmd":"join"}'
//                     );
//                 },
//                 onMessage: function (event) {
//                     console.log(event.data);
//                     const receiveMessage = JSON.parse(event.data);
//                     const payload = JSON.stringify(receiveMessage.payload);
//                     const textMessage = JSON.parse(payload);
//                     if (receiveMessage.event === "reply") {
//                         console.log("시작");
//                         self.recording = true;
//                     }
//                     if (receiveMessage.event === "close") {
//                         console.log("closed");
//                         if (textMessage.status) {
//                             self.callback.onResult(event, "norepeat");
//                         }
//                         self.webSocket.ws.close();
//                         self.webSocket = null;
//                         self.stop();
//                         self.callback.onClose(event);
//                     }
//                     // 결과물
//                     else if (textMessage.text) {
//                         self.callback.onResult(
//                             textMessage.text,
//                             self.wsServiceConfig.repeat
//                         );
//                     } else if (textMessage.stt) {
//                         self.callback.onResult(
//                             textMessage.stt[0].text,
//                             self.wsServiceConfig.repeat
//                         );
//                     }
//                 },
//             });
//         }

//         if (self.webSocket.ws.readyState === 1) {
//             if (blob.size > 0) self.webSocket.ws.send(blob);
//         }
//     };
//     this.encodeRAW = function (channel) {
//         const buffer = new ArrayBuffer(channel.length * 2);
//         const view = new DataView(buffer);
//         let offset = 0;
//         for (let i = 0; i < channel.length; i++, offset += 2) {
//             const s = Math.max(-1, Math.min(1, channel[i]));
//             view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
//         }
//         return view;
//     };

//     this.start = function () {
//         console.log("[Recorder] start");
//         if (!self.recorder) {
//             this.setup();
//         }
//         self.recording = true;
//     };

//     this.stop = function () {
//         console.log("[Recorder] stop");
//         this.close();
//         self.recording = false;
//     };

//     this.close = function () {
//         if (this.webSocket && this.webSocket.ws.readyState === 1) {
//             console.log("closed");
//             this.webSocket.ws.send(
//                 '{"language":"ko","intermediates":true,"cmd":"quit"}'
//             );
//         }
//     };
// };

// export default Recorder;
