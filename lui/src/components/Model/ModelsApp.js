import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import glamorous from 'glamorous'
import classNames from 'classnames';
import Leap from './leap.js';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Home from '@material-ui/icons/Home';

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
    overflow: 'hidden',
    zIndex: '1',
    backgroundColor: '#CFD8DC',
  },

  carousel: {
    // width: '90%',
    maxHeight: '95%',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
  },

  row: {
    maxHeight: '50vh',
  },

  cell: {
    display: 'inline-block',
    maxWidth: '85%',
    maxHeight: '85%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    margin: '0px',
    padding: '3%',
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
    transition: 'all 0.4s',
    boxShadow: '0px 0px 10px 2px #999',
    backgroundColor: "#ECEFF1",
    position: "relative",
    zIndex: '1'
  },

  hovered: {
    transform: 'scale(1.2)',
    animationDuration: '0.1s',
    zIndex: '15 !important'
  },

  zoomed: {
    maxHeight: '80vh'
  },

  dots: {
    margin: 'auto',
  },

  stepper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '8em',
    backgroundColor: 'rgb(0,0,0,0)',
    position: "absolute",
    bottom: "1px",
  },

  button: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    color: "rgba(50,50,50,0.8)",
  }
};

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})
const slideOut = css.keyframes({
  '100%': { transform: 'translateY(-100%)' },
})

const Wrapper = glamorous.div(props => ({
  animation: props.isMounted ? `${slideOut} 2.5s` : `${fadeIn} 1.5s`,
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: 5
}))

const models = {
  model1: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play:"https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model2: {name: "tokyo",
           pause: "https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042/embed?camera=0",
           play: "https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042/embed?autospin=0.2&amp;autostart=1&amp;camera=0",},

  model3: {name: "fox",
           pause: "https://sketchfab.com/models/371dea88d7e04a76af5763f2a36866bc/embed?camera=0",
           play: "https://sketchfab.com/models/371dea88d7e04a76af5763f2a36866bc/embed?autospin=0.2&amp;autostart=1&amp;camera=0"},

  model4: {name: "ship",
           pause: "https://sketchfab.com/models/9ddbc5b32da94bafbfdb56e1f6be9a38/embed?camera=0",
           play: "https://sketchfab.com/models/9ddbc5b32da94bafbfdb56e1f6be9a38/embed?autospin=0.2&amp;autostart=1&amp;camera=0"},

  model5: {name: "sportscar",
           pause: "https://sketchfab.com/models/a361c0f7b7e041fc8f3437a5cbec681a/embed?camera=0",
           play: "https://sketchfab.com/models/a361c0f7b7e041fc8f3437a5cbec681a/embed?autospin=0.2&amp;autostart=1&amp;camera=0"},

  model6: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model7: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model8: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model9: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model10: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model11: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"},

  model12: {name: "drone",
           pause: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?camera=0",
           play: "https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e/embed?autostart=1&amp;camera=0"}
}

class ModelsApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: [],
      hovered: "",
      clicked: "",
      index: 0,
      exit: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getModels();
  }

  getModels = () => {
    const models = [this.refs.model1, this.refs.model2, this.refs.model3, this.refs.model4,
    this.refs.model5, this.refs.model6, this.refs.model7, this.refs.model8,
    this.refs.model9, this.refs.model10, this.refs.model11, this.refs.model12
    ];
    this.setState({ models })
  }

  handleHover = (model) => {
    this.setState({ hovered: model })
  }

  handleClick = (model) => {
    this.setState({ clicked: model })
  }

  handleExit = () => {
    this.setState({
      exit: true
    })
  }

  handleSwipe = (dir) => {
    if (dir === "left") {
      console.log("swipe left");
      this.setState({ index: 1 })
    } else {
      console.log("swipe right");
      this.setState({ index: 0 })
    }
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

  handleSwipeUp = () => {
    this.setState({ exit: true });
  }

  getModelSrc(ref) {
    const { hovered } = this.state;
    return hovered == ref ? models[ref].play : models[ref].pause;
  }

  renderModel(index) {
    const { classes } = this.props;
    const { hovered } = this.state;
    const ref = "model" + String(index + 1);

    return (<Grid item className={classes.cell} ref={ref} xs={12} sm={4}>
      <div
          class="sketchfab-embed-wrapper"
          onMouseEnter={() => { this.setState({ hovered: ref }) }}
          onMouseLeave={() => { this.setState({ hovered: "" }) }}
          onClick={() => { this.setState({ clicked: ref }) }}
          className={hovered === ref ? classNames(classes.image, classes.hovered) : classes.image}>
        <iframe
            width="100%" height="100%"
            src={this.getModelSrc(ref)}
            frameborder="0"
            allow="autoplay; fullscreen; vr"
            mozallowfullscreen="true"
            webkitallowfullscreen="true">
        </iframe>
      </div>
    </Grid>);
  }

  renderModels() {
    const { classes } = this.props;

    return (<div>
      <div>
        <SwipeableViews className={classes.gallery} index={this.state.index} onTransitionEnd={this.getModels}>

          <div className={classes.carousel} justify={"center"}>
            <Grid container className={classes.row} spacing={0} justify={"center"} >
              { this.renderModel(0) }
              { this.renderModel(1) }
              { this.renderModel(2) }
            </Grid>

            <Grid container className={classes.row} spacing={0} justify={"center"}>
              { this.renderModel(3) }
              { this.renderModel(4) }
              { this.renderModel(5) }
            </Grid>
          </div>

          <div className={classes.carousel}>
            <Grid container className={classes.row} spacing={0} justify={"center"} >
              { this.renderModel(6) }
              { this.renderModel(7) }
              { this.renderModel(8) }
            </Grid>

            <Grid container className={classes.row} spacing={0} justify={"center"}>
              { this.renderModel(9) }
              { this.renderModel(10) }
              { this.renderModel(11) }
            </Grid>
          </div>
        </SwipeableViews>
      </div>

      <div className = "stepper">
        <MobileStepper
          variant="dots"
          steps={2}
          position="bottom"
          activeStep={this.state.index}
          className={classes.stepper}
          classes={{ dots: classes.dots }}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={this.state.index === 1}>
              <KeyboardArrowRight />
              {/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.index === 0}>
              {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </div>
    </div>);
  }

  render() {
    const { classes } = this.props;
    const { clicked } = this.state;

    if (this.state.exit) {
      console.log("EXITING")
      return <Redirect to={{ pathname: "/Home", state: {page: "home"} }} />
    }

    if (clicked) {
      return <Redirect to={{ pathname: "Model/" +  models[clicked].name }} />
    }

    return (
      <Wrapper isMounted={this.props.isMounted} exit={this.state.exit}>
        <div>
          <div className={classes.container} justify={"center"}>
            <Leap
              models={this.state.models}
              handleHover={this.handleHover}
              handleClick={this.handleClick}
              handleSwipe={this.handleSwipe}
              handleSwipeUp={this.handleSwipeUp}
            />

            { this.renderModels() }

            <Button onClick={() => this.handleExit()}  className={classes.button}>
              <Home/>
            </Button>

          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ModelsApp);
