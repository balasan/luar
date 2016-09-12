var parents = document.getElementsByClassName("window-parent");
var windows = document.getElementsByClassName("window");

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth||e.clientWidth||g.clientWidth,
y = w.innerHeight||e.clientHeight||g.clientHeight;


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

module.exports = {
  showWindows: showWindows,
}