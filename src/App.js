import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import {connect} from 'react-redux'
import app from './firebaseConfig';

import * as authActions from './store/actions/auth'

import Layout from './HOC/Layout'

// import classes from './App.css';
// import classes from '*.module.scss';


class App extends Component {

  componentWillMount() {
    app.auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.props.setIsAuthenticatedFlag(true)
            this.props.setLoggedInUser(user.email)
         }
          else {
            this.props.setIsAuthenticatedFlag(false)
            this.props.setLoggedInUser("")
          }
        });
  }

  componentWillUnmount() {
    
  }

  render() {
    let classes = {
      sample : {
        color: 'blue',
        padding: '20px'
      },
      sample2 : {
        color: 'red'
      },
    };

    return (
      <div className={classes.sample}> Hello </div> 
      // <Layout> </Layout>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      isAuthenticated : state.auth.isAuthenticated,  
      user: state.auth.user  
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
      setIsAuthenticatedFlag :(isAuthenticated) => dispatch(authActions.setIsAuthenticatedFlag(isAuthenticated)),   
      setLoggedInUser :(user) => dispatch(authActions.setLoggedInUser(user)), 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
