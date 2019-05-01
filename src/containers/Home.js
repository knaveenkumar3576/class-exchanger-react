import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

import StudentHome from './StudentHome'


class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userEmail: ''
        };

        // this.handleLogout = this.handleLogout.bind(this);
    }


    // handleLogout() {
    //   console.log("Handle logout "); 
    //   app.auth()
    //     .signOut()
    //     .then(() => {
    //         this.props.setIsAuthenticatedFlag(false);
    //         console.log("Redirecting to /");
    //         this.props.history.push("/");
    //     })
    //     .catch((error) => {
    //       console.log("Error occured in signout");
    //       console.log('error: ');
    //       console.log(error);
    //     });
    // }

    
    render() {
        if (this.props.isAuthenticated) {
            return (    
                <StudentHome />
            )
        }
        else {
            return (
                <div>
                    <p>Landing Page</p>
                    <Link to="/login" >
                        Login
                    </Link>
                    <Link to="/signup">
                        Create new account
                    </Link>
                </div> 
            )
        }
    }

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.isAuthenticated,  
        user: state.auth.user  
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        setIsAuthenticatedFlag :(isAuthenticated) => dispatch(authActions.setIsAuthenticatedFlag(isAuthenticated)),    
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))