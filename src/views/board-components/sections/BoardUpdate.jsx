import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
                    readOnly={true}
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
                <button onClick={updateBoard}>수정</button>
                <button onClick={backToDetail}>취소</button>
            </div>
        </div>
    );
};

export default BoardUpdate;
