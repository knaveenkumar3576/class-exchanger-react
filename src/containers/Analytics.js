import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Accordion, Card, Button, Table} from 'react-bootstrap'

import axiosHandler from '../HOC/axios-course';
import {connect} from 'react-redux'

import Wrap from '../HOC/Wrap'
import Recommendation from '../components/Recommendation'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'

import classes from './Analytics.module.css'
class Analytics extends Component {

    constructor(props) {
        super(props)    
        this.state = {
            data : []
        }
    }


    componentWillMount() {

    }

    componentDidMount() {
        this.refreshAnalytics();
    } 

    refreshAnalytics = () => {
    
    }

    render() {

        let data = [
            {
                subject : "CSE503",
                count : 300
            },
            {
                subject : "CSE513",
                count : 60
            }
        ];

        let tablerows = data.map((d) => {
        
        return (<tr>
            <td>{d.subject}</td>
            <td>{d.count}</td>
        </tr>);
        })
        return (
            <div className={classes.analytics}>
                <Button className={classes.refreshbutton} size="lg" onClick={this.refreshReco}> Refresh Data </Button>

                <Table className={classes.analyticsdata}striped bordered hover>
                <thead>
                    <tr>
                    <th>Course</th>
                    <th>Wanted By</th>
                    </tr>
                </thead>
                <tbody>
                    {tablerows}
                </tbody>
                </Table>;

            </div>

        );
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user  
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return { 
//         setIsAuthenticatedFlag :(isAuthenticated) => dispatch(authActions.setIsAuthenticatedFlag(isAuthenticated)),    
//     };
// }


export default connect(mapStateToProps, null)(Analytics)