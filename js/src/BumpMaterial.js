'use strict';

var CustomShaders = require('./customShaders');
var Slide = require('./slide.js');


var mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


function BumpMaterial(options) {

    var customShaders = new CustomShaders();
    var customShaders2 = new CustomShaders();
    var customShaders3 = new CustomShaders();

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 0);

    this.renderer = options.renderer;
    this.texture = options.texture;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.outputShader = customShaders3.passShader;
    this.video = options.video;
    this.expand = true;

    var tLoader = new THREE.TextureLoader();


    var slides = [];
    for (var i = 0; i < 18; i++) {
        var index = i + 1;
        var slide = new Slide({
            url: '/img/' + index + '.jpg',
            callback: slide => slides.push(slide)
        });
    }
    for (var i = 0; i < 18; i++ ) {
        var slide = new Slide({
            url: '/img/logo-black.jpg',
            black: true,
            // callback: slide => slides.push(slide)
        });
        slides.push(slide);
    }

    if (!mobilecheck()) {
        var slide = new Slide({
            url: "/img/LUAR28.mp4",
            video: true,
            texture: this.video,
            callback: slide => slides.push(slide)
        })
        var slide = new Slide({
            url: "/img/LUAR12.mp4",
            video: true,
            texture: this.video,
            callback: slide => slides.push(slide)
        })
    }


    var currentSlide = slides[Math.floor(Math.random() * slides.length)];
    if (!currentSlide) currentSlide = {};
    currentSlide.show();
    this.texture = currentSlide.texture;

    this.mesh;
    this.logo = tLoader.load("img/logo-bump.jpg");
    this.logo.wrapS = this.logo.wrapT = THREE.RepeatWrapping;
    this.logo.minFilter = THREE.LinearMipMapNearestFilter;

    this.fbos = [];
    this.init = function() {

        this.fbos[0] = new FeedbackObject(customShaders.edgeShader);
        this.fbos[0].material.uniforms.texture.value = this.texture;
        this.fbos[0].material.uniforms.bump.value = this.logo;
        this.fbos[0].material.uniforms.aspect.value = currentSlide.a;

        for(var i = 0; i < this.fbos.length; i++){
          this.fbos[i].material.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: this.outputShader.uniforms,
            vertexShader: this.outputShader.vertexShader,
            fragmentShader: this.outputShader.fragmentShader,
        });
        var lastFBO = this.fbos[this.fbos.length-1];
        this.material.uniforms["texture"].value = lastFBO.renderTarget;
        this.material.uniforms["texture"].minFilter = this.material.uniforms["texture"].magFilter = THREE.LinearFilter;
        this.material.uniforms["resolution"].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        this.material.uniforms["mouse"].value = new THREE.Vector2(window.innerWidth, 0);

        this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 0);

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
        this.scene.add(this.mesh);
    }

    this.resize = function(w,h){
        for(var i = 0; i < this.fbos.length; i++){
            this.fbos[i].material.uniforms.resolution.value = new THREE.Vector2(w, h);
            this.fbos[i].resize(w,h);
        }
        this.material.uniforms["resolution"].value = new THREE.Vector2(w,h);

    }

    this.update = function(){
        for(var i = 1; i < this.fbos.length; i++){
            this.fbos[i].render(this.renderer, this.camera);
        }
    }
    this.expand = function(scl){
        this.frameDiff.mesh.scale.set(scl,scl,scl);
    }
    this.getNewFrame = function(){
        this.fbos[0].render(this.renderer, this.camera);
    }
    this.swapBuffers = function(){
        var a = this.swap.renderTarget;
        this.swap.renderTarget = this.fbos[0].renderTarget;
        this.fbos[0].renderTarget = a;
    }

    this.draw = function(time){

        for(var i = 0; i < this.fbos.length; i++){
            if(this.fbos[i].material.uniforms.time)
            this.fbos[i].material.uniforms.time.value = time;

          this.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(window.mouseX, window.mouseY);

        }
        this.material.uniforms.mouse.value = new THREE.Vector2(window.innerWidth, 0);

        if (currentSlide.expired()) {
            currentSlide = slides[Math.floor(Math.random() * slides.length)];
            currentSlide.show();
            this.fbos[0].material.uniforms.texture.value = this.texture = currentSlide.texture;
            this.fbos[0].material.uniforms.aspect.value = currentSlide.a;
        }

        if (currentSlide.video)
            this.texture.needsUpdate = true;
        this.update();

        this.getNewFrame();
        this.renderer.render(this.scene, this.camera);

    }
}

function FeedbackObject(SHADER) {
    this.scene = new THREE.Scene();
    this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat});
    this.shader = SHADER;
    this.material = new THREE.ShaderMaterial({
        uniforms: this.shader.uniforms,
        vertexShader: this.shader.vertexShader,
        fragmentShader: this.shader.fragmentShader
    });
    this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh);

    this.resize = function(w, h){
        this.renderTarget.setSize(w,h);
    }

    this.render = function(RENDERER, CAMERA){
        RENDERER.render(this.scene, CAMERA, this.renderTarget, true);
    }
}

module.exports = BumpMaterial;