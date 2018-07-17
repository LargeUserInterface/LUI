import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    infoBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },

    infoItem: {

    }

};

class TopBar extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.infoBox}>
                <div className={classes.infoItem} id="day"> day </div>
                <div className={classes.infoItem} id="time"> time </div>
                <img className={classes.infoItem} id="weather"> weather </img>
            </div>
        )
    }
}

export default withStyles(styles)(TopBar);

