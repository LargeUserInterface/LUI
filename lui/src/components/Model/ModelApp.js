import * as THREE from 'three';
import LeapMotion from 'leapjs';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
var FBXLoader = require('three-fbx-loader');
var fbxUrl = require('./mech-drone/source/Drone.zip/Drone.FBX');

const styles = {
  canvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 100,
    pointerEvents: 'none'
  },
};

const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];

class ModelApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastControlsIndex: -1,
      controlsIndex: -1,
      index: -1,
      frame: {},
      hand: [],
      exit: false
    }

    this.renderScene = this.renderScene.bind(this);
    this.changeControlsIndex = this.changeControlsIndex.bind(this);
    this.transform = this.transform.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.showCursor = this.showCursor.bind(this);
    this.LeapCameraControls = this.LeapCameraControls.bind(this);

  }

  traceFingers(frame) {
    try {
      // TODO: make canvas and ctx global
      const canvas = this.refs.canvas;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { frame, hand } = this.state;

      if (hand) {
        hand.forEach((h) => {
          h.fingers.forEach((pointable) => {
            const color = fingers[pointable.type];
            const position = pointable.stabilizedTipPosition;
            const normalized = frame.interactionBox.normalizePoint(position);
            const x = ctx.canvas.width * normalized[0];
            const y = ctx.canvas.height * (1 - normalized[1]);
            const radius = Math.min(20 / Math.abs(pointable.touchDistance), 50);
            this.drawCircle([x, y], radius, color, pointable.type === 1);
          });
        });
      }
    } catch (err) { }
  }

  drawCircle(center, radius, color, fill) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.lineWidth = 10;
    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }

  componentDidMount() {

    var camera, scene, renderer, light;
    var objects = [], cameraControls;
    var coords1, coords2, coords3;

    // renderer
    // this.setState({renderer:new THREE.WebGLRenderer({antialias: true})});
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize($(window).width(), $(window).height());
    renderer.setClearColor(0xffffff, 1);
    $("#container").append(renderer.domElement);

    // camera
    // this.setState({camera:new THREE.PerspectiveCamera(25, $(window).width()/$(window).height(), 0.1, 10000)});
    camera = new THREE.PerspectiveCamera(25, $(window).width() / $(window).height(), 0.1, 10000);
    camera.position.x = 500;
    camera.position.y = 500;
    camera.position.z = 500;
    var origin = new THREE.Vector3(0, 0, 0);
    camera.lookAt(origin);

    // leap camera controls
    // this.setState({cameraControls: new THREE.LeapCameraControls(camera)});
    cameraControls = new this.LeapCameraControls(camera);

    // world
    scene = new THREE.Scene();

    // projector
    // projector = new THREE.Projector();

    // camera target coordinate system
    coords1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, 75, 0xcccccc);
    coords2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, 75, 0xcccccc);
    coords3 = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, 75, 0xcccccc);
    scene.add(coords1);
    scene.add(coords2);
    scene.add(coords3);

    // world coordinate system (thin dashed helping lines)
    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices;
    vertArray.push(new THREE.Vector3(1000, 0, 0), origin, new THREE.Vector3(0, 1000, 0), origin, new THREE.Vector3(0, 0, 1000));
    var lineMaterial = new THREE.LineDashedMaterial({ color: 0xcccccc, dashSize: 1, gapSize: 2 });
    var coords = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(coords);

    // mech drone
    var loader = new FBXLoader();
    var _this = this;
    loader.load(fbxUrl, function (object) {

      object.receiveShadow = true;
      object.traverse( function ( child ) {
						if ( child.isMesh ) {
							child.castShadow = true;
							child.receiveShadow = true;
						}
					} );

      scene.add(object);
      objects.push(object);

    }, undefined, function ( error ) {
    	console.error( error );
    } );

    this.renderer = renderer;
    this.camera = camera;
    // this.cameraControls = cameraControls;
    this.scene = scene;
    this.objects = objects;

    // light
    light = new THREE.PointLight(0xefefef);
    scene.add(light);

    // listen to resize event
    window.addEventListener('resize', this.onWindowResize(), false);
    // render (if no leap motion controller is detected, then this call is needed in order to see the plot)
    this.renderScene();

    this.leap = LeapMotion.loop((frame) => {
      this.setState({
        frame,
        hand: frame.hands
      })
      this.showCursor(frame);
      // set correct camera control
      this.state.controlsIndex = this.focusObject(frame);
      if (this.state.index == -1) {
        cameraControls.update(frame);
      } else {
        this.objectsControls[this.state.index].update(frame);
      };
      this.renderScene();
      this.traceFingers(frame);
    });

    this.timer = setInterval(() => {
      // check for unlocking motion
      if (this.state.hand.length > 0) {
        if (this.state.hand[0].palmVelocity[1] > 400) {
          console.log("exit");
          this.setState({
            exit: true
          })
        }
      }
    }, 100);
  }

  changeControlsIndex() {
    if (this.state.lastControlsIndex == this.state.controlsIndex) {
      if (this.state.index != this.state.controlsIndex && this.state.controlsIndex > -2) {
        // new object or camera to control
        if (this.state.controlsIndex > -2) {
          if (this.state.index > -1) this.objects[this.state.index].material.color.setHex(0xefefef);
          this.setState({ index: this.state.controlsIndex });
          if (this.state.index > -1) this.objects[this.state.index].material.color.setHex(0xff0000);
        }
      };
    };
    this.state.lastControlsIndex = this.state.controlsIndex;
  };

  transform(tipPosition, w, h) {
    var width = 150;
    var height = 150;
    var minHeight = 100;
    var ftx = tipPosition[0];
    var fty = tipPosition[1];
    ftx = (ftx > width ? width - 1 : (ftx < -width ? -width + 1 : ftx));
    fty = (fty > 2 * height ? 2 * height - 1 : (fty < minHeight ? minHeight + 1 : fty));
    var x = THREE.Math.mapLinear(ftx, -width, width, 0, w);
    var y = THREE.Math.mapLinear(fty, 2 * height, minHeight, 0, h);
    return [x, y];
  };

  showCursor(frame) {
    var hl = frame.hands.length;
    var fl = frame.pointables.length;
    if (hl == 1 && fl == 1) {
      var f = frame.pointables[0];
      var cont = $(this.renderer.domElement);
      var offset = cont.offset();
      var coords = this.transform(f.tipPosition, cont.width(), cont.height());
      $("#cursor").css('left', offset.left + coords[0] - (($("#cursor").width() - 1) / 2 + 1));
      $("#cursor").css('top', offset.top + coords[1] - (($("#cursor").height() - 1) / 2 + 1));
    } else {
      $("#cursor").css('left', -1000);
      $("#cursor").css('top', -1000);
    };
  };

  focusObject(frame) {
    var hl = frame.hands.length;
    var fl = frame.pointables.length;
    if (hl == 1 && fl == 1) {
      var f = frame.pointables[0];
      var cont = $(this.renderer.domElement);
      var coords = this.transform(f.tipPosition, cont.width(), cont.height());
      var vpx = (coords[0] / cont.width()) * 2 - 1;
      var vpy = -(coords[1] / cont.height()) * 2 + 1;
      var vector = new THREE.Vector3(vpx, vpy, 0.5);
      // projector.unprojectVector(vector, camera);
      var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
      var intersects = raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        var i = 0;
        while (!intersects[i].object.visible) i++;
        var intersected = intersects[i];
        return this.objects.indexOf(intersected.object);
      } else {
        return -1;
      };
    };
    return -2;
  };

  onWindowResize() {
    this.camera.aspect = $(window).width() / $(window).height();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize($(window).width(), $(window).height());
    this.renderScene();
  };

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  };

  LeapCameraControls(camera) {
    var _this = this;

    this.camera = camera;

    // api
    this.enabled = true;
    this.target = new THREE.Vector3(0, 0, 0);
    this.step = (camera.position.z == 0 ? Math.pow(10, (Math.log(camera.near) + Math.log(camera.far)) / Math.log(10)) / 10.0 : camera.position.z);
    this.fingerFactor = 2;

    // rotation
    this.rotateEnabled = true;
    this.rotateSpeed = 1.0;
    this.rotateHandPosition = true;
    this.rotateStabilized = false;
    this.rotateMin = 0;
    this.rotateMax = Math.PI;

    // zoom
    this.zoomEnabled = true;
    this.zoomSpeed = 1.0;
    this.zoomHandPosition = true;
    this.zoomStabilized = false;
    this.zoomMin = _this.camera.near;
    this.zoomMax = _this.camera.far;

    // pan
    this.panEnabled = true;
    this.panSpeed = 1.0;
    this.panHandPosition = true;
    this.panStabilized = false;

    // internals
    var _rotateXLast = null;
    var _rotateYLast = null;
    var _zoomZLast = null;
    var _panXLast = null;
    var _panYLast = null;
    var _panZLast = null;

    // helpers
    this.transformFactor = function (action) {
      switch (action) {
        case 'rotate':
          return _this.rotateSpeed * (_this.rotateHandPosition ? 1 : _this.fingerFactor);
        case 'zoom':
          return _this.zoomSpeed * (_this.zoomHandPosition ? 1 : _this.fingerFactor);
        case 'pan':
          return _this.panSpeed * (_this.panHandPosition ? 1 : _this.fingerFactor);
      };
    };

    this.rotateTransform = function (delta) {
      return _this.transformFactor('rotate') * THREE.Math.mapLinear(delta, -400, 400, -Math.PI, Math.PI);
    };

    this.zoomTransform = function (delta) {
      return _this.transformFactor('zoom') * THREE.Math.mapLinear(delta, -400, 400, -_this.step, _this.step);
    };

    this.panTransform = function (delta) {
      return _this.transformFactor('pan') * THREE.Math.mapLinear(delta, -400, 400, -_this.step, _this.step);
    };

    this.applyGesture = function (frame, action) {
      var hand = frame.hands[0];
      var hl = frame.hands.length;
      var fl = frame.pointables.length;

      switch (action) {
        case 'rotate':
          if (hl == 1 && hand.type == 'left') return true;
          break;
        case 'zoom':
          if (hl == 1 && hand.type == 'right') return true;
          break;
        case 'pan':
          if (hl == 2) return true;
          break;
      };

      return false;
    };

    this.hand = function (frame, action) {
      var hds = frame.hands;

      if (hds.length > 0) {
        if (hds.length == 1) {
          return hds[0];
        } else if (hds.length == 2) {
          var lh, rh;
          if (hds[0].palmPosition[0] < hds[1].palmPosition[0]) {
            lh = hds[0];
            rh = hds[1];
          } else {
            lh = hds[1];
            rh = hds[0];
          }
          switch (action) {
            case 'rotate':
              if (_this.rotateRightHanded) {
                return rh;
              } else {
                return lh;
              };
            case 'zoom':
              if (_this.zoomRightHanded) {
                return rh;
              } else {
                return lh;
              };
            case 'pan':
              if (_this.panRightHanded) {
                return rh;
              } else {
                return lh;
              };
          };
        };
      };

      return false;
    };

    this.position = function (frame, action) {
      // assertion: if `...HandPosition` is false, then `...Fingers` needs to be 1 or [1, 1]
      var h;
      switch (action) {
        case 'rotate':
          h = _this.hand(frame, 'rotate');
          return (_this.rotateHandPosition
            ? (_this.rotateStabilized ? h.stabilizedPalmPosition : h.palmPosition)
            : (_this.rotateStabilized ? frame.pointables[0].stabilizedTipPosition : frame.pointables[0].tipPosition)
          );
        case 'zoom':
          h = _this.hand(frame, 'zoom');
          return (_this.zoomHandPosition
            ? (_this.zoomStabilized ? h.stabilizedPalmPosition : h.palmPosition)
            : (_this.zoomStabilized ? frame.pointables[0].stabilizedTipPosition : frame.pointables[0].tipPosition)
          );
        case 'pan':
          h = _this.hand(frame, 'pan');
          return (_this.panHandPosition
            ? (_this.panStabilized ? h.stabilizedPalmPosition : h.palmPosition)
            : (_this.panStabilized ? frame.pointables[0].stabilizedTipPosition : frame.pointables[0].tipPosition)
          );
      };
    };

    // methods
    this.rotateCamera = function (frame) {
      if (_this.rotateEnabled && _this.applyGesture(frame, 'rotate')) {
        console.log("ROTATE CAMERA");
        // rotate around axis in xy-plane (in target coordinate system) which is orthogonal to camera vector
        var y = _this.position(frame, 'rotate')[1];
        if (!_rotateYLast) _rotateYLast = y;
        var yDelta = y - _rotateYLast;
        var t = new THREE.Vector3().subVectors(_this.camera.position, _this.target); // translate
        var angleDelta = _this.rotateTransform(yDelta);
        var newAngle = t.angleTo(new THREE.Vector3(0, 1, 0)) + angleDelta;
        if (_this.rotateMin < newAngle && newAngle < _this.rotateMax) {
          var n = new THREE.Vector3(t.z, 0, -t.x).normalize();
          var matrixX = new THREE.Matrix4().makeRotationAxis(n, angleDelta);
          console.log(_this.camera.position)
          const newPosition = t.applyMatrix4(matrixX).add(_this.target);
          console.log("new", newPosition);
          // _this.camera.position.set(newPosition); // rotate and translate back
        };

        // rotate around y-axis translated by target vector
        var x = _this.position(frame, 'rotate')[0];
        if (!_rotateXLast) _rotateXLast = x;
        var xDelta = x - _rotateXLast;
        var matrixY = new THREE.Matrix4().makeRotationY(-_this.rotateTransform(xDelta));
        _this.camera.position.sub(_this.target).applyMatrix4(matrixY).add(_this.target); // translate, rotate and translate back
        _this.camera.lookAt(_this.target);

        _rotateYLast = y;
        _rotateXLast = x;
        _zoomZLast = null;
        _panXLast = null;
        _panYLast = null;
        _panZLast = null;
      } else {
        _rotateYLast = null;
        _rotateXLast = null;
      };
    };

    this.zoomCamera = function (frame) {
      if (_this.zoomEnabled && _this.applyGesture(frame, 'zoom')) {
        console.log("ZOOM CAMERA");
        var z = _this.position(frame, 'zoom')[2];
        if (!_zoomZLast) _zoomZLast = z;
        var zDelta = z - _zoomZLast;
        var t = new THREE.Vector3().subVectors(_this.camera.position, _this.target);
        var lengthDelta = _this.zoomTransform(zDelta);
        var newLength = t.length() - lengthDelta;
        if (_this.zoomMin < newLength && newLength < _this.zoomMax) {
          t.normalize().multiplyScalar(lengthDelta);
          _this.camera.position.sub(t);
        };

        _zoomZLast = z;
        _rotateXLast = null;
        _rotateYLast = null;
        _panXLast = null;
        _panYLast = null;
        _panZLast = null;
      } else {
        _zoomZLast = null;
      };
    };

    this.panCamera = function (frame) {
      if (_this.panEnabled && _this.applyGesture(frame, 'pan')) {
        console.log("PAN CAMERA");
        var x = _this.position(frame, 'pan')[0];
        var y = _this.position(frame, 'pan')[1];
        var z = _this.position(frame, 'pan')[2];
        if (!_panXLast) _panXLast = x;
        if (!_panYLast) _panYLast = y;
        if (!_panZLast) _panZLast = z;
        var xDelta = x - _panXLast;
        var yDelta = y - _panYLast;
        var zDelta = z - _panZLast;

        var v = _this.camera.localToWorld(new THREE.Vector3(_this.panTransform(xDelta), _this.panTransform(yDelta), _this.panTransform(zDelta)));
        v.sub(_this.camera.position);

        _this.camera.position.sub(v);
        _this.target.sub(v);

        _panXLast = x;
        _panYLast = y;
        _panZLast = z;
        _rotateXLast = null;
        _rotateYLast = null;
        _zoomZLast = null;
      } else {
        _panXLast = null;
        _panYLast = null;
        _panZLast = null;
      };
    };

    this.update = function (frame) {
      if (_this.enabled) {
        _this.rotateCamera(frame);
        _this.zoomCamera(frame);
        _this.panCamera(frame);
      };
    };
  }

  componentWillUnmount() {
    console.log("Model leap is unmounted")
    clearInterval(this.timer);
    this.leap.disconnect();
  }

  render() {
    const { classes } = this.props;

    if (this.state.exit) {
      return <Redirect to={{ pathname: "/" }} />
    }

    return (
      <div>
        <canvas className={classes.canvas} ref="canvas"></canvas>
        <div id="container"></div>
      </div>
    )
  }
}

export default withStyles(styles)(ModelApp);
