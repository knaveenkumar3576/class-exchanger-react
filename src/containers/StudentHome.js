import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'

import app from '../firebaseConfig';

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

import Wrap from '../HOC/Wrap'
import AppHeader from '../components/AppHeader'
import Tabs from './Tabs.js'
import Profile from '../containers/Profile'
import Recommendations from '../containers/Recommendations'
import Analytics from '../containers/Analytics'

import classes from './StudentHome.css'


class StudentHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTabIndex : 0
        }
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
  

    onTabChange= (e) => {
        let activeTabIndex = this.state.activeTabIndex;
        const index = parseInt(e.target.getAttribute('data-index'));
        
        if (activeTabIndex !== index) {
            this.setState({ activeTabIndex: index })
        }
    }
    
    render() {
        const { activeTabIndex } = this.state;
        const tabs = ['Profile', 'Recommendations', "Analytics"];

        let selectedTabContent = this.state.activeTabIndex== 0 ? (<Profile />) : 
                                (this.state.activeTabIndex == 1 ? (<Recommendations/>) : (<Analytics/>)) 

        return (
            
            <Wrap>
                <AppHeader 
                    handleSubmit={this.handleLogout}
                />
                
                <Tabs tabs={tabs} activeTab={activeTabIndex} onTabChange={this.onTabChange} />
                {selectedTabContent}
            </Wrap>
        );
    }


    // render() {
    //     return (

    //         <Wrap>
    //             <AppHeader 
    //                 handleSubmit={this.handleLogout}
    //             />
    //             <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
    //                 <Tab eventKey="profile" title="Profile">
    //                     <Profile />
    //                 </Tab>
    //                 <Tab eventKey="recommedation" title="Recommendations">
    //                     <Recommendations />
    //                 </Tab>                    
    //             </Tabs>
    //         </Wrap>
    //     );
    // }

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