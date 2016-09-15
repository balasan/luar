'use strict';

var BumpMaterial = require('./BumpMaterial');
var CanvasTexture = require('./CanvasTexture');
var Stats = require('stats-js');

var GlView = function() {

  var scene, camera, light, renderer;
  var mouse = new THREE.Vector2(), center;
  window.mouse = mouse;
  var canvasTexture;
  var videoRenderTarget;
  var fbMaterial;
  var stats;
  var container;
  var fbTexture;
  var mouseX = 0, mouseY = 0;
  var time = 0;

  var captureFrame = 0;
  var range = 100.0;
  var video, texture;
  var expand = true;

  this.init = function() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    stats = new Stats();
    stats.setMode(0);

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';


    var tLoader = new THREE.TextureLoader();
    fbTexture = tLoader.load("img/logo-black.jpg");

    renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: false/*, alpha: true*/});
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    fbMaterial = new BumpMaterial({
      renderer: renderer,
      texture: fbTexture,
      video: videoRenderTarget
    });
    fbMaterial.init();


    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'resize', resize, false);

    resize();
  }

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    fbMaterial.resize(w, h);
  }

  this.animate = () => {
    requestAnimationFrame( this.animate );
    render();
  }

  function render() {

    stats.update();
    time+=0.01;
    fbTexture.needsUpdate = true;
    fbMaterial.draw(time);
  }

  function onDocumentMouseMove( event ) {

    window.mouse.x = ( event.clientX - window.innerWidth / 2 ) * 8;
    window.mouse.y = ( event.clientY - window.innerHeight / 2 ) * 8;

    window.unMappedMouseX = (event.clientX );
    window.unMappedMouseY = (event.clientY );

    window.mouseX = map(unMappedMouseX, window.innerWidth, -1.0,1.0);
    window.mouseY = map(unMappedMouseY, window.innerHeight, -1.0,1.0);
  }

  function map(value,max,minrange,maxrange) {
      return ((max-value)/(max))*(maxrange-minrange)+minrange;
  }
}

module.exports = GlView;
