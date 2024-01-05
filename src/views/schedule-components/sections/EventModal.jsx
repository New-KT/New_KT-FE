// EventModal.jsx
import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Col,
    Row,
} from "reactstrap";
import "../css/EventModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

const formatTimeRange = (startString, endString) => {
    const startDate = new Date(startString);
    const endDate = new Date(endString);
    const startTime = startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${startTime} - ${endTime}`;
};

const EventModal = ({
    isOpen,
    onClose,
    eventTitle,
    eventStartDate,
    eventEndDate,
    eventKeyword,
    eventMeetingSummary,
    eventArticleTitle,
    eventArticleLink,
    eventMemo,
    meeting,
    files,

    onDelete,
}) => {
    const renderArticleLinks = () => {
        if (
            eventArticleLink &&
            eventArticleTitle &&
            eventArticleLink.length === eventArticleTitle.length
        ) {
            return (
                <div>
                    {eventArticleTitle.map((title, index) => (
                        <div key={index}>
                            <p style={{ margin: "0" }}>
                                <a
                                    className="event-title-link"
                                    href={eventArticleLink[index]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {title}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            );
        } else {
            return <p>No articles available</p>;
        }
    };

    const renderFiles = () => {
        if (files && files.length > 0) {
            return (
                <div>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                <div>
                                    <h5>{file.file_name}</h5>
                                    <a
                                        href={file.file_link}
                                        download={file.file_name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <p>No files available</p>;
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className="modal-xl">
            <ModalHeader toggle={onClose}>
                <div className="fs-1">{eventTitle}</div>
                <div className="fs-6">
                    {meeting
                        ? `${eventStartDate} - ${eventEndDate}`
                        : `${formatDate(eventStartDate)} ${formatTimeRange(
                              eventStartDate,
                              eventEndDate
                          )}`}
                </div>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3">
                {!meeting && (
                    <>
                        <Row>
                            <Col>
                                <h3>키워드</h3>
                                <div>
                                    <p>{eventKeyword}</p>
                                </div>
                            </Col>
                            <Col>
                                <h3>기사</h3>
                                <div>{renderArticleLinks()}</div>
                            </Col>
                        </Row>
                        <Row>
                            <h3>회의 요약</h3>
                            <p>{eventMeetingSummary}</p>
                        </Row>
                    </>
                )}
                <Row>
                    <h3>메모</h3>
                    <p>{eventMemo}</p>
                </Row>
                <Row>
                    <h3>파일</h3>
                    {renderFiles()}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => onDelete()}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EventModal;
