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
var rotationNum = 0;
var addBy = 10;
var spin = document.getElementById("spin");
Draggable.create(".window-parent", {type:"x,y", edgeResistance:0.65, bounds:"#main", throwProps:true});

function addLetters() {
  loadingEl.innerHTML += loadingArr[toAdd];
  if (toAdd < loadingArr.length -1) {
    toAdd++;
    setTimeout(addLetters, 200);
  }
}

addLetters();

function spinInterval() {
  rotationNum+=addBy;
  spin.style['transform'] = "rotate("+rotationNum+"deg)";
  if (true) setTimeout(spinInterval, 10);
}

spinInterval();

function slowRotation() {
 //toGoTo = Math.round(value / rotationNum) * rotationNum
  if (addBy > 0) {
    addBy -= 1;
    setTimeout(slowRotation, 300);
  } else {
    logo.classList = 'above';
    main.classList = '';
    setTimeout(showWindows, 1500);
  }
}

setTimeout(function() {
  loadingTimeout = true;
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
    slowRotation();
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

// logo.onclick = function() {
//   logo.classList = 'above';
//   main.classList = '';

//   setTimeout(function() {
//     setTimeout(showWindows, 1000);
//   }, 500);
// }

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