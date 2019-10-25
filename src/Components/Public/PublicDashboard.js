import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Image1 from "../../assets/image1.jpg";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpg";
import { getAllVaccancies } from "../../Actions/profileActions";
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import isEmpty from "../../validation/is-empty";
import Loader from "../Loader/Loader";
const styles = theme => ({});
class PublicDashboard extends React.Component {

    async componentDidMount() {
        await this.props.getAllVaccancies()
    }

    render() {
        if (
            isEmpty(this.props.getallvaccancies)
        ) {
            return <Loader />;
        } else {
            return (
                <div>
                    <AwesomeSlider style={{ height: "450px" }}>
                        <div data-src={Image1} />
                        <div data-src={Image2} />
                        <div data-src={Image3} />
                    </AwesomeSlider>
                    <h1 className="text-center" style={{ marginTop: 60 }}>
                        Recent Jobs
                </h1>
                    <div className="row mx-4 my-4">
                        {
                            this.props.getallvaccancies.slice(0,10).map((data, index) => (
                                <div className="col-sm-6" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{data.position}</h5>
                                            <p className="card-text">{data.jobtype}</p>
                                            <p className="card-text">{data.description.length > 100 ? `${data.description.slice(0,100)}...` : data.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    getallvaccancies: state.profile.getallvaccancies
});

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        { getAllVaccancies }
    )
)(withRouter(PublicDashboard));