import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

import HeaderBanner6 from "../../../components/banner/banner6.jsx";
import Footer from "../../../components/footer/footer.jsx";

const BoardUpdate = () => {
    const navigate = useNavigate();
    const { idx } = useParams();
    const [board, setBoard] = useState({
        idx: 0,
        title: "",
        createdBy: "",
        contents: "",
    });

    const { title, createdBy, contents } = board;

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const getBoard = () => {
        fetch(`http://localhost:8080/board/${idx}`, {
            method: "GET", // GET 메서드 사용
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setBoard(data.data);
            })
            .catch((error) => {
                console.error("Error fetching board details:", error.message);
            });
    };

    const updateBoard = () => {
        // PUT 요청으로 변경
        fetch(`http://localhost:8080/board/${idx}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(board),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                alert("수정되었습니다.");
                navigate("/board/" + idx);
            })
            .catch((error) => {
                console.error("Error updating board:", error.message);
            });
    };

    const backToDetail = () => {
        navigate("/board/" + idx);
    };

    useEffect(() => {
        getBoard();
    }, []);

    // return (
    //     <div>
    //         <div>
    //             <span>제목</span>
    //             <input
    //                 type="text"
    //                 name="title"
    //                 value={title}
    //                 onChange={onChange}
    //             />
    //         </div>
    //         <br />
    //         <div>
    //             <span>작성자</span>
    //             <input
    //                 type="text"
    //                 name="createdBy"
    //                 value={createdBy}
    //                 readOnly={true}
    //             />
    //         </div>
    //         <br />
    //         <div>
    //             <span>내용</span>
    //             <textarea
    //                 name="contents"
    //                 cols="30"
    //                 rows="10"
    //                 value={contents}
    //                 onChange={onChange}
    //             ></textarea>
    //         </div>
    //         <br />
    //         <div>
    //             <button onClick={updateBoard}>수정</button>
    //             <button onClick={backToDetail}>취소</button>
    //         </div>
    //     </div>
    // );
    return (
        <div>
            <HeaderBanner6 />
                <div className="spacer" id="forms-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h1 className="title font-bold">수정</h1>
                                <h6 className="subtitle">
                                    Here you can check Demos we created based on
                                    WrapKit. It's quite easy to create your own
                                    dream website &amp; dashboard in no time.
                                </h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" style={{ paddingBottom: "180px" }}>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="createdBy">제목</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={onChange}
                                        className="form-control"
                                        id="name"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="createdBy">작성자</Label>
                                    <Input
                                        type="text"
                                        name="createdBy"
                                        value={createdBy}
                                        readOnly={true}
                                        className="form-control"
                                        id="createdBy"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="createdBy">내용</Label>
                                    <textarea
                                        name="contents"
                                        cols="30"
                                        rows="10"
                                        value={contents}
                                        onChange={onChange}
                                        className="form-control"
                                        id="contents"
                                    ></textarea>
                                </FormGroup>
                                
                                <div className="text-center" style={{ marginTop: "30px" }}>
                                    <Button
                                        type="updaq"
                                        onClick={updateBoard}
                                        className="btn btn-success waves-effect waves-light m-r-10"
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        type="back"
                                        onClick={backToDetail}
                                        className="btn btn-inverse waves-effect waves-light m-r-10"
                                    >
                                        취소
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            <Footer />
        </div>
    );
};

export default BoardUpdate;
