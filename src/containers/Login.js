import React from 'react';
import { withRouter } from 'react-router-dom';
import app from '../firebaseConfig';

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
        console.log("this.props.isAuthenticated" + this.props.isAuthenticated)
    }
    
    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit() {
        app.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((credentials) => {

                this.props.setIsAuthenticatedFlag(true);
                this.props.setLoggedInUser(credentials.user.email);

                // this.props.onSuccess(this.state.authenticated, this.state.user);
                console.log("Redirecting to /");
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log("error login: ");
                console.log(error);
            });
    }

    render() {

        if (this.props.isAuthenticated) 
            this.props.history.push('/');

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