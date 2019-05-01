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

        let sampledata = [
            {
                "u1" : {
                    target: "u2",
                    subjects: ["CSE801", "CSE805"]
                },
                "u2" : {
                    target: "u3",
                    subjects: ["CSE802"]
                },
                "u3" : {
                    target: "u1",
                    subjects: ["CSE800"]
                }
            },
            {
                "u1" : {
                    target: "u3",
                    subjects: ["CSE801", "CSE805"]
                },
                "u3" : {
                    target: "u1",
                    subjects: ["CSE800"]
                }
            },
        ];


        let recommendations=[];

        // sampledata.forEach((data) => {
        //     let nodes =[];
        //     let edges =[];

        //     for (let user in data) {
        //         nodes.push({
        //             id : user,
        //             label: user
        //         });
        //         edges.push({
        //             id : user + data[user].target,
        //             source: user,
        //             target: data[user].target,
        //             label: data[user].subjects.join(",")
        //         })
        //     }

        //     recommendations.push({
        //         nodes : nodes,
        //         edges : edges  
        //     });

        //     console.log(recommendations);
        // })


        let sampledata2 = {
            3 : [ 
                    [{giver: "u2", taker: "u1", subject: "CS101"}, {giver: "u3", taker:"u2", subject:"CS102"}, {giver: "u1", taker:"u3", subject: "CS103"}],
                    [{giver: "u2", taker: "u1", subject: "CS101"}, {giver: "u5", taker:"u2", subject:"CS102"}, {giver: "u1", taker:"u5", subject: "CS103"}],
            ],

            4:  [ 
                    [{giver: "u2", taker: "u1", subject: "CS101"}, {giver: "u3", taker:"u2", subject:"CS102"}, {giver: "u1", taker:"u3", subject: "CS103"}],
                    [{giver: "u2", taker: "u1", subject: "CS101"}, {giver: "u5", taker:"u2", subject:"CS102"}, {giver: "u1", taker:"u5", subject: "CS103"}],
            ], 
        }


        for (let cycleValue in sampledata2) {

            sampledata2[cycleValue].forEach((currCycleData) => {
                let nodes =[];
                let edges =[];    

                currCycleData.forEach((transaction) => {
                    nodes.push({
                        id : transaction.giver,
                        label : transaction.giver
                    });

                    edges.push({
                        id : transaction.giver + "_" + transaction.taker,
                        source: transaction.giver,
                        target: transaction.taker,
                        label: transaction.subject
                    })    
                })

                recommendations.push({
                    nodes : nodes,
                    edges : edges  
                });
        
                console.log(recommendations);
        
            })


        }


        // let recommendations = [
        //     {
        //         nodes: [
        //             {id: 'a', label: 'A'},
        //             {id: 'b', label: 'B'},
        //             {id: 'c', label: 'C'}
        //         ],
        //         edges: [
        //             {id: 'a_to_b', source: 'a', target: 'b', label: 'A -> B' },
        //             {id: 'b_to_c', source: 'b', target: 'c', label: 'B -> C' },
        //             {id: 'c_to_a', source: 'c', target: 'a', label: 'C -> A' },
        //             {id: 'b_to_a1', source: 'b', target: 'a', label: 'B -> A1' },
        //             {id: 'b_to_a2', source: 'b', target: 'a', label: 'B -> A2' }
        //         ]
        //     },
        //     {
        //         nodes: [
        //             {id: 'a', label: 'A'},
        //             {id: 'b', label: 'B'},
        //             {id: 'c', label: 'C'}
        //         ],
        //         edges: [
        //             {id: 'a_to_b', source: 'a', target: 'b', label: 'A -> B' },
        //             {id: 'b_to_c', source: 'b', target: 'c', label: 'B -> C' },
        //             {id: 'b_to_a', source: 'b', target: 'a', label: 'B -> A' }
        //         ]
        //     },
        // ];   


        let recommendationComps = recommendations.map((r , i) => {
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