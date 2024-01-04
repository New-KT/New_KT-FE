// AddEventModal.jsx
import React, { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
} from "reactstrap";

const AddEventModal = ({ isOpen, onClose, onSave }) => {
    const [eventTitle, setEventTitle] = useState("");
    const [startEventDate, setStartEventDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endEventDate, setEndEventDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [meeting, setMeetingDay] = useState(false);
    const [eventMemo, setEventMemo] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSaveEvent = () => {
        // // Save the event data
        // const newEvent = {
        //     title: eventTitle,
        //     start: meeting ? `${startEventDate}T${startTime}:00` : startEventDate,
        //     end: meeting ? `${startEventDate}T${endTime}:00` : endEventDate,
        //     memo: eventMemo,
        //     meeting: meeting,
        // };
        // onSave(newEvent);
        // console.log("newEvent:", newEvent);

        // // Reset the form and close the modal
        // setEventTitle("");
        // setStartEventDate("");
        // setStartTime("");
        // setEndEventDate("");
        // setEndTime("");
        // setMeetingDay(false);
        // setEventMemo("");
        // onClose();

        // 파일 업로드
        const formData = new FormData();
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("file", selectedFiles[i]);
            }
        }

        fetch("http://127.0.0.1:8000/schedule/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                "title": eventTitle,
                "start": meeting ? `${startEventDate}T${startTime}:00` : `${startEventDate}T00:00:00`,
                "end": meeting ? `${startEventDate}T${endTime}:00` : `${endEventDate}T00:00:00`,
                "memo": eventMemo,
                "meeting": meeting,
                "file": formData,
            }),
        })
        .then(res => {
            if (res.status !== 201) {
                throw Error(res);
            } return res.json();
        })
        .then(newEvent => {
            onSave(newEvent);
            console.log("newEvent:", newEvent);

            // Reset the form and close the modal
            setEventTitle("");
            setStartEventDate("");
            setStartTime("");
            setEndEventDate("");
            setEndTime("");
            setMeetingDay(false);
            setEventMemo("");
            onClose();

            // 페이지를 새로고침
            window.location.reload();
        })
        .catch((err) => {
            console.error(err);
        })
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>
                <div className="fs-4 fw-semibold">일정 추가</div>
            </ModalHeader>

            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="eventTitle">Title</Label>
                        <Input
                            type="text"
                            id="eventTitle"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup row>
                        <Col md={6}>
                            <Label for="startEventDate">Start Date</Label>
                            <Input
                                type="date"
                                id="startEventDate"
                                value={startEventDate}
                                onChange={(e) => setStartEventDate(e.target.value)}
                            />
                        </Col>

                        {!meeting && (
                            <Col md={6}>
                                <Label for="endEventDate">End Date</Label>
                                <Input
                                    type="date"
                                    id="endEventDate"
                                    value={endEventDate}
                                    onChange={(e) => setEndEventDate(e.target.value)}
                                />
                            </Col>
                        )}
                        
                    </FormGroup>

                    <FormGroup row>
                        {!!meeting && (
                            <Col md={6}>
                                <Input
                                    type="time"
                                    id="startTime"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </Col>
                        )}

                        {!!meeting && (
                            <Col md={6}>
                                <Input
                                    type="time"
                                    id="endTime"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </Col>
                        )}
                    </FormGroup>
                    
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                id="meeting"
                                checked={meeting}
                                onChange={() => setMeetingDay(!meeting)}
                            />
                            Meeting
                        </Label>
                    </FormGroup>

                    <div style={{ marginBottom: "15px" }} />

                    <FormGroup>
                        <Label for="eventMemo">Memo</Label>
                        <Input
                            type="textarea"
                            id="eventMemo"
                            value={eventMemo}
                            onChange={(e) => setEventMemo(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="mb-0">
                        <Label for="fileInput">File Upload</Label>
                        <Input
                            type="file"
                            id="fileInput"
                            multiple
                            onChange={handleFileChange}
                        />
                    </FormGroup>


                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={handleSaveEvent}>
                    Save
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>

        </Modal>
    );
};

export default AddEventModal;