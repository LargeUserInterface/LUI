import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    margin: 'auto',
    padding: '0px',
    backgroundColor: '#FFF',
    listStyle: 'none',
    overflow: 'none',
    zIndex: '1'
  },

  cell: {
    display: 'inline-block',
    width: '25%',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    padding: '20px',
    position: 'relative',
  },

  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    border: 'none',
    transform: 'scale(1)',
    transition: 'all 1s',
    '&:hover': {
      transform: 'scale(1.05)',
      animationDuration: '1s'
    }
  }
};

class PhotosApp extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ul className={classes.container}>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo1" src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo2" src='https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo3" src='https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo4" src='https://images.unsplash.com/photo-1531579929639-669368809067?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=23cbf95fc7730f15f16bc09e4b8e3af6&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo5" src='https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo6" src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo7" src='https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo8" src='https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo9" src='https://images.unsplash.com/photo-1531579929639-669368809067?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=23cbf95fc7730f15f16bc09e4b8e3af6&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} ref = "photo10" src='https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60' />
        </li>
      </ul>
    );
  }
}

export default withStyles(styles)(PhotosApp);
