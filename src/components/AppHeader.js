import React from 'react';
import {Form, Navbar, Button} from 'react-bootstrap'

import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

import Wrap from '../HOC/Wrap';

import classes from './AppHeader.module.css';

const AppHeader = (props) => {
    return (

        <Navbar className={classes.header}>
            <Navbar.Brand className={classes.title}>exCHAINger</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
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