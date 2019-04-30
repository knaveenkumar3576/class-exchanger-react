import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Button, Tabs, Tab} from 'react-bootstrap'

import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

import Wrap from '../HOC/Wrap'
import AppHeader from '../components/AppHeader'
import Profile from '../containers/Profile'
import Recommendations from '../containers/Recommendations'


class StudentHome extends Component {

    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        console.log("Handle logout "); 
        app.auth()
          .signOut()
          .then(() => {
              this.props.setIsAuthenticatedFlag(false);
              console.log("Redirecting to /");
              this.props.history.push("/");
          })
          .catch((error) => {
            console.log("Error occured in signout");
            console.log('error: ');
            console.log(error);
          });
    }
  

    render() {
        return (
            <Wrap>
                <AppHeader/>
<<<<<<< HEAD
                <form onSubmit={this.handleLogout}>
                    <Button variant="primary" size="lg" type="submit" > Sign Out</Button>
                </form>
=======
                <Button variant="primary" size="lg" onClick={this.handleLogout}> Sign Out</Button>
>>>>>>> 15695dbab9cb2f573d0ec4057b2bd51bca2640ca
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="profile" title="Profile">
                        <Profile />
                    </Tab>
                    <Tab eventKey="recommedation" title="Recommendations">
                        <Recommendations />
                    </Tab>                    
                </Tabs>
            </Wrap>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentHome))