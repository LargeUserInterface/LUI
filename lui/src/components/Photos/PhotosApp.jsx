import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Leap from './leap.js';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { css } from 'glamor';
import { Transition } from 'react-transition-group';
import Carousel from 'react-responsive-carousel';

const zoomIn = css.keyframes({
  '0%': { transform: 'scale(0.5)' },
  '100%': { transform: 'scale(1)' }
})

const styles = {

  gallery: {
    animation: `${zoomIn} 1s`
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    padding: '0px',
    listStyle: 'none',
    overflow: 'none',
    zIndex: '1',
    backgroundColor: '#CFD8DC',
  },

  carousel: {
    width: '100%',
    height: '90%',
    padding: '0px',
    margin: '0px'
  },

  row: {
    height: '30%',
    margin: '2%'
  },

  cell: {
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    margin: '0px',
    position: 'relative',
  },

  image: {
    display: 'block',
    maxWidth: '90%',
    maxHeight: '90%',
    width: 'auto',
    height: 'auto',
    margin: 'auto',
    padding: '3%',
    border: 'none',
    transform: 'scale(1)',
    transition: 'all 0.7s',
    boxShadow: '0px 0px 10px 2px #999',
    backgroundColor: "#ECEFF1"
  },

  hovered: {
    transform: 'scale(1.5)',
    animationDuration: '0.1s',
    zIndex: 10,
  },

  stepper: {
    height: '10%',
    margin: '0px',
    padding: '0px',
    backgroundColor: '#CFD8DC',
    zIndex: 1
  },

  dots: {
    margin: 'auto',
  }
};

class PhotosApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      hovered: "",
      clicked: "",
      index: 0,
      exit: false,
      activeStep: 0,
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = () => {
    const photos = [this.refs.photo1, this.refs.photo2, this.refs.photo3, this.refs.photo4,
    this.refs.photo5, this.refs.photo6, this.refs.photo7, this.refs.photo8,
    this.refs.photo9, this.refs.photo10, this.refs.photo11, this.refs.photo12,
    this.refs.photo13, this.refs.photo14, this.refs.photo15, this.refs.photo16
    ];
    this.setState({ photos })
  }

  handleHover = (photo) => {
    this.setState({ hovered: photo })
  }

  handleClick = (photo) => {
    this.setState({ clicked: photo })
  }

  handleSwipe = (dir) => {
    if (dir === "left") {
      // console.log("swipe left");
      this.setState({
        index: 1
      })
    } else {
      // console.log("swipe right");
      this.setState({
        index: 0
      })
    }
  }

  handleExit = () => {

    this.setState({
      exit: true
    })
  }

  handleNext = () => {
    this.setState(state => ({
      index: 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      index: 0,
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { hovered } = this.state;

    if (this.state.exit) {
      return <Redirect to={{ pathname: "/" }} />
    }

    return (
      <div className={classes.container}>
        <Leap
          photos={this.state.photos}
          handleHover={this.handleHover}
          // handleClick={this.handleClick}
          handleSwipe={this.handleSwipe}
          handleExit={this.handleExit}
        />
        <div>
          <SwipeableViews className={classes.gallery} index={this.state.index} onTransitionEnd={this.getPhotos}>

            <div className={classes.carousel}>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid item className={classes.cell} ref="photo1" xs={12} sm={3} >
                  <img onMouseEnter={() => { this.setState({hovered: "photo1"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo1" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo2" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo2"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo2" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo3" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo3"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo3" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533247094082-709d7257cb7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03d0175eccb69353cf2cc77869902e4f&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo4" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo4"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo4" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60' />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={0} justify={"center"}>
                <Grid item className={classes.cell} ref="photo5" xs={12} sm={3}>
                  <img onMouseEnter={() => { this.setState({hovered: "photo5"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo5" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533213603451-060f6ec38bfa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d961f9dbe9795f95febb3743a89d14d&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo6" xs={12} sm={3}>
                  <img onMouseEnter={() => { this.setState({hovered: "photo6"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo6" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo7" xs={12} sm={3}>
                  <img onMouseEnter={() => { this.setState({hovered: "photo7"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo7" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533135347859-2d07f6e8199b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb46a125e61ce38dc70712cefc7cb147&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo8" xs={12} sm={3}>
                  <img onMouseEnter={() => { this.setState({hovered: "photo8"}) }}  onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo8" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533071581733-1a1600ec8ac6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a59d7ee412d9efb4818bb4a9ddd55c9&auto=format&fit=crop&w=800&q=60' />
                </Grid>
              </Grid>
            </div>

            <div className={classes.carousel}>
              <Grid container className={classes.row} spacing={0} justify={"center"} >
                <Grid item className={classes.cell} ref="photo9" xs={12} sm={3}>
                  <img onMouseEnter={() => { this.setState({hovered: "photo9"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo9" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533213603451-060f6ec38bfa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d961f9dbe9795f95febb3743a89d14d&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo10" xs={12} sm={3}>
                  <img onMouseEnter={() => { this.setState({hovered: "photo10"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo10" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo11" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo11"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo11" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533135347859-2d07f6e8199b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb46a125e61ce38dc70712cefc7cb147&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo12" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo12"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo12" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533071581733-1a1600ec8ac6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a59d7ee412d9efb4818bb4a9ddd55c9&auto=format&fit=crop&w=800&q=60' />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={0} justify={"center"}>
                <Grid item className={classes.cell} ref="photo13" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo13"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo13" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo14" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo14"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo14" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo15" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo15"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo15" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1533247094082-709d7257cb7b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03d0175eccb69353cf2cc77869902e4f&auto=format&fit=crop&w=800&q=60' />
                </Grid>
                <Grid item className={classes.cell} ref="photo16" xs={12} sm={3}>
                  <img  onMouseEnter={() => { this.setState({hovered: "photo16"}) }} onMouseLeave={() => { this.setState({hovered: ""}) }} className={hovered === "photo16" ? classNames(classes.image, classes.hovered) : classes.image} src='https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60' />
                </Grid>
              </Grid>
            </div>
          </SwipeableViews>
        </div>
        <MobileStepper
          variant="dots"
          steps={2}
          position="bottom"
          activeStep={this.state.index}
          className={classes.stepper}
          classes={{ dots: classes.dots }}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={this.state.index === 1}>
              Next
              {/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.index === 0}>
              {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
              Back
            </Button>
          }
        />

        {/* {this.state.clicked ? <Carousel>
          <div>
            <img src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
          </div>
          <div>
            <img src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
          </div>
        </Carousel> : null} */}

      </div>
    );
  }
}

export default withStyles(styles)(PhotosApp);
