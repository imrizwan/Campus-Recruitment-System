import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Image1 from "../../assets/image1.jpg";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpg";
import { connect } from "react-redux"

class PublicDashboard extends React.Component {
    render() {
        return (
            <div>
                <AwesomeSlider>
                    <div data-src={Image1} />
                    <div data-src={Image2} />
                    <div data-src={Image3} />
                </AwesomeSlider>
                <h1 className="text-center" style={{ marginTop: 60 }}>
                    Welcome
                </h1>
            </div>
        )
    }
}

export default PublicDashboard;