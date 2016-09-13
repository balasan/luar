
function Slide(options) {

  this.black = options.black;

  this.url = options.url;

  this.loader = new THREE.TextureLoader();
  this.texture = this.loader.load(this.url, () => {
    this.w = this.texture.image.width;
    this.h = this.texture.image.height;
    this.a = this.w / this.h;
  });

}

Slide.prototype.show = function() {
  var now = new Date();
  this.startTime = now.getTime();

  var r = Math.random();
  if (r > .95)
    this.time = r * 2000;
  else
    this.time = Math.random() * 80;

}

Slide.prototype.expired = function() {
  var now = new Date();
  if ( this.startTime + this.time < now.getTime() ) return true;
  return false;
}

module.exports = Slide;