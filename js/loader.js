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
var spin = document.getElementById("spin");
var callback;

function addLetters() {
  loadingEl.innerHTML += loadingArr[toAdd];
  if (toAdd < loadingArr.length -1) {
    toAdd++;
    setTimeout(addLetters, 200);
  }
}

function init(_callback) {

  addLetters();
  spinInterval();
  callback = _callback;
  setTimeout(function() { revealLoaded() }, 4000);

}


function spinInterval() {
  rotationNum += 10;
  spin.style['transform'] = "rotate("+rotationNum+"deg)";
  if (!loaded) setTimeout(spinInterval, 10);
}


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
    if (rotationNum >= (goTo - 1)) {
      setTimeout(function() {
        logo.classList.add('above');
      }, 1000);
      setTimeout(function() {
        if (callback) callback();
      }, 2000);
    } else {
      spin.style['transform'] = "rotate("+rotationNum+"deg)";
      setTimeout(slowRotation, 10);
    }
  }
}


function revealLoaded() {
  loaded = true;
  loadingEl.classList.add('hidden-text');
  setTimeout(function() {
    luarEl.classList.remove('hidden-text');
  }, 1000);
  slowRotation();
}

module.exports = {
  init: init
}
