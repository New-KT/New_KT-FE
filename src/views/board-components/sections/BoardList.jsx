// BoardList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

// 날짜 포맷 변경 함수
const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const BoardList = () => {
    const [boardList, setBoardList] = useState([
        {
            idx: 1,
            title: "게시글 제목1",
            contents: "게시글 내용1",
            createdBy: "작성자1",
            createdAt: "2024-01-03T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 2,
            title: "게시글 제목2",
            contents: "게시글 내용2",
            createdBy: "작성자2",
            createdAt: "2024-01-04T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 3,
            title: "게시글 제목3",
            contents: "게시글 내용3",
            createdBy: "작성자3",
            createdAt: "2024-01-05T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 4,
            title: "게시글 제목4",
            contents: "게시글 내용4",
            createdBy: "작성자4",
            createdAt: "2024-01-06T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 5,
            title: "게시글 제목5",
            contents: "게시글 내용5",
            createdBy: "작성자5",
            createdAt: "2024-01-07T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 6,
            title: "게시글 제목6",
            contents: "게시글 내용6",
            createdBy: "작성자6",
            createdAt: "2024-01-08T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 7,
            title: "게시글 제목7",
            contents: "게시글 내용7",
            createdBy: "작성자7",
            createdAt: "2024-01-09T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 8,
            title: "게시글 제목8",
            contents: "게시글 내용8",
            createdBy: "작성자8",
            createdAt: "2024-01-10T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 9,
            title: "게시글 제목9",
            contents: "게시글 내용9",
            createdBy: "작성자9",
            createdAt: "2024-01-11T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        {
            idx: 10,
            title: "게시글 제목10",
            contents: "게시글 내용10",
            createdBy: "작성자10",
            createdAt: "2024-01-12T00:00:00",
            currentPage: 1,
            totalPages: 2,
        },
        // {
        //     idx: 11,
        //     title: "게시글 제목1",
        //     contents: "게시글 내용1",
        //     createdBy: "작성자1",
        //     createdAt: "2024-01-03T00:00:00",
        //     currentPage: 2,
        //     totalPages: 2,
        // },
        // {
        //     idx: 12,
        //     title: "게시글 제목2",
        //     contents: "게시글 내용2",
        //     createdBy: "작성자2",
        //     createdAt: "2024-01-04T00:00:00",
        //     currentPage: 2,
        //     totalPages: 2,
        // },
        // {
        //     idx: 13,
        //     title: "게시글 제목3",
        //     contents: "게시글 내용3",
        //     createdBy: "작성자3",
        //     createdAt: "2024-01-05T00:00:00",
        //     currentPage: 2,
        //     totalPages: 2,
        // },
        // {
        //     idx: 14,
        //     title: "게시글 제목4",
        //     contents: "게시글 내용4",
        //     createdBy: "작성자4",
        //     createdAt: "2024-01-06T00:00:00",
        //     currentPage: 2,
        //     totalPages: 2,
        // },
        // {
        //     idx: 15,
        //     title: "게시글 제목5",
        //     contents: "게시글 내용5",
        //     createdBy: "작성자5",
        //     createdAt: "2024-01-07T00:00:00",
        //     currentPage: 2,
        //     totalPages: 2,
        // },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(boardList[0].totalPages);


    const getBoardList = (page = 1) => {
        fetch(`http://localhost:8080/board?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // 서버 응답에서 페이지 정보를 가져와 상태를 업데이트
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);

                // 서버 응답에서 게시글 목록을 가져와 상태를 업데이트
                setBoardList(data.data);
            })
            .catch((error) => {
                console.error("Error fetching board list:", error.message);
            });
    };

    useEffect(() => {
        getBoardList();
    }, []);

    const handlePageChange = (page) => {
        getBoardList(page);
    };

    return (
        <div className="board-list-container" style={{ margin: "0 auto", maxWidth: "1000px" }}>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "50px" }}>
                            #
                        </th>
                        <th scope="col" style={{ width: "200px" }}>
                            제목
                        </th>
                        <th scope="col" style={{ width: "100px" }}>
                            작성자
                        </th>
                        <th scope="col" style={{ width: "150px" }}>
                            작성일
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((board, index) => (
                        <tr key={board.idx}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <Link to={`/board/${board.idx}`} onClick={() => console.log(`Clicked: ${board.idx}`)}>
                                    {board.title}
                                </Link>
                            </td>
                            <td>{board.createdBy}</td>
                            <td>{formatDate(board.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <Pagination style={{ margin: "20px" }}>
                    <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                            previous
                            onClick={() => handlePageChange(currentPage - 1)}
                        />
                    </PaginationItem>

                    {[...Array(totalPages).keys()].map((page) => (
                        <PaginationItem
                            key={page + 1}
                            active={currentPage === page + 1}
                        >
                            <PaginationLink
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                            next
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    );
};

export default BoardList;
