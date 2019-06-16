import React, { Component } from 'react';
import Leap from './leap'
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
//add firebase
import * as firebase from "firebase/app";
import "firebase/database";
//firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjM37_DSv2RvPQzl5YiVzmgRHfpd4rJFU",
  authDomain: "lui-medialab.firebaseapp.com",
  databaseURL: "https://lui-medialab.firebaseio.com",
  projectId: "lui-medialab",
  storageBucket: "lui-medialab.appspot.com",
  messagingSenderId: "247289397118",
  appId: "1:247289397118:web:eb2bcb0076d4bb4d"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
var database = firebase.database();
var currentRef = database.ref('voice');
//end

const styles = {
  // container: {
  //   position: 'fixed',
  //   top: '0px',
  //   left: '0px',
  //   height: '100vh',
  //   width: '100vw',
  //   backgroundCOlor: "#CFD8DC"
  // },
  
  button: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    color: "rgba(50,50,50,0.8)",
  },
}
class PrismaticApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exit: false,
    }
  }
  componentDidMount(){
  //google home
  currentRef.update({"current":"prismatic"});
  var something = this;
  currentRef.on('value', function(snapshot) {
    console.log(snapshot.val());
    var db = snapshot.val();
    var name = db.goto;
    if (db.update){
      if (name === "home") {
          something.setState({ exit: true });
          currentRef.update({"update":false});
      }
    }
    if(db.back){
      something.setState({ exit: true });
      currentRef.update({"back":false});
    }
  });
  //end
}

  handleExit = () => {
    console.log("exit");
    this.setState({
      exit: true
    })
  }

  render() {
    const { classes } = this.props;

    if (this.state.exit) {
      return <Redirect to={{ pathname: "/Home" }} />
    }

    return (
      <div>
        <Leap
          handleExit={this.handleExit}
        />
        <ml-model
          id="portal2"
          src="cube.fbx"
          style={{
            position: 'absolute', top: '50%', left: '50%', width: '500px', height: '500px', transform: 'translate(-50 %, -50 %)',
          }}
        />
        <div className = "container">
          <Button onClick={() => this.handleExit()}  className={classes.button}>
                <Home/>
          </Button>
        </div>
      </div>

    );

  }
};

export default withStyles(styles)(PrismaticApp);
