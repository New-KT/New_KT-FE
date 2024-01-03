// Board.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import HeaderBanner6 from "../../../components/banner/banner6.jsx";
import Footer from "../../../components/footer/footer.jsx";

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
        window.location.replace("/board");
    };

    return (
        <div>
            <HeaderBanner6 />
            <div>
                <h2>{title}</h2>
                <h5>{createdBy}</h5>
                <hr />
                <p>{contents}</p>
            </div>
            <div className="text-center" style={{ marginTop: "30px" }}>
                <Button
                    type="update"
                    onClick={moveToUpdate}
                    className="btn btn-inverse waves-effect waves-light m-r-10"
                >
                    수정
                </Button>
                <Button
                    type="delete"
                    onClick={deleteBoard}
                    className="btn btn-inverse waves-effect waves-light m-r-10"
                >
                    삭제
                </Button>
                <Button
                    type="list"
                    onClick={moveToList}
                    className="btn btn-inverse waves-effect waves-light m-r-10"
                >
                    목록
                </Button>
            </div>
            <Footer />
        </div>
    );
};

export default Board;
