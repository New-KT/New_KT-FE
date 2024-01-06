// Voice.js

import React, { useState, useEffect } from "react";
import { Button, Container } from "reactstrap";

import KeywordComponent from "./keyword.jsx";

const Voice = () => {
    const [socket, setSocket] = useState(null);
    const [isStarted, setIsStarted] = useState(false);

    const [NewKeywordData, setNewKeywordData] = useState({});
    // const [NewKeywordData, setNewKeywordData] = useState({
    //     '회의': [
    //         {
    //           'keyword': '회의',
    //           'title': ['정부, 국무회의서 쌍특검법 거부권 행사안 의결', '국무회의서 ‘쌍특검법’ 거부권 건의 의결', '정부, 임시국무회의 열어 ‘쌍특검법안’ 재의요구안 의결'],
    //           'link': ['https://n.news.naver.com/mnews/article/023/0003808964?sid=100', 'https://n.news.naver.com/mnews/article/020/0003541007?sid=100', 'https://n.news.naver.com/mnews/article/056/0011636295?sid=100'],
    //           'news_summary': '국립대학 쓰리라 연방총장들이 양곡정국 실천제 도입을 국회로 되돌려 보내자 김재준 내과 국립대학 소식검 문제와 대통령 재선 때문에 제철마저 흔들릴 게 오심 전은국  국립대학 소식검청이 일 한국라 쓰리라 소식동 쓰리라 이종욱경 제철마검속 것이라고 수검마정답란은 마멀 것만 같은 법이,말합니다.0304'
    //         }
    //       ],
    //       '키워드 추출': [
    //         {
    //           'keyword': '키워드 추출',
    //           'title': ['제약업계 키워 드는 AI…“비용·시간 절감” [투자360]', "K2, 내년 아웃도어 시장 키워드 'DRAGON'", "[일문일답] SKB &quot;OTT 경쟁 속 B tv 생존 키워드는 '고객'…넷플릭스 연계 상품..."],
    //           'link': ['https://n.news.naver.com/mnews/article/016/0002245616?sid=101', 'https://n.news.naver.com/mnews/article/119/0002783640?sid=101', 'https://n.news.naver.com/mnews/article/241/0003319901?sid=105'],
    //           'news_summary': '요약:\n식약처는 인공지능(AI) 기술을 활용한 제약 시장이 빠르게 성장하고 있으며, 2023년까지 약 1.3조원 규모로 전망되고 있다고 밝혔다. ... AI를 통해 희귀병이나 감염병 등 다양한 질환용 신약을 신속하게 개발할 수 있고, 맞춤형 신약 개발에도 용이해진다는 것이다.'
    //         }
    //       ]
    //   });
      

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

            window.location.replace("/summary");
        }
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "total" && data.total) {
                    // 'total' 타입의 메시지를 받았을 때의 처리
                    console.log("Received total data:", data.total);
                    
                    const newKeywordObject = {};

                    // data.total.forEach((innerArray) => {
                    //     const key = innerArray[0].keyword;
                    //     // key를 기반으로 객체 생성
                    //     newKeywordObject[key] = innerArray.map(item => ({
                    //       title: item.title,
                    //       link: item.link,
                    //       news_summary: item.news_summary,
                    //     }));
                    // });
                    data.total.forEach((innerArray) => {
                        const key = innerArray[0].keyword;
                        newKeywordObject[key] = innerArray;
                    });

                    // setKeywordDataState로 상태 업데이트
                    console.log("keywordDataObject:", NewKeywordData);
                    setNewKeywordData(newKeywordObject);
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
        <Container style={{ textAlign: 'center', marginBottom: '50px' }}>
            <KeywordComponent keywordData={NewKeywordData} />

            <div style={{ marginTop: '20px' }}>
                {isStarted ? (
                    <Button color="danger" onClick={finishWebSocket} style={{ marginBottom: '20px' }}>
                        Finish
                    </Button>
                ) : (
                    <Button color="primary" onClick={toggleWebSocket}>
                        Start
                    </Button>
                )}
            </div>
        </Container> 
    );
};

export default Voice;
