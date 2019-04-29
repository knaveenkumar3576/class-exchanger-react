import React from 'react';

import Wrap from '../HOC/Wrap';

import classes from './AppHeader.css';

const AppHeader = () => {
    return (
        <Wrap>
            <span className={classes.title}> Course Exchanger </span>
        </Wrap>
    );
}

export default AppHeader