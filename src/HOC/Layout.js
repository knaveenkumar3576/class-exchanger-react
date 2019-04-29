import React,{Component} from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import Wrap from './Wrap';
// import AppHeader from '../components/AppHeader';
import SideLayout from '../containers/SideLayout'
import MainLayout from '../containers/MainLayout'

class Layout extends Component {

    //state to store the selections in the side layout
    // render() {        
    //     return (            
    //     <Wrap>
    //         <Row style={{height: "93.5%"}}>
    //             <Col md={2} className={classes.sidelayout}>
    //                     <SideLayout />
    //             </Col>
    //             <Col md={10} className={classes.mainlayout}>
    //                     <MainLayout /> 
    //             </Col>
    //         </Row>
    //     </Wrap>      
    //     )
    // }

    render() {        
        return (            
            <MainLayout /> 
        )
    }

}

export default Layout