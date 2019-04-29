import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentWillMount() {
        if (this.props.isAuthenticated)
            this.props.history.push('/');
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

    handleSubmit() {
        console.log("Handle submit from signup.js");
        console.log("email: " + this.state.email);
        console.log("password: " + this.state.password);
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
    }

    render() {
        return (
            <div>
                <p>Signup</p>
                <form className="ui form">
                    <div className="field">
                        <label>Email ID</label>
                        <input id="email" className="email-field" placeholder="First Name" value={this.state.email} onChange={this.handleEmailChange} />
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input id="password" className="pasword-field" placeholder="Last Name" value={this.state.password} onChange={this.handlePasswordChange} />
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