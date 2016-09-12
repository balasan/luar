'use strict';

var CustomShaders = function(){

	var defualtUniforms = {
		"texture"  : { type: "t", value: null },
		"mouse"  : { type: "v2", value: null },
		"resolution"  : { type: "v2", value: null },
		"time"  : { type: "f", value: null }
	}

  this.edgeShader = {
    uniforms: THREE.UniformsUtils.merge( [
      defualtUniforms,
      {
        "bump"  : { type: "t", value: null },
      }
    ]),    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/edge.frag')
  },

	this.passShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/pass.frag')
  },


	this.colorShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/color.frag')
	},


	this.flowShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/flow.frag')
	},


	this.blurShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms,
      {
        "intensity"  : { type: "f", value: 1.0 }
      }
    ]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/blur.frag')
	},


	this.sharpenShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/sharpen.frag')
	},


	this.diffShader = {
		uniforms: THREE.UniformsUtils.merge( [
			defualtUniforms,
			{
				"texture2"  : { type: "t", value: null },
				"texture3"  : { type: "t", value: null }
			}
		]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/diff.frag')
  },


	this.diffShader2 = {
		uniforms: THREE.UniformsUtils.merge( [
			defualtUniforms,
			{
				"texture2"  : { type: "t", value: null },
				"texture3"  : { type: "t", value: null }
			}
		] ),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/diff2.frag')
	},


	this.reposShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/repos.frag')
	}


	this.alphaShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/alpha.frag')
	},


	this.warpShader = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/warp.frag')
	}

	this.warp2 = {
		uniforms: THREE.UniformsUtils.merge([defualtUniforms]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/warp2.frag')
	}


	this.bumpShader =  {
		uniforms: THREE.UniformsUtils.merge( [
			defualtUniforms,
			{
				"lightWidth"  : { type: "f", value: 9.5 },
				"lightBrightness"  : { type: "f", value: 1.5 }
			}
		]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/bump.frag')
	};


	this.bumpDistortShader =  {
		uniforms: THREE.UniformsUtils.merge( [
			defualtUniforms,
			{
				"texture2"  : { type: "t", value: null },
				"lightWidth"  : { type: "f", value: 9.5 },
				"lightBrightness"  : { type: "f", value: 1.0 }
			}
		]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/bump-distort.frag')
	};

  this.bumpBumpShader =  {
    uniforms: THREE.UniformsUtils.merge( [
      defualtUniforms,
      {
        "texture2"  : { type: "t", value: null },
        "lightWidth"  : { type: "f", value: 9.5 },
        "lightBrightness"  : { type: "f", value: 1.0 }
      }
    ]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/bump-bump.frag')
  };

	this.drawingBlurShader = {
		uniforms: THREE.UniformsUtils.merge( [
			defualtUniforms,
			{
				"drawingSize": { type: "f", value: .3 },
				"intensity": { type: "f", value: 1.0 },
				"fade": { type: "f", value: .001 }
			}
		]),
    vertexShader : require('./shaders/default.vert'),
    fragmentShader : require('./shaders/drawingblur.frag')
	};
}



module.exports = CustomShaders;
