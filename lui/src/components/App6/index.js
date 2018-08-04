import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%'
    },
    image: {
        position: 'relative',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
        },
    },
    hovered: {
        zIndex: 1,
        '& $imageBackdrop': {
            opacity: 0.15,
        },
        '& $imageMarked': {
            opacity: 0,
        },
        '& $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

const image = {
    url: 'http://www.fablabconnect.com/wp-content/uploads/2018/05/MIT-Media-Lab-2.jpg',
    title: 'Object Based Media Group',
    width: '100%',
};

class App5 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };
    }

    render() {
        const { classes, hovered, clicked } = this.props;

        if (this.props.clicked) {
            return (
                <div />
            );
        } else {
            // icon 
            return (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={hovered? classNames(classes.image, classes.hovered) : classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image.url})`,
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subheading"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {image.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            );
        }
    }
}

App5.propTypes = {
    hovered: PropTypes.bool,
    clicked: PropTypes.bool,
};

App5.defaultProps = {
    hovered: false,
    clicked: false
};

export default withStyles(styles)(App5);

