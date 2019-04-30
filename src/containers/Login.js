import React from 'react';
import { withRouter } from 'react-router-dom';
import app from '../firebaseConfig';
import firebase from 'firebase';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

class Login extends React.Component {

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
        console.log("login props authenticated: " + this.props.authenticated);
        if (this.props.isAuthenticated) 
            this.props.history.push('/');
    }
    
    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit() {
        let self = this;
        console.log("STATE: ");
        console.log(this.state);
        app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            console.log(self.state.email);
            console.log(self.state.password);
            app.auth()
            .signInWithEmailAndPassword(self.state.email, self.state.password)
            .then((credentials) => {
                self.props.setIsAuthenticatedFlag(true);
                self.props.setLoggedInUser(credentials.user.email);
                // this.props.onSuccess(this.state.authenticated, this.state.user);
                console.log("Redirecting to /");
                self.props.history.push("/");
            })
            .catch((error) => {
                console.log("error signin with : ");
                console.log(error);
            });
        })
        .catch((error) => {
            console.log('error persistence: ');
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <p>Login</p>
                <form className="ui form">
                    <div className="field">
                        <label>Email ID</label>
                        <input id="email" className="email-field" placeholder="First Name" value={this.state.email} onChange={this.handleEmailChange} />
                    </div>
                    <div className="field">
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))  