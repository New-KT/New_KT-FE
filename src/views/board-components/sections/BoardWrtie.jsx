/* BoardWrite.js */
import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import HeaderBanner6 from "../../../components/banner/banner6.jsx";
import Footer from "../../../components/footer/footer.jsx";

const BoardWrite = () => {
    const [board, setBoard] = useState({
        title: "",
        createdBy: "",
        contents: "",
    });

    const { title, createdBy, contents } = board; //비구조화 할당

    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = () => {
        fetch('http://localhost:8080/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify(board),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            alert("등록되었습니다.");
            window.location.replace("/board");
        })
        .catch((error) => {
            console.error('Error saving board:', error.message);
        });
    };

    const backToList = () => {
        window.location.replace("/board");
    };

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
    //                 onChange={onChange}
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
    //             <Button className="btn btn-inverse waves-effect waves-light" onClick={saveBoard}>
    //                 저장
    //             </Button>
    //             <Button className="btn btn-inverse waves-effect waves-light" onClick={backToList}>
    //                 취소
    //             </Button>
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
                                <h1 className="title font-bold">글쓰기</h1>
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
                                        onChange={onChange}
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
                                        type="save"
                                        onClick={saveBoard}
                                        className="btn btn-success waves-effect waves-light m-r-10"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        type="back"
                                        onClick={backToList}
                                        className="btn btn-inverse waves-effect waves-light m-r-10"
                                    >
                                        Back
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

export default BoardWrite;
