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
        }
    }


    componentWillMount() {

    }

    componentDidMount() {
        this.refreshReco();
    } 

    refreshReco = () => {

        axiosHandler.get('/reco/' + this.props.user)
        .then(response => {
            if(response.data != null) {
                let sampledata = response.data;
                for (let cycleValue in sampledata) {
                    let recommendations=[];
                    sampledata[cycleValue].forEach((currCycleData) => {
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
                            
                            if(transaction.giver == this.props.user) letSubject = subjects;
                            if(transaction.taker == this.props.user) takeSubject = subjects;
        
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
        }); 
         
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