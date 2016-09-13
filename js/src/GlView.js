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
  // var capturer = new CCapture( { format: 'webm', workersPath: 'js/' } );
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

    // document.body.appendChild( stats.domElement );

    // canvasTexture = new CanvasTexture();
    // canvasTexture.update(.5);
    // fbTexture = canvasTexture.texture;

    var tLoader = new THREE.TextureLoader();
    // fbTexture = tLoader.load("/img/DERMA-LOGO-LUAR.jpg");
    fbTexture = tLoader.load("img/BODYBTWO-1024.jpg");

    renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: false/*, alpha: true*/});
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // initVideo();

    fbMaterial = new BumpMaterial({
      renderer: renderer,
      texture: fbTexture,
      video: videoRenderTarget
    });
    fbMaterial.init();


    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'resize', resize, false);
    // window.onresize = resize;

    resize();
    animate();
  }

  function initVideo(){

    video = document.createElement("video");
    video.src = "img/LUAR28.mp4";
    video.loop = true;
    video.muted = true;
    video.play();
    texture = new THREE.Texture(video);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000)
    camera.position.set(0,0,10);
    camera.lookAt( scene.position );
    var material = new THREE.MeshBasicMaterial({
      map: texture,
    })
    var geometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight, 10, 10);
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    videoRenderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

  }

  function resize() {

    var w = window.innerWidth;
    var h = window.innerHeight;

    var windowAspect = w/h;
    var videoAspect = 16/9;

    // if (windowAspect < videoAspect) {
    //   texture.repeat.x = windowAspect/videoAspect;
    //   texture.offset.x = (1 - windowAspect/videoAspect) * 1/2;
    //   texture.repeat.y = 1
    //   texture.offset.y = 0
    // }
    // else{
    //   texture.repeat.y = videoAspect/windowAspect;
    //   texture.offset.y = (1 - videoAspect/windowAspect) * 1/2;
    //   texture.repeat.x = 1
    //   texture.offset.x = 0
    // }

    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize( window.innerWidth, window.innerHeight );

    fbMaterial.resize(w,h);
    // videoRenderTarget.setSize(w,h);
    // canvasTexture.resize();

  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {

    stats.update();
    time+=0.01;
    // if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
    //   texture.needsUpdate = true;
    // }
    // renderer.render(scene, camera);
    // canvasTexture.update(time);
    fbTexture.needsUpdate = true;

    // renderer.render(scene, camera, videoRenderTarget, true);
    // videoRenderTarget.needsUpdate = true;
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
