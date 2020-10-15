import React, { Component } from "react";
import WarningClose from '../../../assets/images/WarningClose.png';
import "./Errors.scss";

class Errors extends Component {

    close() {
        var errDiv = document.getElementById("errorDiv");
        errDiv.style.display = "none";
        document.getElementById("errorTxt").innerText = "";
    }
    render() {
        return (
            <div id="errorDiv" className={"_padding-rl-21 _padding-t-13 _padding-b-11 " + [this.props.isSuccess ? "success-div" : "error-div"]}>
                <div className="row">
                    <div className="col-md-12 d-flex align-items-center" >
                        <p id="errorTxt" className="_margin-auto">{this.props.text} </p>
                        <img src={WarningClose} alt="Warning Close" onClick={() => { this.close() }} />
                    </div>
                </div>
            </div>
        )
    }
}

export { Errors };
