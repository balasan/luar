
function Slide(options) {

  this.black = options.black;
  this.url = options.url;

  if (options.video) {
    this.video = document.createElement("video");
    this.video.src = options.url;
    this.video.loop = true;
    this.video.muted = true;
    this.video.play();

    this.texture = new THREE.Texture(this.video);
    this.texture.needsUpdate = true;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.a = 16 / 9;
    this.video.oncanplay = () => {
      if (options.callback) options.callback(this);
    }
  }
  else {
    this.loader = new THREE.TextureLoader();
    this.texture = this.loader.load(this.url, () => {
      this.w = this.texture.image.width;
      this.h = this.texture.image.height;
      this.a = this.w / this.h;
      if (options.callback) options.callback(this);
    });
  }

}

Slide.prototype.show = function() {
  var now = new Date();
  this.startTime = now.getTime();

  var r = Math.random();
  if (r > .95 || this.video && r > .8)
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