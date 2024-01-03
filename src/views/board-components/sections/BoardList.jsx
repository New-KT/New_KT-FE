// BoardList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoardList = () => {
    const [boardList, setBoardList] = useState([
        {idx: 1, title: '게시글 제목1', contents: '게시글 내용1', createdBy: '작성자1', createdAt: '2024-01-03T00:00:00'},
    ]);

    const getBoardList = () => {
        fetch("http://localhost:8080/board", {
            method: "GET", // GET 메서드 사용
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setBoardList(data.data);
            const pagination = data.pagination;
            console.log(pagination);
        })
        .catch((error) => {
            console.error("Error fetching board list:", error.message);
        });
    };

    useEffect(() => {
        getBoardList();
    }, []);

    return (
        <div>
            <ul>
                {boardList.map((board) => (
                    <li key={board.idx}>
                        <Link to={`/board/${board.idx}`}>{board.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;
