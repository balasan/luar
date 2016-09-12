var hand, logo, main, windows = null;
var self = this;
logo = document.getElementById("logo");
main = document.getElementById("main");
windows = document.getElementsByClassName("window");
parents = document.getElementsByClassName("window-parent");
var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth||e.clientWidth||g.clientWidth,
y = w.innerHeight||e.clientHeight||g.clientHeight;
var loadingArr = "loading...".split('');
var loadingEl = document.getElementById('loading');
var luarEl = document.getElementById('luar');
var localTotal = this.total.value;
var loadingTimeout = false;
var loaded = false;
var toAdd = 0;
var started = false;

Draggable.create(".window-parent", {type:"x,y", edgeResistance:0.65, bounds:"#main", throwProps:true});

var spin = document.getElementById("spin");
var ani = TweenMax.to(spin, 1, {rotation: 360, ease:Linear.easeNone, repeat:-1}, {timeScale:0});

setTimeout(function() {
  loadingTimeout = true;
  ani.pause();
  revealLoaded();
}, 4000);

if (localTotal >= 18) {
  loaded = true;
  revealLoaded();
}

this.total.registerListener(function(val) {
  if (val >= 18) {
    loaded = true;
    revealLoaded();
  }
});

function revealLoaded() {
  if (loaded && loadingTimeout) {
    loadingEl.classList = ('hidden-text');
    luarEl.classList = ('');
  }
}

for (var i = 0; i < parents.length; i++) {
  var leftRandom = getRandom(0, x);
  var topRandom = getRandom(0, y);
  if (topRandom + parents[i].offsetHeight > y) {
    var difY = (topRandom + parents[i].offsetHeight) - y;
    topRandom -= difY;
  }
  if (leftRandom + parents[i].offsetWidth > x) {
    var difX = (leftRandom + parents[i].offsetWidth) - x;
    leftRandom -= difX;
  } 
  parents[i].style.left = leftRandom + 'px';
  parents[i].style.top = topRandom + 'px';
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

logo.onclick = function() {
  logo.classList = 'above';
  main.classList = '';

  setTimeout(function() {
    setTimeout(showWindows, 1000);
  }, 500);
}

function showWindows() {
  console.log('showWindows');
  for (var i = 0; i < windows.length; i++) {
    reveal(windows[i], i);
  }
}

function reveal(window, i) {
  setTimeout(function() {
    window.parentNode.classList.remove('no-events')
    window.classList.remove('hidden');
  }, i * 1000);
}