import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import App from './app-main';
import AccountSettings from './account_settings';

class Navbar extends Component {
    handleChange(event) {
        event.target.select();
    }
    render() {
        let isUserLoggedIn =  false; //this.props.isUserLoggedIn;

        if (!isUserLoggedIn) {
            return (
                <Router>
                    <div>
                        <nav>
                            <ul className="navbar">
                                <li>
                                    <Link to="/home">
                                        <a>
                                            <i className="icon ion-home">
                                            </i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sign_in">
                                        <a>
                                            <i className="icon ion-log-in">
                                            </i>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/sign_in">
                                { SignIn }
                            </Route>
                            <Route path="/home">
                                { Home }
                            </Route>
                        </Switch>
                    </div>
                </Router>
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

function SignIn() {
    ReactDOM.render(< AccountSettings />  , document.getElementById('app'));
}

function Home() {
    ReactDOM.render(< App />  , document.getElementById('app'));
}

export default Navbar;
