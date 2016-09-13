
var total = {
  valueInternal: 0,
  valueListener: function(val) {},
  set value(val) {
    this.valueInternal = val;
    this.valueListener(val);
  },
  get value() {
    return this.valueInternal;
  },
  registerListener: function(listener) {
    this.valueListener = listener;
  }
}

window.count = function() {
  total.value++;
}

var hand, windows = null;
var loadingArr = "loading...".split('');
var loadingEl = document.getElementById('loading');
var luarEl = document.getElementById('luar');
var localTotal = total.value;
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

total.registerListener(function(val) {
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

//export objects we need to use
module.exports = {
  logo: logo
}
