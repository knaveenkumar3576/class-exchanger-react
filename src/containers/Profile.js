import React, { Component } from 'react';
// import { ReactDOM } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import {Row, Col, Container, Button, Tabs, Tab} from 'react-bootstrap'

import ReactSuperSelect from 'react-super-select'

import './Profile.css';
import axiosHandler from '../HOC/axios-course';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        axiosHandler.get('list_subjects')
        .then(response => {
            console.log(response);
            this.setState( {
                course_info: response.data
            })
        });

    }
  
    handleHasCourse = (option) => {
        console.log(option);
    }

    handleWantsCourse = () => {

    }
  
    handleSavePreferences = () => {

    }    

    render() {

        let selected_courses = ["CSE531", "CSE575"];

        let course_info = [
            {"Code":"APM598","Name":"Intro to Deep Neural Networks"},
            {"Code":"CSE512","Name":"Distributed Database Systems"},
            {"Code":"CSE531","Name":"Distributed/Multiprocessor Operating Systems"},
            {"Code":"CSE535","Name":"Mobile Computing"},
            {"Code":"CSE545","Name":"Software Security"},
            {"Code":"CSE569","Name":"Fundamentals of Stat. Learning"},
            {"Code":"CSE575","Name":"Statistical Machine Learning"},
            {"Code":"CSE578","Name":"Data Visualization"},
            {"Code":"EEE511","Name":"Artificial Neural Computation"},
            {"Code":"EEE591","Name":"Python for Rapid Engineering Solutions"}
        ]

        let courses = course_info.map(function(c, i) {            
            let courseModified = {
                id: i,
                code : c.Code,
                subject : c.Code.split(/[0-9](.+)/)[0],
                label : c.Code + "-" + c.Name
            }
            return courseModified;
        });

        let selected_courses_info = [
            {id: 3, code: "CSE535", subject: "CSE", label: "CSE535-Mobile Computing"},
            {id: 4, code: "CSE545", subject: "CSE", label: "CSE545-Software Security"}
        ]


        return (
            <Container>
                <Row>
                    <Col>
                        <ReactSuperSelect
                            dataSource={courses}
                            initialValue={selected_courses_info}
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
                            dataSource={courses}
                            onChange={this.handleHasCourse}
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
                    <Button variant="primary" size="lg" onChange={this.handleSavePreferences}> Save preferences</Button>
                </Row>
            </Container>
      );
    }
};

export default Profile;