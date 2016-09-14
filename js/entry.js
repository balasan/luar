window.THREE = require('three/three.min.js');

var GlView = require('./src/GlView.js');
require('./../css/style.css');
require('./../css/font.css');

document.addEventListener('DOMContentLoaded', function() {

  var Loader = require('./src/loader');
  var glView = new GlView();
  var logo = document.getElementById('logo');
  var main = document.getElementById('main');
  glView.init();

  Loader.init(() => {
    glView.animate();
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
})
