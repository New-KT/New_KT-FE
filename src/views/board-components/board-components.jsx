//board-components.jsx
import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

// core components
import HeaderBanner6 from "../../components/banner/banner6.jsx";
import Footer from "../../components/footer/footer.jsx";

// sections for this page
// import PortfolioComponent from "./sections/portfoliocomponent.jsx";
import BoardList from "./sections/BoardList.jsx";

const BoardComponents = () => {
    return (
        <div>
            <HeaderBanner6 />
            <div className="spacer">
                <div className="container-fluid">
                    <Container>
                        <Row className="justify-content-center" style={{ marginTop: "20px" }}>
                            <Col md="7" className="text-center">
                                <h1 className="title font-bold">게시판 목록</h1>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <BoardList />

            <Row className="justify-content-center" style={{ marginTop: "20px", marginBottom: "60px" }}>
                <Col md="auto" className="text-center">
                    <Link to="/write">
                        <Button className="btn btn-inverse waves-effect waves-light">
                            글쓰기
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Footer />
        </div>
    );
};

BoardComponents.propTypes = {
    classes: PropTypes.object,
};

export default BoardComponents;
