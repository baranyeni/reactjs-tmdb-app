import React, {Component} from 'react';
import ReactDOM, {render} from "react-dom";
import App from "./app-main";
import Navbar from './navbar';
import {useHistory} from 'react-router-dom';
import SearchBox from "./search";
import Card from "./card";

class AccountSettings extends Component {
    constructor(props) {
        super(props)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.signInUser = this.signInUser.bind(this)

        this.state = {
            email: "sanane@gmail.com",
            password: "sanane"
        }
    }

    render() {
        return (
            <div>
                <div className="login-container">
                    <div className="form-login">
                        <ul className="login-nav">
                            <li className="login-nav__item active">
                                <a href="#">Sign In</a>
                            </li>
                            <li className="login-nav__item">
                                <a href="#">Sign Up</a>
                            </li>
                        </ul>
                        <label htmlFor="login-input-user" className="login__label">
                            Username
                        </label>
                        <input id="login-input-user" value={this.state.email} onChange={this.updateEmail}
                               className="login__input" type="text"/>
                        <label htmlFor="login-input-password" className="login__label">
                            Password
                        </label>
                        <input id="login-input-password" value={this.state.password} onChange={this.updatePassword}
                               className="login__input" type="password"/>
                        <button onClick={this.signInUser} className="login__submit">Sign in</button>

                    </div>
                    <a onClick={this.forgotPassword} className="login__forgot">Forgot Password?</a>
                </div>
            </div>
        )
    }

    updateEmail(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    signInUser() {
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        };

        fetch('https://movie-app-backend-by.herokuapp.com/auth/sign_in', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response["success"] == false) {
                    alert(response["errors"]);
                } else {
                    alert("Login successful! Redirecting you to liked movies.");
                    this.isUserLoggedIn = true;

                    // window.location = "/";
                }
            })
    }

    forgotPassword() {
        alert("Nothing to do at the moment. This feature will be added in future.");
    }
}

export default AccountSettings;
