import React from 'react';
import {Accordion, Card, Modal, Button, ButtonToolbar} from 'react-bootstrap'
import {Sigma, EdgeShapes, ForceAtlas2, RandomizeNodePositions, RelativeSize} from 'react-sigma';


import Wrap from '../HOC/Wrap';
import MyVerticallyCenteredModal from '../containers/MyVerticallyCenteredModal'

// const Recommendation = (props) => {
//     return (
//         <Card>
//             <Accordion.Toggle as={Card.Header} eventKey={props.key}>
//                 {props.header}
//             </Accordion.Toggle>
//             <Accordion.Collapse eventKey={props.key}>
//                 <Card.Body>
//                     <Sigma renderer="canvas" graph={props.data} settings={{ drawEdges: true, drawEdgeLabels: true, mouseEnabled: false}}>
//                         <EdgeShapes default="curvedArrow"/>
//                         <RandomizeNodePositions>
//                             <ForceAtlas2 iterationsPerRender={1} timeout={10000}/>
//                             <RelativeSize initialSize={10}/>
//                         </RandomizeNodePositions>
//                     </Sigma>
//                 </Card.Body>
//             </Accordion.Collapse>
//         </Card>

//     );
// }


const Recommendation = (props) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.index}>
                {props.header}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.index}>
                <Card.Body>
                    <ButtonToolbar>
                        <Button
                        variant="primary"
                        onClick={() => props.modalOpen(props.index)}
                        >
                        Launch vertically centered modal
                        </Button>
                    </ButtonToolbar>
                </Card.Body>
            </Accordion.Collapse>
        </Card>

    );
}




export default Recommendation