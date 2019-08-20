import React, { Component } from 'react';
import Leap from './leap'
import * as firebase from "firebase/app";
import "firebase/database";

import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';

//import pic from './Hello_Prismatic/key.png';
import pic from './Hello_Prismatic/whale.png'
import model from './Hello_Prismatic/whale.fbx';
import prism from "@magicleap/prismatic";

//firebase config
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


const styles = {
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
      spin: "axes: 0 0 0; angle: 0deg; duration: 2s; track: 2;",
      speed: "1",
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

    //pristest
    //controller stuff

    var whale = document.getElementById("whale");
    whale.addEventListener('transform-a nimation-end', (e) => {
      if (e.detail.track === 2) {
        // whale.setAttribute('rotate-by-angles', 'angles: 0 90deg 0; duration: 5s; track: 1');
        this.setState({spin:" "});
      }
    });

    whale.addEventListener('node-raycast', function (e) {
    if (e.detail.inputType === 'control') {
      if (e.detail.type === 'nodeOnControlEnter') {
        this.setState({speed:"2"})
        console.log("here")
      }
      if (e.detail.type === 'nodeOnControlExit') {
        this.setState({speed:"1"})
      }
    }
  });

    var button = document.getElementById("test");
      button.addEventListener('click', function (e) {
        console.log("clicked");
    });
  }

  testclick=()=> {
    var test = document.getElementById("test");
    test.innerHTML = "YOU CLICKED ME!";
    var whale  = document.getElementById("whale");
    // whale.fadeOut(); //doesnt work
    console.log(whale);//works?
    this.setState({spin:"axes: 0 0 1; angle: 360deg; duration: 3s; track: 2;"}) ;
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

        <button
          id ={"test"}
          onClick = {this.testclick}
          style={{backgroundColor: "#4CAF50",
            border: "none",
            margin: "auto",
            color: "white",
            padding: "0px 0px",
            textAlign: "center",
            display: "inline-block",
            fontSize: "32px",
            width: "1150px",
            height: "80px",
            position:"absolute",
            right: "0%",
            top: "90%",
          }}
          >WIGGLE
        </button>

        <ml-quad
          src={pic}
          alt-img="whale.png"
          style={{width:"1000px", height:"650px", position: "absolute", right: "5%", top: "2%",}}
          color="rgba(255, 255, 255, 1)"
          z-offset={"10px"}
          visibility="visible">
        </ml-quad>

        <ml-model
          src={model}
          alt-img="whale.png"
          id={"whale"}
          style={{width: "1000px", height: "1000px", right: "50%", top: "50%",}}
          z-offset={"500px"}
          model-scale={"0.5 0.5 0.5"}
          move-to={"offset: 500px 500px 700px; duration: 3s; track: 1;"}
          spin={this.state.spin}
          scale-to={"axes: 0.5 0.5 0.5; duration: 1s; track: 1;"}
          model-animation={"Take 001, false, -1"} //animation name, pause bool, #iterations
          model-animation-speed={this.state.speed}
          raycast={"true"}
          extractable={"true"}>
        </ml-model>

        <div
          className = "container">
          <Button onClick={() => this.handleExit()}  className={classes.button}>
                <Home/>
          </Button>
        </div>
      </div>
    );
  }
};


export default withStyles(styles)(PrismaticApp);
