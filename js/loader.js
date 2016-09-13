var Windows = require('./windows');
var hand, windows = null;
var loadingArr = "loading...".split('');
var loadingEl = document.getElementById('loading');
var luarEl = document.getElementById('luar');
var loadingTimeout = false;
var loaded = false;
var toAdd = 0;
var started = false;
var rotationNum = 0;
var goTo = null;
Draggable.create(".window-parent", {type:"x,y", edgeResistance:0.65, bounds:"#main", throwProps:true});
var spin = document.getElementById("spin");

function addLetters() {
  loadingEl.innerHTML += loadingArr[toAdd];
  if (toAdd < loadingArr.length -1) {
    toAdd++;
    setTimeout(addLetters, 200);
  }
}

addLetters();

function spinInterval() {
  rotationNum += 10;
  spin.style['transform'] = "rotate("+rotationNum+"deg)";
  if (!loaded) setTimeout(spinInterval, 1);
}

spinInterval();

function slowRotation() {
  if(!goTo) {
    if (rotationNum > 0) {
      goTo = Math.ceil(rotationNum/360) * 360;
    } else if (rotationNum < 0) {
      goTo = Math.floor(rotationNum/360) * 360;
    } else {
      goTo = 360;
    }    
  }
  if (rotationNum != goTo) {
    var change = (goTo - rotationNum) * 0.05;
    rotationNum += change;

    if (rotationNum >= goTo -1.5) {
      logo.classList = 'above';
      main.classList = '';
      setTimeout(Windows.showImages, 500);
    } else {
      spin.style['transform'] = "rotate("+rotationNum+"deg)";
      setTimeout(slowRotation, 10);
    }
  }
}

setTimeout(function() { revealLoaded() }, 4000);

function revealLoaded() {
  loaded = true;
  loadingEl.classList = ('hidden-text');
  luarEl.classList = ('');
  slowRotation();
}

module.exports = {
  logo: logo
}
