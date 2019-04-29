import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Accordion, Card} from 'react-bootstrap'


import Recommendation from '../components/Recommendation'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'


class Recommendations extends Component {

    constructor(props) {
        super(props)    
        this.state = {
            modalShow : false,
            selectedRecommendation: 0
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

        let sampledata = {

        };

        let recommendations = [
            {
                nodes: [
                    {id: 'a', label: 'A'},
                    {id: 'b', label: 'B'},
                    {id: 'c', label: 'C'}
                ],
                edges: [
                    {id: 'a_to_b', source: 'a', target: 'b', label: 'A -> B' },
                    {id: 'b_to_c', source: 'b', target: 'c', label: 'B -> C' },
                    {id: 'c_to_a', source: 'c', target: 'a', label: 'C -> A' },
                    {id: 'b_to_a', source: 'b', target: 'a', label: 'B -> A' }
                ]
            },
            {
                nodes: [
                    {id: 'a', label: 'A'},
                    {id: 'b', label: 'B'},
                    {id: 'c', label: 'C'}
                ],
                edges: [
                    {id: 'a_to_b', source: 'a', target: 'b', label: 'A -> B' },
                    {id: 'b_to_c', source: 'b', target: 'c', label: 'B -> C' },
                    {id: 'b_to_a', source: 'b', target: 'a', label: 'B -> A' }
                ]
            },
        ];   


        let recommendationComps = recommendations.map((r , i) => {
            return (
                <Recommendation
                    index={i}
                    header={"Recommmendation-" + i} 
                    data={r}
                    modalOpen={this.modalOpen}
                >   
                </Recommendation>
            )
        });

        return (
            <div>
                <Accordion defaultActiveKey="0">            
                    {recommendationComps}
                </Accordion>

                <MyVerticallyCenteredModal
                    data={recommendations[this.state.selectedRecommendation]}
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                />
            </div>

        );
    }
};

export default Recommendations;