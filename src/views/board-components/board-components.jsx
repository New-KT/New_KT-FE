//board-components.jsx
import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import { Link } from "react-router-dom";

// core components
import HeaderBanner6 from "../../components/banner/banner6.jsx";
import Footer from "../../components/footer/footer.jsx";

// sections for this page
// import PortfolioComponent from "./sections/portfoliocomponent.jsx";
import BoardList from "./sections/BoardList.jsx";

const BoardComponents = () => {
    return (
        <div id="main-wrapper">
            <div className="page-wrapper">
                <div className="container-fluid">
                    <HeaderBanner6 />
                    <p class="fs-1 fw-bold">게시판 목록</p>
                    <BoardList />
                </div>
            </div>

            <Link to="/write">
                <Button className="btn btn-inverse waves-effect waves-light">
                    글쓰기
                </Button>
            </Link>

            

            <Footer />
        </div>
    );
};

BoardComponents.propTypes = {
    classes: PropTypes.object,
};

export default BoardComponents;
