import * as THREE from 'three';
import LeapMotion from 'leapjs';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  canvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 100,
    pointerEvents: 'none'
  }
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
      hand: "",
      exit: false
    }

    this.renderScene = this.renderScene.bind(this);
    this.changeControlsIndex = this.changeControlsIndex.bind(this);
    this.transform = this.transform.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.showCursor = this.showCursor.bind(this);
    this.LeapObjectControls = this.LeapObjectControls.bind(this);
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
    var objects = [], objectsControls = [], cameraControls;
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
    cameraControls.rotateEnabled = true;
    cameraControls.rotateSpeed = 3;
    cameraControls.rotateHands = 1;
    cameraControls.rotateFingers = [2, 3];

    cameraControls.zoomEnabled = true;
    cameraControls.zoomSpeed = 6;
    cameraControls.zoomHands = 1;
    cameraControls.zoomFingers = [4, 5];
    cameraControls.zoomMin = 50;
    cameraControls.zoomMax = 2000;

    cameraControls.panEnabled = true;
    cameraControls.panSpeed = 2;
    cameraControls.panHands = 2;
    cameraControls.panFingers = [6, 12];
    cameraControls.panRightHanded = false; // for left-handed person

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

    // cubes
    for (var i = 0; i < 20; i++) {
      var geometry = new THREE.CubeGeometry(Math.random() * 60, Math.random() * 60, Math.random() * 60);
      var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xefefef }));
      object.position.x = Math.random() * 300 - 150;
      object.position.y = Math.random() * 300 - 150;
      object.position.z = Math.random() * 200 - 100;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;
      object.receiveShadow = true;

      // leap object controls
      var objectControls = new this.LeapObjectControls(camera, object);
      objectControls.rotateEnabled = true;
      objectControls.rotateSpeed = 3;
      objectControls.rotateHands = 1;
      objectControls.rotateFingers = [2, 3];

      objectControls.scaleEnabled = true;
      objectControls.scaleSpeed = 3;
      objectControls.scaleHands = 1;
      objectControls.scaleFingers = [4, 5];

      objectControls.panEnabled = true;
      objectControls.panSpeed = 3;
      objectControls.panHands = 2;
      objectControls.panFingers = [6, 12];
      objectControls.panRightHanded = false; // for left-handed person
      scene.add(object);
      objects.push(object);
      objectsControls.push(objectControls);
    };

    this.renderer = renderer;
    this.camera = camera;
    // this.cameraControls = cameraControls;
    this.scene = scene;
    // this.projector = projector;
    this.objects = objects;
    // this.objectsControls = objectControls;

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
      // custom modifications (here: show coordinate system always on target and light movement)
      // coords1.position.set(cameraControls.target);
      // coords2.position.set(cameraControls.target);
      // coords3.position.set(cameraControls.target);
      // light.position.set(camera.position);
      this.renderScene();
      this.traceFingers(frame);
    });

    this.timer = setInterval(() => {
      // check for unlocking motion
      if (this.state.hand) {
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

  LeapObjectControls(camera, object) {
    var _this = this;

    this.camera = camera;
    this.object = object;

    // api
    this.enabled = true;
    this.step = (camera.position.z == 0 ? Math.pow(10, (Math.log(camera.near) + Math.log(camera.far)) / Math.log(10)) / 10.0 : camera.position.z);
    this.fingerFactor = 2;

    // rotation
    this.rotateEnabled = true;
    this.rotateSpeed = 4.0;
    this.rotateHands = 1;
    this.rotateFingers = [2, 3];
    this.rotateRightHanded = true;
    this.rotateHandPosition = true;
    this.rotateStabilized = false;
    this.rotateMin = 0;
    this.rotateMax = Math.PI;

    // scale
    this.scaleEnabled = true;
    this.scaleSpeed = 1.0;
    this.scaleHands = 1;
    this.scaleFingers = [4, 5];
    this.scaleRightHanded = true;
    this.scaleHandPosition = true;
    this.scaleStabilized = false;
    this.scaleMin = 0.1;
    this.scaleMax = 10;

    // pan
    this.panEnabled = true;
    this.panSpeed = 1.0;
    this.panHands = 2;
    this.panFingers = [6, 12];
    this.panRightHanded = true;
    this.panHandPosition = true;
    this.panStabilized = false;

    // internals
    var _rotateXLast = null;
    var _rotateYLast = null;
    var _scaleZLast = null;
    var _panXLast = null;
    var _panYLast = null;
    var _panZLast = null;

    //Helper functions
    this.transformFactor = function (action) {
      switch (action) {
        case 'rotate':
          return _this.rotateSpeed * (_this.rotateHandPosition ? 1 : _this.fingerFactor);
        case 'scale':
          return _this.scaleSpeed * (_this.scaleHandPosition ? 1 : _this.fingerFactor);
        case 'pan':
          return _this.panSpeed * (_this.panHandPosition ? 1 : _this.fingerFactor);
      };
    };

    this.applyGesture = function (frame, action) {
      var hl = frame.hands.length;
      var fl = frame.pointables.length;

      switch (action) {
        case 'rotate':
          if (_this.rotateHands instanceof Array) {
            if (_this.rotateFingers instanceof Array) {
              if (_this.rotateHands[0] <= hl && hl <= _this.rotateHands[1] && _this.rotateFingers[0] <= fl && fl <= _this.rotateFingers[1]) return true;
            } else {
              if (_this.rotateHands[0] <= hl && hl <= _this.rotateHands[1] && _this.rotateFingers == fl) return true;
            };
          } else {
            if (_this.rotateFingers instanceof Array) {
              if (_this.rotateHands == hl && _this.rotateFingers[0] <= fl && fl <= _this.rotateFingers[1]) return true;
            } else {
              if (_this.rotateHands == hl && _this.rotateFingers == fl) return true;
            };
          };
          break;
        case 'scale':
          if (_this.scaleHands instanceof Array) {
            if (_this.scaleFingers instanceof Array) {
              if (_this.scaleHands[0] <= hl && hl <= _this.scaleHands[1] && _this.scaleFingers[0] <= fl && fl <= _this.scaleFingers[1]) return true;
            } else {
              if (_this.scaleHands[0] <= hl && hl <= _this.scaleHands[1] && _this.scaleFingers == fl) return true;
            };
          } else {
            if (_this.scaleFingers instanceof Array) {
              if (_this.scaleHands == hl && _this.scaleFingers[0] <= fl && fl <= _this.scaleFingers[1]) return true;
            } else {
              if (_this.scaleHands == hl && _this.scaleFingers == fl) return true;
            };
          };
          break;
        case 'pan':
          if (_this.panHands instanceof Array) {
            if (_this.panFingers instanceof Array) {
              if (_this.panHands[0] <= hl && hl <= _this.panHands[1] && _this.panFingers[0] <= fl && fl <= _this.panFingers[1]) return true;
            } else {
              if (_this.panHands[0] <= hl && hl <= _this.panHands[1] && _this.panFingers == fl) return true;
            };
          } else {
            if (_this.panFingers instanceof Array) {
              if (_this.panHands == hl && _this.panFingers[0] <= fl && fl <= _this.panFingers[1]) return true;
            } else {
              if (_this.panHands == hl && _this.panFingers == fl) return true;
            };
          };
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
            case 'scale':
              if (_this.scaleRightHanded) {
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
        case 'scale':
          h = _this.hand(frame, 'scale');
          return (_this.scaleHandPosition
            ? (_this.scaleStabilized ? h.stabilizedPalmPosition : h.palmPosition)
            : (_this.scaleStabilized ? frame.pointables[0].stabilizedTipPosition : frame.pointables[0].tipPosition)
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
    this.rotateObject = function (frame) {
      if (_this.rotateEnabled && _this.applyGesture(frame, 'rotate')) {
        // rotate around axis in xy-plane which is orthogonal to camera vector
        var y = _this.position(frame, 'rotate')[1];
        if (!_rotateYLast) _rotateYLast = y;
        var yDelta = y - _rotateYLast;

        // rotate around y-axis
        var x = _this.position(frame, 'rotate')[0];
        if (!_rotateXLast) _rotateXLast = x;
        var xDelta = x - _rotateXLast;
        _this.object.rotation.y += _this.rotateTransform(xDelta);

        _rotateYLast = y;
        _rotateXLast = x;
        _scaleZLast = null;
        _panXLast = null;
        _panYLast = null;
        _panZLast = null;
      } else {
        _rotateYLast = null;
        _rotateXLast = null;
      };
    };

    this.scaleObject = function (frame) {
      if (_this.scaleEnabled && _this.applyGesture(frame, 'scale')) {
        var z = _this.position(frame, 'scale')[2];
        if (!_scaleZLast) _scaleZLast = z;
        var zDelta = z - _scaleZLast;
        var scaleDelta = _this.scaleTransform(zDelta);
        var newScale = _this.object.scale.x + scaleDelta;
        if (_this.scaleMin < newScale && newScale < _this.scaleMax) {
          _this.object.scale = new THREE.Vector3(newScale, newScale, newScale);
        };

        _scaleZLast = z;
        _rotateXLast = null;
        _rotateYLast = null;
        _panXLast = null;
        _panYLast = null;
        _panZLast = null;
      } else {
        _scaleZLast = null;
      };
    };

    this.panObject = function (frame) {
      if (_this.panEnabled && _this.applyGesture(frame, 'pan')) {
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
        _this.object.position.add(v);

        _panXLast = x;
        _panYLast = y;
        _panZLast = z;
        _rotateXLast = null;
        _rotateYLast = null;
        _scaleZLast = null;
      } else {
        _panXLast = null;
        _panYLast = null;
        _panZLast = null;
      };
    };

    this.update = function (frame) {
      if (_this.enabled) {
        _this.rotateObject(frame);
        _this.scaleObject(frame);
        _this.panObject(frame);
      };
    };
  }

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
    this.rotateHands = 1;
    this.rotateFingers = [2, 3];
    this.rotateRightHanded = true;
    this.rotateHandPosition = true;
    this.rotateStabilized = false;
    this.rotateMin = 0;
    this.rotateMax = Math.PI;

    // zoom
    this.zoomEnabled = true;
    this.zoomSpeed = 1.0;
    this.zoomHands = 1;
    this.zoomFingers = [4, 5];
    this.zoomRightHanded = true;
    this.zoomHandPosition = true;
    this.zoomStabilized = false;
    this.zoomMin = _this.camera.near;
    this.zoomMax = _this.camera.far;

    // pan
    this.panEnabled = true;
    this.panSpeed = 1.0;
    this.panHands = 2;
    this.panFingers = [6, 12];
    this.panRightHanded = true;
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
      var hl = frame.hands.length;
      var fl = frame.pointables.length;

      switch (action) {
        case 'rotate':
          if (_this.rotateHands instanceof Array) {
            if (_this.rotateFingers instanceof Array) {
              if (_this.rotateHands[0] <= hl && hl <= _this.rotateHands[1] && _this.rotateFingers[0] <= fl && fl <= _this.rotateFingers[1]) return true;
            } else {
              if (_this.rotateHands[0] <= hl && hl <= _this.rotateHands[1] && _this.rotateFingers == fl) return true;
            };
          } else {
            if (_this.rotateFingers instanceof Array) {
              if (_this.rotateHands == hl && _this.rotateFingers[0] <= fl && fl <= _this.rotateFingers[1]) return true;
            } else {
              if (_this.rotateHands == hl && _this.rotateFingers == fl) return true;
            };
          };
          break;
        case 'zoom':
          if (_this.zoomHands instanceof Array) {
            if (_this.zoomFingers instanceof Array) {
              if (_this.zoomHands[0] <= hl && hl <= _this.zoomHands[1] && _this.zoomFingers[0] <= fl && fl <= _this.zoomFingers[1]) return true;
            } else {
              if (_this.zoomHands[0] <= hl && hl <= _this.zoomHands[1] && _this.zoomFingers == fl) return true;
            };
          } else {
            if (_this.zoomFingers instanceof Array) {
              if (_this.zoomHands == hl && _this.zoomFingers[0] <= fl && fl <= _this.zoomFingers[1]) return true;
            } else {
              if (_this.zoomHands == hl && _this.zoomFingers == fl) return true;
            };
          };
          break;
        case 'pan':
          if (_this.panHands instanceof Array) {
            if (_this.panFingers instanceof Array) {
              if (_this.panHands[0] <= hl && hl <= _this.panHands[1] && _this.panFingers[0] <= fl && fl <= _this.panFingers[1]) return true;
            } else {
              if (_this.panHands[0] <= hl && hl <= _this.panHands[1] && _this.panFingers == fl) return true;
            };
          } else {
            if (_this.panFingers instanceof Array) {
              if (_this.panHands == hl && _this.panFingers[0] <= fl && fl <= _this.panFingers[1]) return true;
            } else {
              if (_this.panHands == hl && _this.panFingers == fl) return true;
            };
          };
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
          _this.camera.position = t.applyMatrix4(matrixX).add(_this.target); // rotate and translate back
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
