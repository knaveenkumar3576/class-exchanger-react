import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Row, Col, Container, Button, Tabs, Tab} from 'react-bootstrap'

import axiosHandler from '../HOC/axios-course';
import axiosRetry from 'axios-retry';
import {connect} from 'react-redux'

import SuperSelect from '../components/SuperSelect'

import classes from './Profile.module.css'
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


    refreshUserInfo = () => {
        axiosHandler.get('/info/' + this.props.user)
        .then(response => {
            console.log("info" + JSON.stringify(response));
            
            if(response.data != null) {
                this.setState({
                    selected_courses : {
                        has : response.data.has || [],
                        wants : response.data.wants || []
                    }
                })    
            }
        });        
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

        if(this.props.user !== "") {
            this.refreshUserInfo();
        }

    }

    componentDidUpdate(prevProps) {

        if(this.props.user !== prevProps.user) {
            this.refreshUserInfo();
        }

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

        if(this.state.selected_courses.has.length > 0 ) {
            axiosHandler.post("addHas/" + this.props.user + "/" + this.state.selected_courses.has.join(","))
            .then((response) => {
                console.log("Added");
            })
            .catch(function(response){
                console.log('Failed to save has' + response);
            });               
        } else {
            axiosHandler.post("removeHas/" + this.props.user)
            .then((response) => {
                console.log("Removed");
            })
            .catch(function(response){
                console.log('Failed to save has' + response);
            });               

        }

        setTimeout(() => { 
            if(this.state.selected_courses.wants.length > 0 ) {
                axiosHandler.post("addWants/" + this.props.user + "/" + this.state.selected_courses.wants.join(","))
                .then((response) => {
                    console.log("Success");
                })
                .catch(function(response){
                    console.log('Failed to save wants' + response);
                });           
            } else {
                axiosHandler.post("removeWants/" + this.props.user)
                .then((response) => {
                    console.log("Removed");
                })
                .catch(function(response){
                    console.log('Failed to save has' + response);
                });               
    
            }
        }
        , 1000);


    }    

    render() {

        let has_courses_info = this.state.course_info.filter(function(item){
            return this.state.selected_courses.has.includes(item.code);         
        }, this);

        let wants_courses_info = this.state.course_info.filter(function(item){
            return this.state.selected_courses.wants.includes(item.code);         
        }, this);


        return (
                <Container className={classes.profile}>
                    <Row>
                        <Col>
                            <div className={classes.title}> HAS </div>
                        </Col>
                        <Col>
                            <div className={classes.title}> WANTS </div>
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <SuperSelect
                                options={this.state.course_info}
                                selectedValues={has_courses_info}
                                onChangeHandler={this.handleHasCourse}
                            />

                        </Col>
                        <Col>
                            <SuperSelect
                                options={this.state.course_info}
                                selectedValues={wants_courses_info}
                                onChangeHandler={this.handleWantsCourse}
                            />
                        </Col>

                    </Row>
                   
                    <Row>
                        <Button className={classes.savepreferences} variant="primary" size="lg" onClick={this.handleSavePreferences}> Save preferences</Button>
                    </Row>

                </Container>
            // </div> 
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