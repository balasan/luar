var loadingArr = "loading...".split('');
var luarArr = "LUAR".split('');
var loadingEl = document.getElementById('loading');
var luarEl = document.getElementById('luar');
var logo = document.getElementById('logo');
var loadingTimeout = false;
var loaded = false;
var toAdd = 0;
var started = false;
var rotationNum = 0;
var goTo = null;
var spin = document.getElementById("spin");
var callback;
var doFlicker = true;

function addLetters(array, el) {
  el.innerHTML += array[toAdd];
  if (toAdd < array.length - 1) {
    toAdd++;
    setTimeout(() => addLetters(array, el), 50);
  }
  else {
    toAdd = 0;
    flicker();
  }
}

function flicker() {
  var r = Math.random();
  if (r > .90) {
    loadingEl.style.visibility = 'hidden';
    // luarEl.style.visibility = 'hidden';
  }
  else {
    loadingEl.style.visibility = 'visible';
    // luarEl.style.visibility = 'visible';
  }
  if (doFlicker) setTimeout(flicker, 30);
}

function init(_callback) {
  addLetters(loadingArr, loadingEl);
  spinInterval();
  callback = _callback;
  setTimeout(function() { revealLoaded() }, 4000);
}


function spinInterval() {
  rotationNum += 8;
  spin.style['transform'] = "rotate("+rotationNum+"deg)";
  if (!loaded) setTimeout(spinInterval, 10);
}


function slowRotation() {
  logo.classList.add('ready');
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
    var change = (goTo - rotationNum) * 0.040;
    rotationNum += change;
    if (rotationNum >= (goTo - 1)) {
      setTimeout(function() {
        // logo.classList.add('above');
      }, 1000);
      setTimeout(function() {
        doFlicker = false;
        if (callback) callback();
      }, 1500);
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
    // addLetters(luarArr, luarEl);
  }, 1000);
  slowRotation();
}

module.exports = {
  init: init
}
