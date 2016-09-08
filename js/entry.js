
window.THREE = require('three/three.min.js');

var GlView = require('./src/GlView');

document.addEventListener('DOMContentLoaded', function(){

  glView = new GlView();
  glView.init();

})
