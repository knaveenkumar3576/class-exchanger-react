import React from 'react';
import {Form, Navbar, Button} from 'react-bootstrap'
import ReactSuperSelect from 'react-super-select'


import {connect} from 'react-redux'
import * as authActions from '../store/actions/auth'

import Wrap from '../HOC/Wrap';

import './SuperSelect.css';

const SuperSelect = (props) => {
    return (
            <ReactSuperSelect
                dataSource={props.options}
                initialValue={props.selectedValues}
                onChange={props.onChangeHandler}
                optionLabelKey="label"
                placeholder="Pick an Course"
                searchable={true}
                searchPlaceholder="Search Course"
                multiple={true}
                keepOpenOnSelection={true}
                closeOnSelectedOptionClick={false}
                groupBy="subject" 
            />
    );
}

const mapStateToProps = (state) => {
    return {
        user : state.auth.user,    
    };
}


export default connect(mapStateToProps, null)(SuperSelect)