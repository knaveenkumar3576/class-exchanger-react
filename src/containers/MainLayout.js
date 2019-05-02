import React,{Component} from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

class MainLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <Switch>
                <Route exact path="/" render={() => <Home/> } />  
                <Route exact path="/login" render={() => <Login/> } /> 
                <Route exact path="/signup" render={() => <Signup/> } />
            </Switch>
        );
    }
 }

export default withRouter(MainLayout);