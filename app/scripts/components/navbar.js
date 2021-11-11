import React, { Component } from "react";
import ReactDOM from "react-dom";

class Navbar extends Component {
    handleChange(event) {
        event.target.select();
    }
    render() {
        let isUserLoggedIn = this.props.isUserLoggedIn

        if (isUserLoggedIn) {
            return (
                <div className="navbar">
                    <a>
                        <i className="icon ion-log-in">
                        </i>
                    </a>
                </div>
            );
        }
        else {
            return (
                <div className="navbar">
                    <a href="/" >
                        <i className="icon ion-log-out">
                        </i>
                    </a>
                    <a>
                        <i className="icon ion-ios-gear-outline">
                        </i>
                    </a>
                </div>
            );
        }
    }
}
module.exports = Navbar;
