import React, { Component } from 'react';
import { ButtonBase, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import VideosApp from './VideosApp';

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
            // height: 100,
        },
        '&:hover, &$focusVisible': {
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
    },
    focusVisible: {},
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
    url: 'https://marketingland.com/wp-content/ml-loads/2015/08/movie-film-video-production-ss-1920-800x450.jpg',
    title: 'Videos',
    width: '100%',
};

class Videos extends Component {

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
        const { classes } = this.props;

        if (!this.state.clicked) {
            return (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
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
        } else {
            return (
                <VideosApp />
            );
        }
    }
}

export default withStyles(styles)(Videos);
