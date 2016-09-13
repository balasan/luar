window.THREE = require('three/three.min.js');

var GlView = require('./src/GlView');

document.addEventListener('DOMContentLoaded', function() {

  var Loader = require('./loader');
  var Windows = require('./windows');

  logo = document.getElementById("logo");
  main = document.getElementById("main");

  //glView = new GlView();
  //glView.init();

  logo.onclick = function() {
    logo.classList = 'above';
    main.classList = '';

    setTimeout(function() {
      setTimeout(Windows.showWindows, 1000);
    }, 500);
}

})
