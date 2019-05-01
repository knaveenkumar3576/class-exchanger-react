import React from 'react';
import {Accordion, Card, Modal, Button, ButtonToolbar} from 'react-bootstrap'
import {Sigma, EdgeShapes, ForceAtlas2, RandomizeNodePositions, RelativeSize} from 'react-sigma';


import Wrap from '../HOC/Wrap';
import MyVerticallyCenteredModal from '../containers/MyVerticallyCenteredModal'
import RecommendationBody from './RecommendationBody'

import classes from './Recommendation.module.css'

const Recommendation = (props) => {
    return (
        <Card text="white" className={classes.recommendation} > 
            <Accordion.Toggle as={Card.Header} eventKey={props.index}>
                {"Give " + props.data.letSubject + ", Get "  + props.data.takeSubject + " with " + props.data.cycleLen + " swaps"}

                <Button
                    className={classes.graphbutton}
                    onClick={() => props.modalOpen(props.index)}
                >
                Graph View
                </Button>
            </Accordion.Toggle> 
            <Accordion.Collapse eventKey={props.index}>
                <Card.Body className={classes.recommendationbody}>

                    <RecommendationBody data={props.data} />                    
                </Card.Body>
            </Accordion.Collapse>
        </Card>

    );
}




export default Recommendation