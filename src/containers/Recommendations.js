import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Accordion, Card, Button} from 'react-bootstrap'

import axiosHandler from '../HOC/axios-course';
import {connect} from 'react-redux'

import Wrap from '../HOC/Wrap'
import Recommendation from '../components/Recommendation'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'

import classes from './Recommendations.module.css'
class Recommendations extends Component {

    constructor(props) {
        super(props)    
        this.state = {
            modalShow : false,
            recommendations: [],
            selectedRecommendation: null,
            user: 1
        }
    }


    componentWillMount() {

    }

    componentDidMount() {
        this.refreshReco();
    } 

    refreshReco = () => {

        console.log("refreshReco");

        let sampledata = [
            {
                '4': [
                    [{'giver': 1, 'taker': 0, 'subject': ['CSE502']}, {'giver': 2, 'taker': 1, 'subject': ['CSE503']}, {'giver': 3, 'taker': 2, 'subject': ['CSE504']}, {'giver': 0, 'taker': 3, 'subject': ['CSE501']}]
                ]
            },
            {
                '4': [
                    [{'giver': 1, 'taker': 0, 'subject': ['CSE512']}, {'giver': 2, 'taker': 1, 'subject': ['CSE523']}, {'giver': 3, 'taker': 2, 'subject': ['CSE544']}, {'giver': 0, 'taker': 3, 'subject': ['CSE501']}]
                ]
            },
        ]

        let selected = Math.floor(Math.random() * 20) %2;

        console.log(selected);

        for (let cycleValue in sampledata[selected]) {
            let recommendations=[];
            console.log(sampledata[selected])
            sampledata[selected][cycleValue].forEach((currCycleData) => {
                let nodes =[];
                let edges =[];    
                let letSubject ="";
                let takeSubject ="";

                currCycleData.forEach((transaction) => {
                    console.log(transaction)
                    let subjects = transaction.subject.join(",")
                    nodes.push({
                        id : transaction.giver,
                        label : transaction.giver.toString()
                    });

                    edges.push({
                        id : transaction.giver + "_" + transaction.taker,
                        source: transaction.giver,
                        target: transaction.taker,
                        label: subjects
                    })
                    
                    if(transaction.giver == this.state.user) letSubject = subjects;
                    if(transaction.taker == this.state.user) takeSubject = subjects;

                })

                recommendations.push({
                    cycleLen: cycleValue,
                    nodes : nodes,
                    edges : edges,
                    letSubject : letSubject,
                    takeSubject: takeSubject
                });
        
            })
            
            this.setState({
                recommendations:recommendations
            })
        }
         
    }


    modalClose = () => {
        this.setState({ modalShow: false });
    }

    modalOpen = (key) => {
        console.log("modalOpen" + key)
        this.setState({ 
            selectedRecommendation : key,
            modalShow: true 
        });
    }

    render() {

        let recommendationComps = this.state.recommendations.map((r , i) => {
            return (
                <Recommendation
                    index={i}
                    header={"Recommmendation-" + (i+1)} 
                    data={r}
                    modalOpen={this.modalOpen}
                >   
                </Recommendation>
            )
        });

        return (
            <div className={classes.recommendations}>
                <Button className={classes.refreshbutton} variant="primary" size="lg" onClick={this.refreshReco}> Refresh Recommendations </Button>

                <Accordion defaultActiveKey="0">            
                    {recommendationComps}
                </Accordion>

                {
                    this.state.selectedRecommendation != null ? 
                        <MyVerticallyCenteredModal
                            data={this.state.recommendations[this.state.selectedRecommendation]}
                            show={this.state.modalShow}
                            onHide={this.modalClose}
                        /> : null
                }
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


export default connect(mapStateToProps, null)(Recommendations)