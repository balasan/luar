window.THREE = require('three/three.min.js');

var GlView = require('./src/GlView');

document.addEventListener('DOMContentLoaded', function(){

  var Loader = require('./loader');
  // var Windows = require('./windows');
  glView = new GlView();

  Loader.init( () => {
    glView.init();
  })

  var audio = new Audio();
  audio.src = '/img/processthatbitch.mp3';
  audio.play();

  logo = document.getElementById("logo");
  main = document.getElementById("main");


  logo.onclick = function() {
    logo.classList = 'above';
    main.classList = '';

    // setTimeout(function() {
    //   setTimeout(Windows.showWindows, 1000);
    // }, 500);
}

})
