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
    Container,
} from "reactstrap";
import "../css/EventModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

const formatTimeRange = (startString, endString) => {
    const startDate = new Date(startString);
    const endDate = new Date(endString);
    const startTime = startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const endTime = endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${startTime} - ${endTime}`;
};

const EventModal = ({
    isOpen,
    onClose,
    eventTitle,
    eventStartDate,
    eventEndDate,
    eventKeyword,
    eventSummary,
    eventMemo,
    meeting,
    
}) => {

    return (
        <Modal isOpen={isOpen} toggle={onClose} className="modal-xl">
            {" "}
            {/* 추가된 className */}
            <ModalHeader toggle={onClose}>
                <div className="fs-1">{eventTitle}</div>
                <div className="fs-6">
                    {meeting
                        ? `${eventStartDate} - ${eventEndDate}`
                        : `${formatDate(eventStartDate)} ${formatTimeRange(eventStartDate, eventEndDate)}`}
                </div>
            </ModalHeader>
            <ModalBody className="d-flex flex-column gap-3">
                <Row>
                    <Col>
                      <h3>키워드</h3>
                        <div>
                            <p>{eventKeyword}</p>
                        </div>
                    </Col>
                    <Col>
                      <h3>기사</h3>
                        <div>
                            <p>{eventSummary}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                  <h3>회의 요약</h3>
                  <p>{eventSummary}</p>
                </Row>
                <Row>
                  <h3>메모</h3>
                  <p>{eventMemo}</p>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EventModal;
