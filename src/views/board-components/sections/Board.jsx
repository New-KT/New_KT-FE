import React from "react";
import { useNavigate } from "react-router-dom";

const Board = ({ idx, title, contents, createdBy }) => {
    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate("/update/" + idx);
    };

    const deleteBoard = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            fetch(`http://localhost:8080/board/${idx}`, {
                method: "DELETE",
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
                    alert("삭제되었습니다.");
                    navigate("/board");
                })
                .catch((error) => {
                    console.error("Error deleting board:", error.message);
                });
        }
    };

    const moveToList = () => {
        navigate("/board");
    };

    return (
        <div>
            <div>
                <h2>{title}</h2>
                <h5>{createdBy}</h5>
                <hr />
                <p>{contents}</p>
            </div>
            <div>
                <button onClick={moveToUpdate}>수정</button>
                <button onClick={deleteBoard}>삭제</button>
                <button onClick={moveToList}>목록</button>
            </div>
        </div>
    );
};

export default Board;
