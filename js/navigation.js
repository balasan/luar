var hand, logo, main, windows = null;

logo = document.getElementById("logo");
main = document.getElementById("main");
windows = document.getElementsByClassName("window");
var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth||e.clientWidth||g.clientWidth,
y = w.innerHeight||e.clientHeight||g.clientHeight;

for (var i = 0; i < windows.length; i++) {
  var leftRandom = getRandom(0, x);
  var topRandom = getRandom(0, y);
  if (topRandom + windows[i].offsetHeight > y) {
    var difY = (topRandom + windows[i].offsetHeight) - y;
    topRandom -= difY;
  }
  if (leftRandom + windows[i].offsetWidth > x) {
    var difX = (leftRandom + windows[i].offsetWidth) - x;
    leftRandom -= difX;
  } 
  windows[i].style.left = leftRandom + 'px';
  windows[i].style.top = topRandom + 'px';
}

function getRandom(min, max) {
  var num = Math.random() * (max - min) + min;
  return num;
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
    window.classList.remove('hidden');
  }, i * 1000);
}