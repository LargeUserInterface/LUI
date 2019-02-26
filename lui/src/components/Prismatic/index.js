import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
    url: 'data:image/jpeg;base64,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',
    title: 'Prismatic',
    width: '100%',
};

class Prismatic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };
    }

    handleClick = () => {
        this.setState({
            clicked: true
        });
    }

    render() {
        const { classes, hovered, clicked } = this.props;

        if ( clicked ) {
            // full app
            return <Redirect to={{pathname: "/Prismatic"}} />
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
                    <span className={classes.imageButton} onClick={() => this.handleClick()} >
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

Prismatic.propTypes = {
    hovered: PropTypes.bool,
    clicked: PropTypes.bool,
};

Prismatic.defaultProps = {
    hovered: false,
    clicked: false
};

export default withStyles(styles)(Prismatic);
