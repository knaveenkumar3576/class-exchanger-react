import React from 'react';
import {Form, Navbar, Button} from 'react-bootstrap'

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

import Wrap from '../HOC/Wrap';

import classes from './AppHeader.css';

const AppHeader = (props) => {
    return (

        <Navbar>
            <Navbar.Brand>Class Exchange Helper</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Welcome {props.user}
                </Navbar.Text>
                <Form inline  onSubmit={props.handleSubmit}>
                    <Button type="submit" variant="danger">Sign Out</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        user : state.auth.user,    
    };
}


export default connect(mapStateToProps, null)(AppHeader)