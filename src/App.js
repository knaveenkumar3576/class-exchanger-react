import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import './App.css';
import app from './firebaseConfig';

import Layout from './HOC/Layout'

class App extends Component {

  componentDidMount() {
    // app.auth()
    //     .onAuthStateChanged((user) => {
    //       console.log("State changed");
    //       if (user) {
    //         console.log(user);
    //         this.setState({
    //           authenticated: true, 
    //           user: user
    //         });
    //       }
    //       else {
    //         this.setState({
    //           authenticated: false,
    //           user: null
    //         });
    //       }
    //       console.log("auth: " + this.state.authenticated);
    //     });
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <Layout> </Layout>
    );
  }
}

export default App;
