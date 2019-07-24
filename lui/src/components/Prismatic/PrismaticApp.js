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
//fun
import pic from './Hello_Prismatic/key.png';
import model from './Hello_Prismatic/whale.fbx';
import prism from "@magicleap/prismatic";
//end
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
      spin: "axes: 1 0 0; angle: 360deg; duration: 5s; track: 2;",
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
  //end
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
    var demo = document.getElementById("demo");
    demo.innerHTML = "YOU CLICKED ME!";
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

    if (window.mlWorld) {
      // this is Helio browser which is capable of rendering spatialized content 
      var thing = <ml-model
      src={model}
      id={"whale"}
      style={{width: "1000px", height: "600px", right: "25%", top: "0%",}}
      z-offset={"500px"}
      model-scale={"0.5 0.5 0.5"}
      move-to={"offset: 500px 500px 1000px; duration: 3s; track: 1;"}
      spin={this.state.spin}
      scale-to={"axes: 0.25 0.25 0.25; duration: 3s; track: 1;"}
      model-animation={"Take 001, false, -1"} //animation name, pause bool, #iterations
      model-animation-speed={this.state.speed}
      raycast={"true"}
      extractable={"true"}>
    </ml-model>
    } else {
      // this is not Helio 
    }

    return (
      <div>
        <Leap
          handleExit={this.handleExit}
        />
        <h1
        id ={"demo"}
        >not CLICKED</h1>
        
        
        <button
          id ={"test"}
          onClick = {this.testclick}
          style={{backgroundColor: "#4CAF50",
            border: "none",
            margin: "auto",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            display: "inline-block",
            fontSize: "60px",
            width: "700px", 
            height: "200px",
            position:"absolute",
            left: "25%",
            top: "10%",
            

        }}
        >WIGGLE</button>
        {thing}
        {/* <ml-quad
          src={pic}
          style={{
          width:"300px",
          height:"271px",
          
          }}
          z-offset={"500px"}
          >        */}
        {/* </ml-quad> */}
        {/* <img
          src={pic}
          width={"300px"}
          height={"271px"}
          >       
        </img> */}
      

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
