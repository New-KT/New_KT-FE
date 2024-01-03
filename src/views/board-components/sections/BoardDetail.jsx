// BoardDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "./Board.jsx";

const BoardDetail = () => {
    const { idx } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const getBoard = () => {
        fetch(`http://localhost:8080/board/${idx}`, {
            method: "GET",
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
                setBoard(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching board details:", error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        getBoard();
    }, [idx]); // Ensure useEffect re-runs when the 'idx' changes

    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <Board
                    idx={board.idx}
                    title={board.title}
                    contents={board.contents}
                    createdBy={board.createdBy}
                />
            )}
        </div>
    );
};

export default BoardDetail;
