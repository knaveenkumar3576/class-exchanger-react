import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap'
import {Sigma, EdgeShapes, ForceAtlas2, RandomizeNodePositions, RelativeSize} from 'react-sigma';

import classes from './MyVerticallyCenteredModal.module.css'

class MyVerticallyCenteredModal extends React.Component {
    
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className={classes.heading} id="contained-modal-title-vcenter">
              {"Give " + this.props.data.letSubject + ", Get "  + this.props.data.takeSubject}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Sigma renderer="canvas" graph={this.props.data} settings={{ drawEdges: true, drawEdgeLabels: true, mouseEnabled: false}}>
                    <EdgeShapes default="curvedArrow"/>
                    <RandomizeNodePositions>
                        <ForceAtlas2 iterationsPerRender={1} timeout={100}/>
                        <RelativeSize initialSize={10}/>
                    </RandomizeNodePositions>
                </Sigma>
          </Modal.Body>
          <Modal.Footer>
            <Button className={classes.close} onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

export default MyVerticallyCenteredModal;
