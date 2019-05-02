import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
// import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { withRouter, Link } from 'react-router-dom';
import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'
import  { Container, Row, Col, Form, Button } from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';
class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            usernameErr : "",
            email: '',
            emailErr : "",
            password: '',
            passwordConf: '', 
            passwordErr : "",
            phone: '',
            phoneErr : "",
            validErr : ""
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

    checkPhone(phone) {
        let message="";
        
        if (/^\d+$/.test(phone) == false || (phone.length !== 10)) {
            message = 'Phone number is invalid. Please enter only numbers and exactly 10 digits in number';
        }

        this.setState({
            phoneErr: message
        });

    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value
        });

        this.checkPhone(event.target.value);
    }

    checkUsername(username) {
        let message ="";
        if (username.length == 0) {
            message = 'Invalid username'
        }

        this.setState({
            usernameErr: message
        });

    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
        this.checkUsername(event.target.value)
    }


    checkEmail(email) {
        let emailError="";        
        
        if (!isEmail(email)) {
            emailError = 'Email ID is not valid!';
        }

        if (isEmail(email)) {
            if (!email.endsWith('asu.edu')) {
                emailError = 'Email should be a valid ASU email ID';
            }
        }

        this.setState({
            emailErr: emailError
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
        this.checkEmail(event.target.value);
    }

    checkPasswords(password, passwordConf) {
        let message=""
        if (password !== passwordConf || password.length === 0 || passwordConf.length === 0) {
            message = 'Passwords doesn\'t match'
        }

        this.setState({
            passwordErr: message
        });
}

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
        this.checkPasswords(event.target.value, this.state.passwordConf)
    }

    handlePasswordConfChange(event) {
        this.setState({
            passwordConf: event.target.value
        })

        this.checkPasswords(this.state.password, event.target.value)
    }

    handleSubmit() {
        console.log("Handle submit from signup.js");


        if(this.state.usernameErr!=="" || this.state.emailErr!=="" || this.state.passwordErr!=="" || this.state.phoneErr!=="") {
            return; 
        }

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        app.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((credentials) => {
                credentials.updateProfile({
                    displayName: this.state.username,
                    phoneNumber: this.state.phone
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
                
                this.setState( {
                    validErr : error.message
                });

                console.log("error signing up" + error.message);
            });
        });
    }

    render() {
        if (this.props.isAuthenticated)
            this.props.history.push('/');

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
                            <Form.Text className="text-muted"> {this.state.usernameErr ? this.state.usernameErr : ""} </Form.Text>
                        </Form.Group>
                        {/* <div className="field">
                            <label>Email ID</label>
                            <input id="email" className="email-field" placeholder="Email ID" value={this.state.email} onChange={this.handleEmailChange} />
                        </div> */}
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="email" className="email-field" placeholder="Email ID" value={this.state.email} onChange={this.handleEmailChange} />
                            <Form.Text className="text-muted"> {this.state.emailErr ? this.state.emailErr : ""} </Form.Text>
                        </Form.Group>
                        {/* <div class="field">
                            <label>Password</label>
                            <input id="password" type="password" className="pasword-field" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div> */}
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="password" className="pasword-field" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                            <Form.Text className="text-muted"> {this.state.passwordErr ? this.state.passwordErr : ""} </Form.Text>
                        </Form.Group>
                        {/* <div class="field">
                            <label>Confirm Password</label>
                            <input id="passwordConf" type="password" className="pasword-field" placeholder="Confirm Password" value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
                        </div> */}
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label>Password Confirmation</Form.Label> */}
                            <Form.Control type="password" className="password-conf-field" placeholder="Password Confirmation" value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
                            <Form.Text className="text-muted"> {this.state.passwordErr ? this.state.passwordErr : ""} </Form.Text>
                        </Form.Group>
                        {/* <div class="field">
                            <label>Phone</label>
                            <input id="passwordConf" className="pasword-field" placeholder="Phone" value={this.state.phone} onChange={this.handlePhoneChange} />
                        </div> */}
                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label>Phone</Form.Label> */}
                            <Form.Control type="number" className="phone-field" placeholder="Phone number" value={this.state.phone} onChange={this.handlePhoneChange} />
                            <Form.Text className="text-muted"> {this.state.phoneErr ? this.state.phoneErr : ""} </Form.Text>
                        </Form.Group>
                        <Button type="button" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        <Form.Text className="text-muted"> {this.state.validErr ? this.state.validErr : ""} </Form.Text>
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