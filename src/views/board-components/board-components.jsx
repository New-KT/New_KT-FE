//schedule-components.jsx
import React from "react";
import PropTypes from "prop-types";

// core components
import HeaderBanner6 from "../../components/banner/banner6.jsx";
import Footer from "../../components/footer/footer.jsx";

// sections for this page
// import PortfolioComponent from "./sections/portfoliocomponent.jsx";

const BoardComponents = () => {
    return (
        <div id="main-wrapper">
            <div className="page-wrapper">
                <div className="container-fluid">
                    <HeaderBanner6 />
                    {/* <TeamComponent /> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

BoardComponents.propTypes = {
    classes: PropTypes.object
};

export default BoardComponents;
