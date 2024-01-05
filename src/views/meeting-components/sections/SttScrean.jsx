// import Recorder from "./Recorder";

// const SttScreen = () => {
 
//     const inputText = useSelector(state => state.stt.inputText);
//     const isPlaying = useSelector(state => state.stt.isPlaying);
//     const dispatch = useDispatch();
 
//     // ws
//     const [recorder] = useState(() => new Recorder());
 
//     const handleText = (text) => {
//         dispatch(setInputText(text));
//     }
    
//     const handleBtn = useCallback(event => {
//         dispatch(setIsPlaying(!isPlaying));
 
//         if (isPlaying) {
//             recorder.stop();
//         } else {
//             dispatch(setInputText(""));
//             recorder.start();
//         }
//     }, [isPlaying]);
    
//     useEffect(() => {
//         recorder.init({
//             path : scenario.url,
//             // 녹음 시작
//             onStart : function(event) {
//                 console.log("녹음 시작 : 마이크 on 해줄것");
//                 setSequence({
//                     segments : [0, 60],
//                     forceFlag : false,
//                 })
//                 dispatch(setIsPlaying(true));
//             },
//             // 인식된 결과 전달받음
//             onResult : function(text, isRepeat) {
//                 console.log("결과 받았음 : 화면에 추가해줄것");
//                 dispatch(setInputText(text));
//             },
//             // 종결 전달 받음
//             onClose : function(event) {
//                 console.log("결과 전달 끝났음 : 마이크 off 해줄것");
//                 setSequence({
//                     segments : [0, 1],
//                     forceFlag : false,
//                 })
//                 dispatch(setIsPlaying(false));
//             },
//             // 에러 발생
//             onError : function(event) {
//                 toastError("서버와의 연결을 실패하였습니다.");
//             }
//         });
//     }, []);
 
//     return (
//         <>
//             <textarea text={inputText} onChange={(text) => {handleText(text)}} />
//             <button onClick={() => handleBtn()} />
//         </>
//     )
// }
 
// export default SttScreen;