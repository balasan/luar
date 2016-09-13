'use strict';

var CustomShaders = require('./customShaders');

function BumpMaterial(options){

    var customShaders = new CustomShaders();
    var customShaders2 = new CustomShaders();
    var customShaders3 = new CustomShaders();

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
    this.camera.position.set(0,0,0);

    this.renderer = options.renderer;
    this.texture = options.texture;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.outputShader = customShaders3.passShader;
    this.video = options.video;
    this.expand = true;

    this.mesh;

    var tLoader = new THREE.TextureLoader();
    // fbTexture = tLoader.load("/img/DERMA-LOGO-LUAR.jpg");
    this.logo = tLoader.load("img/logo-bump.jpg");
    this.logo.wrapS = this.logo.wrapT = THREE.RepeatWrapping;
    // this.logo.magFilter = 
    this.logo.minFilter = THREE.LinearMipMapNearestFilter;

    this.fbos = [];
    this.init = function() {

        // this.fbos[0] = new FeedbackObject(customShaders.bumpBumpShader);
        // this.fbos[0].material.uniforms.texture2.value = this.texture;
        // this.fbos[0].material.uniforms.texture.value = this.logo;

        this.fbos[0] = new FeedbackObject(customShaders.edgeShader);
        this.fbos[0].material.uniforms.texture.value = this.texture;
        this.fbos[0].material.uniforms.bump.value = this.logo;


        // this.fbos[1] = new FeedbackObject(customShaders.blurShader);
        // this.fbos[1].material.uniforms.texture.value = this.fbos[0].renderTarget;


        // this.frameDiff = new FeedbackObject(customShaders.diffShader);
        // this.frameDiff.material.uniforms.texture.value  = this.fbos[0].renderTarget;
        // this.frameDiff.material.uniforms.texture2.value = this.fbos[1].renderTarget;
        // this.frameDiff.material.uniforms.texture3.value = this.texture;
        // this.fbos[2] = this.frameDiff;


        // this.fbos[3] = new FeedbackObject(customShaders2.colorShader);
        // this.fbos[3].material.uniforms.texture.value = this.frameDiff.renderTarget;
        // this.swap = this.fbos[3];


        // this.fbos[4] = new FeedbackObject(customShaders2.blurShader);
        // this.fbos[4].material.uniforms.texture.value = this.fbos[3].renderTarget;


        // this.fbo4 = new FeedbackObject(customShaders.bumpBumpShader);
        // this.fbo4.material.uniforms.texture.value = this.fbos[4].renderTarget;
        // this.fbo4.material.uniforms.texture2.value = this.video;
        // this.fbo4.material.uniforms["lightBrightness"].value = 1.0;


        // this.fbo4.material.uniforms["mouse"].value = new THREE.Vector2(window.innerWidth, 0);
        // this.fbo4.material.uniforms["resolution"].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        // this.fbos[5]=this.fbo4;


        for(var i = 0; i < this.fbos.length; i++){
          this.fbos[i].material.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        }

        // this.fbos[0].material.uniforms.texture.value = this.frameDiff.renderTarget; 

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
        this.mesh.position.set(0,0,0);
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

        // this.fbos[5].material.uniforms.mouse.value = new THREE.Vector2(
        //     window.innerWidth * ( 0+.5 ), window.innerWidth * (.5 + .5)
        // );

        this.texture.needsUpdate = true;
        this.update();

        // if(this.expand){
        // this.expand(1.002);
        // }

        this.getNewFrame();
        this.renderer.render(this.scene, this.camera);

        // this.swapBuffers();
        // capturer.capture( fbRenderer.domElement );
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