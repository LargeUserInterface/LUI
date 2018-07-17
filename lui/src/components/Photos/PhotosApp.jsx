import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  container: {
    width: '95%',
    height: '95%',
    position: 'absolute',
    margin: 'auto',
    padding: '30px',
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
    padding: '10px',
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
          <img className={classes.image} src='https://images.unsplash.com/photo-1531752074002-abf991376d04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9a0a2b6b4212fc234d319be9c87c615&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} src='https://images.unsplash.com/photo-1531700968341-bd114e5006ec?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e3b02f32d781454cb7f97a78657a5b4&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} src='https://images.unsplash.com/photo-1531686888376-83ee7d64f5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d03c403992f2433e3bc7900db49834f&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} src='https://images.unsplash.com/photo-1531579929639-669368809067?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=23cbf95fc7730f15f16bc09e4b8e3af6&auto=format&fit=crop&w=800&q=60' />
        </li>
        <li className={classes.cell}>
          <img className={classes.image} src='https://images.unsplash.com/photo-1531574595918-cb77c99fe5e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad5b61555629bdf87c0dd87b4a383ff1&auto=format&fit=crop&w=800&q=60' />
        </li>


      </ul>
      // <Grid className={classes.mainContainer} container spacing={24}>

      //   {/* <Grid className={classes.topBar} item xs={12}>
      //     <TopBar />
      //   </Grid> */}

      //   <Grid className={classes.appsContainer} container spacing={12}>
      //       <Grid className={classes.photos} item xs={3} cl>
      //         <div> 1 </div>
      //       </Grid>


      //   </Grid>
      // </Grid>
    );
  }
}

export default withStyles(styles)(PhotosApp);
