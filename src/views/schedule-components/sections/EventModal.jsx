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
    eventKeywords,
    eventMeetingSummary,
    eventMemo,
    meeting,
    files,

    onDelete,
}) => {
    
    const [selectedKeyword, setSelectedKeyword] = React.useState(null);
    const [hoveredKeyword, setHoveredKeyword] = React.useState(null);

    const renderArticleLinks = (keyword) => {
        if (keyword && keyword.article_links && keyword.article_links.length > 0) {
            return (
                <div>
                    {keyword.article_links.map((link, articleIndex) => (
                        <p key={articleIndex}>
                            <a
                                className="event-title-link"
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {keyword.article_titles[articleIndex]}
                            </a>
                        </p>
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
                <div className="fs-1 fw-bold">{eventTitle}</div>
                <div className="fs-6">
                    {meeting
                        ? `${formatDate(eventStartDate)} ${formatTimeRange(
                            eventStartDate,
                            eventEndDate
                        )}`
                        : `${formatDate(eventStartDate)} - ${formatDate(eventEndDate)}`}
                </div>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3" style={{ color: 'black' }}>
            {meeting ? (
                    <>
                        <Row>
                            <Col>
                                <h3 style={{ fontWeight: 'bold' }}>키워드</h3>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {eventKeywords &&
                                        eventKeywords.map((keyword, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedKeyword(keyword)}
                                                onMouseEnter={() => setHoveredKeyword(keyword)}
                                                onMouseLeave={() => setHoveredKeyword(null)}
                                                className={`keyword-item ${selectedKeyword === keyword ? 'selected' : ''} ${hoveredKeyword === keyword ? 'hovered' : ''}`}
                                                style={{ 
                                                    color: selectedKeyword === keyword ? 'blue' : 'black',
                                                    marginRight: '10px',
                                                    marginBottom: '10px',
                                                    fontSize: '20px', }}
                                            >
                                                <p>{keyword.keyword}</p>
                                            </div>
                                        ))}
                                </div>
                            </Col>
                            <Col>
                                <h3 style={{ fontWeight: 'bold'}}>기사</h3>
                                <div>{selectedKeyword && renderArticleLinks(selectedKeyword)}</div>
                            </Col>
                        </Row>
                        <Row>
                            <h3 style={{ fontWeight: 'bold'}}>회의 요약</h3>
                            <p>{eventMeetingSummary}</p>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row>
                            <h3 style={{ fontWeight: 'bold'}}>메모</h3>
                            <p>{eventMemo}</p>
                        </Row>
                        <Row>
                            <h3 style={{ fontWeight: 'bold'}}>파일</h3>
                            {renderFiles()}
                        </Row>
                    </>
                )}
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
