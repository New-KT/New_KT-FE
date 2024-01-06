import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardText, CardHeader } from "reactstrap";

const formatTimeRange = (startString, endString) => {
    const startDate = new Date(startString);
    const endDate = new Date(endString);
    const startTime = startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const endTime = endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${startTime} - ${endTime}`;
};

const HeaderBanner2 = () => {
    const [schedule, setSchedule] = useState([
        // 현재 시간 기준으로 가장 가까운 일정만 백엔드에서 가져오기
        // {id:6, title: '그룹미팅', start: '2023-12-29T13:10:00', end: '2023-12-29T14:00:00', memo: '그룹미팅 준비해두기 1시간 30분 소요 예정', },
    ]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/token/home", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(now_event => {
            setSchedule([now_event]);
            console.log("now_event:", now_event);
        })
        .catch((err) => {
            console.error(err);
        })
    }, []);
    

    return (
        <div className="static-slider-head">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="6" className="align-self-center text-center">
                        {schedule.length > 0 ? (
                            schedule.map(event => (
                                <Card key={event.id} className="m-t-20">
                                    <CardHeader>
                                        <div className="fs-4">{event.title}</div>
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>
                                            <div className="fs-2">{formatTimeRange(event.start, event.end)}</div>
                                            <div className="fs-6">{event.memo}</div>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <p>Loading schedule...</p>
                        )}
                        <Link
                            to="/meeting"
                            className="btn btn-md m-t-40 btn-info-gradiant font-16"
                            style={{ marginTop: "20px" }}
                        >
                            Join
                        </Link>
                        <Link
                            to="/meeting"
                            className="btn btn-md m-t-40 btn-warning font-16"
                            style={{ marginTop: "20px", marginLeft: "20px"}}
                        >
                            New
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeaderBanner2;
