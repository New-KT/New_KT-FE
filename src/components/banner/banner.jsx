import React from "react";
// import { HashLink as Link } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const HeaderBanner = () => {
    return (
        <div className="static-slider-head">
            <Container>
                <Row className="justify-content-center">
                    <Col
                        lg="8"
                        md="6"
                        className="align-self-center text-center"
                    >
                        <h1 className="title" style={{ marginTop: "50px" }}>
                            New KT
                        </h1>
                        {/* <div class="main_slogan">
                            <p>
                                <span class='bgtext' data-text="IN">
                                    "IN"
                                    ::after
                                </span>
                                <span class="stroke">SIGHT,</span>
                            </p>
                            <p>
                                <span class="bgtext" data-text="NER">NER</span>
                                <span class="stroke">VE,</span>
                            </p>
                        </div> */}
                        <h4 className="subtitle font-light">
                            A tool to conduct your meetings more efficiently.
                            <br /> " New Keyword Tool "
                        </h4>
                        <Link
                            to="/signin"
                            className="btn btn-md m-t-40 btn-info-gradiant font-16"
                            style={{ marginTop: "100px" }}
                        >
                            Meeting
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeaderBanner;
