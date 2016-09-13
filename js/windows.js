var parents = document.getElementsByClassName("window-parent");
var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth||e.clientWidth||g.clientWidth,
y = w.innerHeight||e.clientHeight||g.clientHeight;
var parentsArr = [];

for (var i = 0; i < parents.length; i++) {
  parentsArr[i] = {};
  parentsArr[i].el = parents[i];
  parentsArr[i].child = parents[i].childNodes[0].nextElementSibling;

  var leftVal = getRandom(0, x - parents[i].offsetWidth);
  var topVal = getRandom(0, y - parents[i].offsetHeight);

  parents[i].style.left = leftVal+'px';
  parents[i].style.top = topVal+'px';
}

function moveWindow(obj) {
  var leftVal = getRandom(0, x - obj.el.offsetWidth);
  var topVal = getRandom(0, y - obj.el.offsetHeight);
  obj.el.style.left = leftVal+'px';
  obj.el.style.top = topVal+'px';
  obj.child.classList.add('hidden');
  var rand = Math.floor(Math.random() * 20000) + 10000;
  setTimeout(function() {
    obj.child.classList.remove('hidden');
  }, 1000);
  setTimeout(function() {
    moveWindow(obj);
  }, rand);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function showImages() {
  for (var i = 0; i < parentsArr.length; i++) {
    reveal(parentsArr[i], i);
  }
}

function reveal(obj, i) {
  setTimeout(function() {
    obj.el.classList.remove('no-events')
    obj.child.classList.remove('hidden');
    moveWindow(obj);
  }, i * 1000);
}

module.exports = {
  showImages: showImages,
}