import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
// import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConf: '', 
            phone: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    componentWillMount() {
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value
        })
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    handlePasswordConfChange(event) {
        this.setState({
            passwordConf: event.target.value
        })
    }

    handleSubmit() {
        console.log("Handle submit from signup.js");
        console.log("email: " + this.state.email);
        console.log("password: " + this.state.password);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        app.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((credentials) => {
                this.props.setIsAuthenticatedFlag(true);
                this.props.setLoggedInUser(credentials.user.email);
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log("error signing up" + error);
            });
        });
    }

    render() {
        if (this.props.isAuthenticated)
            this.props.history.push('/');

        return (
            <div>
                <p>Signup</p>
                <form className="ui form">
                    <div class="field">
                        <label>Username</label>
                        <input id="username" className="pasword-field" placeholder="Username" value={this.state.username} onChange={this.handlePasswordChange} />
                    </div>
                    <div className="field">
                        <label>Email ID</label>
                        <input id="email" className="email-field" placeholder="Email ID" value={this.state.email} onChange={this.handleEmailChange} />
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input id="password" type="password" className="pasword-field" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                    <div class="field">
                        <label>Confirm Password</label>
                        <input id="passwordConf" type="password" className="pasword-field" placeholder="Confirm Password" value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
                    </div>
                    <div class="field">
                        <label>Phone</label>
                        <input id="passwordConf" className="pasword-field" placeholder="Phone" value={this.state.phone} onChange={this.handlePhoneChange} />
                    </div>
                    <button type="button" className="ui button" onClick={this.handleSubmit}>Submit</button> 
                </form>
            </div> 
        )
    }

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.isAuthenticated,    
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        setIsAuthenticatedFlag :(isAuthenticated) => dispatch(authActions.setIsAuthenticatedFlag(isAuthenticated)),    
        setLoggedInUser :(user) => dispatch(authActions.setLoggedInUser(user)),    
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup))