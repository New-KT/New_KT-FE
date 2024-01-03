/* BoardWrite.js */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "reactstrap";

const BoardWrite = () => {
    const navigate = useNavigate();

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
            navigate("/board");
        })
        .catch((error) => {
            console.error('Error saving board:', error.message);
        });
    };

    const backToList = () => {
        navigate("/board");
    };

    return (
        <div>
            <div>
                <span>제목</span>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                />
            </div>
            <br />
            <div>
                <span>작성자</span>
                <input
                    type="text"
                    name="createdBy"
                    value={createdBy}
                    onChange={onChange}
                />
            </div>
            <br />
            <div>
                <span>내용</span>
                <textarea
                    name="contents"
                    cols="30"
                    rows="10"
                    value={contents}
                    onChange={onChange}
                ></textarea>
            </div>
            <br />
            <div>
                <Button className="btn btn-inverse waves-effect waves-light" onClick={saveBoard}>
                    저장
                </Button>
                <Button className="btn btn-inverse waves-effect waves-light" onClick={backToList}>
                    취소
                </Button>
            </div>
        </div>
    );
};

export default BoardWrite;
