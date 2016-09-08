'use strict';

var CanvasTexture = function(){

  var canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  this.texture = new THREE.Texture(canvas);
  this.texture.needsUpdate = true;

  var h = window.innerHeight;
  var w = window.innerWidth;
  var lineWidth = 0.5;

  this.resize = function(){
    h = window.innerHeight;
    w = window.innerWidth;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  this.update = function(time) {
    many(time);
  }

  function many(time){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var wy = canvas.width;
    var hy = 50;
    var wx = 50;
    var hx = canvas.height;
    var amp = 75;
    var distX = 3;
    var distY = 3;
    var alpha = 1.0;
    var lineWidth = 0.5;
    for(var j = -canvas.height; j < canvas.height*2; j+=distY) {
      var r = Math.floor(map(0.5+0.5*Math.cos(time*4/3), 1, 0, 255));
      var g = Math.floor(map(j, h, 0, 255));
      var b = Math.floor(map(0.5+0.5*Math.sin(time/2), 1, 0, 255));
      // b = g = r;
      var color = "rgba("+r+","+g+", "+b+", "+alpha+")";
      bezierY(0,j, canvas.width, j,  color /*hslaColor(j/6, 100, 50, alpha)*/);
    }
    for(var i = -canvas.width; i < canvas.width*2; i+=distX){
      var r = Math.floor(map(i, w, 0, 255));
      var g = Math.floor(map(0.5+0.5*Math.sin(time), 1, 0, 255));
      var b = Math.floor(map(0.5+0.5*Math.cos(time*3/2), 1, 0, 255));
      // b = g = r;
      var color = "rgba("+r+","+g+", "+b+", "+alpha+")";
      bezierX(i, 0, i, canvas.height, color /*hslaColor(i/6, 100, 50, alpha)*/);
    }
    //ctx.rotate(Math.PI/1000);
    // document.body.appendChild(canvas);
  }



  function bezierX(x1, y1, x2, y2, hue){

      ctx.beginPath();

     // ctx.moveTo(x1+(0.5+ 0.5*Math.sin(time)*canvas.width), y1);
      //ctx.lineTo(x2+(0.5+ 0.5*Math.sin(time)*canvas.width), y2);
      ctx.moveTo(x1/*+Math.cos(time/50)*canvas.width*/, y1);
      ctx.lineTo(x2/*-Math.sin(time/50)*canvas.width*/, y2);

      ctx.lineWidth = lineWidth;

      // line color
      ctx.strokeStyle = hue;
      ctx.fillStyle = hue;
      ctx.stroke();
  }
  function bezierY(x1, y1, x2, y2, hue){
      ctx.beginPath();

      ctx.moveTo(x1, y1/*-Math.cos(time/40)*canvas.height*/);
      ctx.lineTo(x2, y2/*+Math.sin(time/40)*canvas.height*/);

      ctx.lineWidth = lineWidth;

      // line color
      ctx.strokeStyle = hue;
      ctx.stroke();
  }
  function hslaColor(h,s,l,a) {
      return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }
  function map(value,max,minrange,maxrange) {
      return ((max-value)/(max))*(maxrange-minrange)+minrange;
  }
}

module.exports = CanvasTexture;