window.THREE = require('three/three.min.js');

var GlView = require('./src/GlView.js');

document.addEventListener('DOMContentLoaded', function() {

  var Loader = require('./loader');
  // var Windows = require('./windows');
  var glView = new GlView();

  Loader.init(() => {
    glView.init();
    logo.classList.add('above');
    main.classList.remove('below');
  });

  var audio = new Audio();
  audio.src = '/img/processthatbitch.mp3';
  audio.loop = 'true';
  audio.play();

  document.addEventListener('touchstart', () => {
    audio.play();
  })

  var logo = document.getElementById("logo");
  var main = document.getElementById("main");

})
