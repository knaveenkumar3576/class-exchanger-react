import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
// import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { withRouter, Link } from 'react-router-dom';
import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'
import  { Container, Row, Col, Form } from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';

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

        this.handleUsernameChange = this.handleUsernameChange.bind(this); // Username is fuillnane
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);
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
        const { username, email, password, passwordConf, phone } = this.state;
        console.log('email: ' + email);
        console.log('password: ' + password);
        console.log('Fullname: ' + username);
        console.log('phone: ' + phone);

        var passwordErr = '';
        var phoneErr = '';
        var emailErr = '';
        var errorFlag = false;
        var usernameErr = '';

        if (password !== passwordConf || password.length === 0 || passwordConf.length === 0) {
            passwordErr = 'Passwords doesn\'t match';
            errorFlag = true;
        }
        if (/^\d+$/.test(phone) == false || (phone.length !== 10)) {
            phoneErr = 'Phone number is invalid. Please enter only numbers and exactly 10 digits in number';
            errorFlag = true;
        }
        if (!isEmail(email)) {
            emailErr = 'Email ID is not valid!';
            errorFlag = true;
        }
        if (isEmail(email)) {
            if (!email.endsWith('asu.edu')) {
                emailErr = 'Email should be a valid ASU email ID';
                errorFlag = true;
            }
        }
        if (username.length == 0) {
            usernameErr = 'Invalid username';
            errorFlag = true;
        }

        if (errorFlag === true) {
            this.setState({
                passwordError: passwordErr, 
                phoneError: phoneErr,
                emailError: emailErr,
                usernameError: usernameErr
            });
            return; 
        }

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        app.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((credentials) => {
                credentials.updateProfile({
                    displayName: username,
                    phoneNumber: phone
                }).then(function () {
                    console.log('Profile updated successfully!');
                    // "Jane Q. User"
                    // "https://example.com/jane-q-user/profile.jpg"
                }, function (error) {
                    // An error happened.
                    console.log('Error updating profile');
                });
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

        const { usernameError, emailError, passwordError, phoneError} = this.state;

        return (
            <div>
                <Container>
                <Row>
                    <Col></Col>
                    <Col md={6}>
                    <h1>Signup</h1>
                    <Form>
                        {/* <div class="field">
                            <label>Username</label>
                            <input id="username" className="pasword-field" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                        </div> */}
                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label>Username</Form.Label> */}
                            <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                            <Form.Text className="text-muted"> {this.state.usernameError ? this.state.usernameError : ""} </Form.Text>
                        </Form.Group>
                        {/* <div className="field">
                            <label>Email ID</label>
                            <input id="email" className="email-field" placeholder="Email ID" value={this.state.email} onChange={this.handleEmailChange} />
                        </div> */}
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="email" className="email-field" placeholder="Email ID" value={this.state.email} onChange={this.handleEmailChange} />
                            <Form.Text className="text-muted"> {this.state.emailError ? this.state.emailError : ""} </Form.Text>
                        </Form.Group>
                        {/* <div class="field">
                            <label>Password</label>
                            <input id="password" type="password" className="pasword-field" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div> */}
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="password" className="pasword-field" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                            <Form.Text className="text-muted"> {this.state.passwordError ? this.state.passwordError : ""} </Form.Text>
                        </Form.Group>
                        {/* <div class="field">
                            <label>Confirm Password</label>
                            <input id="passwordConf" type="password" className="pasword-field" placeholder="Confirm Password" value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
                        </div> */}
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password Confirmation</Form.Label> */}
                            <Form.Control type="password" className="password-conf-field" placeholder="Password Confirmation" value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
                            <Form.Text className="text-muted"> {this.state.passwordError ? this.state.passwordError : ""} </Form.Text>
                        </Form.Group>
                        {/* <div class="field">
                            <label>Phone</label>
                            <input id="passwordConf" className="pasword-field" placeholder="Phone" value={this.state.phone} onChange={this.handlePhoneChange} />
                        </div> */}
                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label>Phone</Form.Label> */}
                            <Form.Control type="number" className="phone-field" placeholder="Phone number" value={this.state.phone} onChange={this.handlePhoneChange} />
                            <Form.Text className="text-muted"> {this.state.phoneError ? this.state.phoneError : ""} </Form.Text>
                        </Form.Group>
                        <button type="button" className="ui button" onClick={this.handleSubmit}>Submit</button> 
                    </Form>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md={6}>
                    <p> Already have an account?
                        <Link to="/login" >
                            Login
                        </Link>
                    </p>
                    </Col>
                    <Col></Col>
                </Row>
                </Container>
                
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