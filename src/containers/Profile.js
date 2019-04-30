import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Row, Col, Container, Button, Tabs, Tab} from 'react-bootstrap'

import ReactSuperSelect from 'react-super-select'

import axiosHandler from '../HOC/axios-course';
import {connect} from 'react-redux'

import './Profile.css';
class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            course_info: [], 
            selected_courses: {
                has : [],
                wants: []
            }       
        }
    }

    componentDidMount() {
       
        axiosHandler.get('/list_subjects')
        .then(response => {

            let courses = response.data.map(function(c, i) {            
                let courseModified = {
                    id: i,
                    code : c.Code,
                    subject : c.Code.split(/[0-9](.+)/)[0],
                    label : c.Code + "-" + c.Name
                }
                return courseModified;
            });

            this.setState({
                course_info: courses
            });


        });

        axiosHandler.get('/info/' + this.props.user)
        .then(response => {
            console.log(response);
            this.setState({
                selected_courses : {
                    has : response.data.has,
                    wants : response.data.wants
                }
            })
        });

    }
  
    handleHasCourse = (options) => {

        let selected_has=[];

        if(typeof options != 'undefined') {
            selected_has = options.map((option) => {
                return option.code;
            });       
        }

        this.setState({
            selected_courses : {
                ...this.state.selected_courses,
                has : selected_has
            }
        })        
    }

    handleWantsCourse = (options) => {
        let selected_wants=[];
        if(typeof options != 'undefined') {
            selected_wants = options.map((option) => {
                return option.code;
            });       
        }
            
        this.setState({
            selected_courses : {
                ...this.state.selected_courses,
                wants : selected_wants
            }
        })        
        
    }
  
    handleSavePreferences = () => {

        axiosHandler.post("addHas/" + this.props.user + "/" + this.state.selected_courses.has.join(","))
        .then((response) => {
            console.log("Success");
        })
        .catch(function(response){
            console.log('Failed to save wants' + response);
        });           

        axiosHandler.post("addWants/" + this.props.user + "/" + this.state.selected_courses.wants.join(","))
        .then((response) => {
            console.log("Success");
        })
        .catch(function(response){
            console.log('Failed to save wants' + response);
        });           
    }    

    render() {

        let has_courses_info = this.state.course_info.filter(function(item){
            return this.state.selected_courses.has.includes(item.code);         
        }, this);

        let wants_courses_info = this.state.course_info.filter(function(item){
            return this.state.selected_courses.wants.includes(item.code);         
        }, this);


        return (
            <Container>
                <Row>
                    <Col>
                        <ReactSuperSelect
                            dataSource={this.state.course_info}
                            initialValue={has_courses_info}
                            onChange={this.handleHasCourse}
                            optionLabelKey="label"
                            placeholder="Pick an Course"
                            searchable={true}
                            searchPlaceholder="Search Course"
                            multiple={true}
                            keepOpenOnSelection={true}
                            closeOnSelectedOptionClick={false}
                            groupBy="subject" />
                    </Col>
                    <Col>
                        <ReactSuperSelect
                            dataSource={this.state.course_info}
                            initialValue={wants_courses_info}
                            onChange={this.handleWantsCourse}
                            optionLabelKey="label"
                            placeholder="Pick an Course"
                            searchable={true}
                            searchPlaceholder="Search Course"
                            multiple={true}
                            keepOpenOnSelection={true}
                            closeOnSelectedOptionClick={false}
                            groupBy="subject" 
                        />

                    </Col>

                </Row>

                <Row>
                    <Button variant="primary" size="lg" onClick={this.handleSavePreferences}> Save preferences</Button>
                </Row>
            </Container>
      );
    }
};


const mapStateToProps = (state) => {
    return {
        user: state.auth.user  
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return { 
//         setIsAuthenticatedFlag :(isAuthenticated) => dispatch(authActions.setIsAuthenticatedFlag(isAuthenticated)),    
//     };
// }


export default connect(mapStateToProps, null)(Profile)