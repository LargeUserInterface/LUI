import * as THREE from 'three';
import LeapMotion from 'leapjs';
import React, { Component } from 'react';
import $ from 'jquery';
// import THREE from '';

class ModelApp extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       scene: {}
    //     };
    //   }
    // componentDidMount() {
    //
    // }
    //
    // render() {
    //
    //     var camera, scene, renderer, projector, light;
    //     var objects = [], objectsControls = [], cameraControls;
    //     var coords1, coords2, coords3;
    //     var lastControlsIndex = -1, controlsIndex = -1, index = -1;
    //
    //     function init() {
    //
    //       // renderer
    //       renderer = new THREE.WebGLRenderer({antialias: true});
    //       renderer.setSize($(window).width(), $(window).height());
    //       renderer.setClearColor(0xffffff, 1);
    //       $("#container").append(renderer.domElement);
    //
    //       // camera
    //       camera = new THREE.PerspectiveCamera(25, $(window).width()/$(window).height(), 0.1, 10000);
    //       camera.position.x = 500;
    //       camera.position.y = 500;
    //       camera.position.z = 500;
    //       var origin = new THREE.Vector3(0, 0, 0);
    //       camera.lookAt(origin);
    //
    //       // leap camera controls
    //       cameraControls = new LeapCameraControls(camera);
    //
    //       cameraControls.rotateEnabled  = true;
    //       cameraControls.rotateSpeed    = 3;
    //       cameraControls.rotateHands    = 1;
    //       cameraControls.rotateFingers  = [2, 3];
    //
    //       cameraControls.zoomEnabled    = true;
    //       cameraControls.zoomSpeed      = 6;
    //       cameraControls.zoomHands      = 1;
    //       cameraControls.zoomFingers    = [4, 5];
    //       cameraControls.zoomMin        = 50;
    //       cameraControls.zoomMax        = 2000;
    //
    //       cameraControls.panEnabled     = true;
    //       cameraControls.panSpeed       = 2;
    //       cameraControls.panHands       = 2;
    //       cameraControls.panFingers     = [6, 12];
    //       cameraControls.panRightHanded = false; // for left-handed person
    //
    //       // world
    //       scene = new THREE.Scene();
    //
    //       // projector
    //       projector = new THREE.Projector();
    //
    //       // camera target coordinate system
    //       coords1 = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, 75, 0xcccccc);
    //       coords2 = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, 75, 0xcccccc);
    //       coords3 = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, 75, 0xcccccc);
    //       scene.add(coords1);
    //       scene.add(coords2);
    //       scene.add(coords3);
    //
    //       // world coordinate system (thin dashed helping lines)
    //       var lineGeometry = new THREE.Geometry();
    //       var vertArray = lineGeometry.vertices;
    //       vertArray.push(new THREE.Vector3(1000, 0, 0), origin, new THREE.Vector3(0, 1000, 0), origin, new THREE.Vector3(0, 0, 1000));
    //       lineGeometry.computeLineDistances();
    //       var lineMaterial = new THREE.LineDashedMaterial({color: 0xcccccc, dashSize: 1, gapSize: 2});
    //       var coords = new THREE.Line(lineGeometry, lineMaterial);
    //       scene.add(coords);
    //
    //       // cubes
    //       for (var i = 0; i < 20; i ++) {
    //         var geometry = new THREE.CubeGeometry(Math.random()*60, Math.random()*60, Math.random()*60);
    //         var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xefefef}));
    //         object.position.x = Math.random()* 300 - 150;
    //         object.position.y = Math.random()* 300 - 150;
    //         object.position.z = Math.random()* 200 - 100;
    //
    //         object.rotation.x = Math.random()*2*Math.PI;
    //         object.rotation.y = Math.random()*2*Math.PI;
    //         object.rotation.z = Math.random()*2*Math.PI;
    //
    //         object.receiveShadow = true;
    //
    //         // leap object controls
    //         // var objectControls = new control.THREE.LeapObjectControls(camera, object);
    //         //
    //         // objectControls.rotateEnabled  = true;
    //         // objectControls.rotateSpeed    = 3;
    //         // objectControls.rotateHands    = 1;
    //         // objectControls.rotateFingers  = [2, 3];
    //         //
    //         // objectControls.scaleEnabled   = true;
    //         // objectControls.scaleSpeed     = 3;
    //         // objectControls.scaleHands     = 1;
    //         // objectControls.scaleFingers   = [4, 5];
    //         //
    //         // objectControls.panEnabled     = true;
    //         // objectControls.panSpeed       = 3;
    //         // objectControls.panHands       = 2;
    //         // objectControls.panFingers     = [6, 12];
    //         // objectControls.panRightHanded = false; // for left-handed person
    //         //
    //         // scene.add(object);
    //         // objects.push(object);
    //         // objectsControls.push(objectControls);
    //       };
    //
    //       // light
    //       light = new THREE.PointLight(0xefefef);
    //       // light.position = camera.position;
    //       scene.add(light);
    //
    //       // listen to resize event
    //       window.addEventListener('resize', onWindowResize, false);
    //
    //       // render (if no leap motion controller is detected, then this call is needed in order to see the plot)
    //       scene_render();
    //     };
    //
    //     function changeControlsIndex() {
    //       if (lastControlsIndex == controlsIndex) {
    //         if (index != controlsIndex && controlsIndex > -2) {
    //           // new object or camera to control
    //           if (controlsIndex > -2) {
    //             if (index > -1) objects[index].material.color.setHex(0xefefef);
    //             index = controlsIndex;
    //             if (index > -1) objects[index].material.color.setHex(0xff0000);
    //           }
    //         };
    //       };
    //       lastControlsIndex = controlsIndex;
    //     };
    //
    //     function transform(tipPosition, w, h) {
    //       var width = 150;
    //       var height = 150;
    //       var minHeight = 100;
    //
    //       var ftx = tipPosition[0];
    //       var fty = tipPosition[1];
    //       ftx = (ftx > width ? width - 1 : (ftx < -width ? -width + 1 : ftx));
    //       fty = (fty > 2*height ? 2*height - 1 : (fty < minHeight ? minHeight + 1 : fty));
    //       var x = THREE.Math.mapLinear(ftx, -width, width, 0, w);
    //       var y = THREE.Math.mapLinear(fty, 2*height, minHeight, 0, h);
    //       return [x, y];
    //     };
    //
    //     function showCursor(frame) {
    //       var hl = frame.hands.length;
    //       var fl = frame.pointables.length;
    //
    //       if (hl == 1 && fl == 1) {
    //         var f = frame.pointables[0];
    //         var cont = $(renderer.domElement);
    //         var offset = cont.offset();
    //         var coords = transform(f.tipPosition, cont.width(), cont.height());
    //         $("#cursor").css('left', offset.left + coords[0] - (($("#cursor").width() - 1)/2 + 1));
    //         $("#cursor").css('top', offset.top + coords[1] - (($("#cursor").height() - 1)/2 + 1));
    //       } else {
    //         $("#cursor").css('left', -1000);
    //         $("#cursor").css('top', -1000);
    //       };
    //     };
    //
    //     function focusObject(frame) {
    //       var hl = frame.hands.length;
    //       var fl = frame.pointables.length;
    //
    //       if (hl == 1 && fl == 1) {
    //         var f = frame.pointables[0];
    //         var cont = $(renderer.domElement);
    //         var coords = transform(f.tipPosition, cont.width(), cont.height());
    //         var vpx = (coords[0]/cont.width())*2 - 1;
    //         var vpy = -(coords[1]/cont.height())*2 + 1;
    //         var vector = new THREE.Vector3(vpx, vpy, 0.5);
    //         projector.unprojectVector(vector, camera);
    //         var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    //         var intersects = raycaster.intersectObjects(objects);
    //         if (intersects.length > 0) {
    //           var i = 0;
    //           while(!intersects[i].object.visible) i++;
    //           var intersected = intersects[i];
    //           return objects.indexOf(intersected.object);
    //         } else {
    //           return -1;
    //         };
    //       };
    //
    //       return -2;
    //     };
    //
    //     function scene_render() {
    //       renderer.render(scene, camera);
    //     };
    //
    //     function onWindowResize() {
    //       camera.aspect = $(window).width()/$(window).height();
    //       camera.updateProjectionMatrix();
    //       renderer.setSize($(window).width(), $(window).height());
    //       scene_render();
    //     };
    //
    //     init();
    //     // leap loop
    //     LeapMotion.loop(function(frame) {
    //       // show cursor
    //       showCursor(frame);
    //
    //       // set correct camera control
    //       controlsIndex = focusObject(frame);
    //       if (index == -1) {
    //         cameraControls.update(frame);
    //       } else {
    //         objectsControls[index].update(frame);
    //       };
    //
    //       // custom modifications (here: show coordinate system always on target and light movement)
    //       coords1.position = cameraControls.target;
    //       coords2.position = cameraControls.target;
    //       coords3.position = cameraControls.target;
    //       light.position   = camera.position;
    //
    //       scene_render();
    //     });
    //
    //     // detect controls change
    //     setInterval(changeControlsIndex, 250);
    //     return (
    //         <div id="container"></div>
    //     );
    //   }
    // }

  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ModelApp;
