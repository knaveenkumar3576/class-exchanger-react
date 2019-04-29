import React,{Component} from 'react'
import { Link, Image, withRouter } from 'react-router-dom';


import {connect} from 'react-redux'


class SideLayout extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return ("Side Layout")
    }

 }

// const mapStateToProps = (state) => {
//     return {
//         maxCost : state.courseListings.options.costBoundary[1],
//         courseID : state.common.selectedCourseID,
//         shouldRefreshData : state.common.shouldRefreshData,
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return { 
//         toggleShouldRefreshDataFlag :() => dispatch(commonActions.toggleShouldRefreshDataFlag()),    
//     };
// }

export default withRouter(SideLayout)