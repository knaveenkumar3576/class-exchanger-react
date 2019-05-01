import React from 'react';
import {Accordion, Card, Modal, Button, ButtonToolbar, ListGroup} from 'react-bootstrap'
import {Sigma, EdgeShapes, ForceAtlas2, RandomizeNodePositions, RelativeSize} from 'react-sigma';


import Wrap from '../HOC/Wrap';
import MyVerticallyCenteredModal from '../containers/MyVerticallyCenteredModal'

import classes from './Recommendation.module.css'

const RecommendationBody = (props) => {
    
    let body = props.data.edges.map((edge) => {
        return (<ListGroup.Item className={classes.steps}> {"Pass " + edge.label + " from " + edge.source + " to " + edge.target} </ListGroup.Item>);
    })

    let bodytext =body.join("\n");

    console.log(body);

    return (
        <ListGroup>
            {body}
        </ListGroup>
    );
}




export default RecommendationBody