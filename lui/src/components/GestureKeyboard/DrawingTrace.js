import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  path: {

  }
};

function DrawingTrace(props) {
  const { classes, key, points } = props;
  const pathData = "M " +
    points
      .map(p => {
        if (p) {
          return `${p.get('x')} ${p.get('y')}`;
        }
      })
      .join("\nL ");

  return <path className={classes.path} d={pathData} />;
}

DrawingTrace.propTypes = {
  // update
};

export default withStyles(styles)(DrawingTrace);