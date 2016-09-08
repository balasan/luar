vec2 doModel(vec3 p);

#pragma glslify: dxdy = require('./chunks/dxdy_rgb.glsl')
#pragma glslify: phongSpec = require(glsl-specular-phong)
#pragma glslify: blinnPhong = require(glsl-specular-blinn-phong)

#pragma glslify: raytrace = require('glsl-raytrace', map = doModel, steps = 10)
#pragma glslify: normal = require('glsl-sdf-normal', map = doModel)
#pragma glslify: camera = require('glsl-turntable-camera')
// #pragma glslify: smin = require(glsl-smooth-min)
#pragma glslify: combine = require('glsl-combine-smooth')
// #pragma glslify: rotate = require('glsl-sdf-ops/rotate-translate')

uniform sampler2D texture;
uniform sampler2D texture2;
uniform vec2 mouse;
uniform float time;
uniform float lightWidth;
uniform float lightBrightness;
varying vec2 vUv;
uniform vec2 resolution;

vec2 doModel(vec3 p) {

  float step = 3.0;
  float mult = 0.03;

  float h = texture2D(texture, vUv).r + texture2D(texture, vUv).g + texture2D(texture, vUv).b;

  h = h/3.0;

  vec2 dxdy = vec2(dxdy(texture, vUv, resolution, step, mult));
  float dX = dxdy.x;
  float dY = dxdy.y;

  vec3 N = normalize(vec3(dX,dY,1.0/30.0));
  // vec3 N = normalize(vec3(0.0,0.0,1.0));

  vec4 n = normalize(vec4(N, h));

  float plane = dot(p,n.xyz) + n.w;

  p.z += 0.1 * 1.0 / (h - 0.5);

  p.x += mouse.x * 3.5;
  p.y += -mouse.y * 3.5 * resolution.y/resolution.x;

  // p.x = mod(p.x, 0.2) - 0.1;
  // p.y = mod(p.y, 0.2) - 0.1;

  float r = 0.01 * 1.0 / (h - 0.5);
  float id = 0.0;
  float sphere  = length(p) - r;

  // return vec2(sphere, 0.0);
  return vec2(combine(plane, sphere, .8), 0.0);
}

void main() {

  float step = 3.0;
  float mult = 0.01;
  vec3 col = vec3(1.0, 1.0, 1.0);

  // vec2 dxdy = vec2(dxdy(texture, vUv, resolution, step, mult));
  // float dX = dxdy.x;
  // float dY = dxdy.y;

  vec3 ro, rd;


  float rotation = 0.0;
  float height   = 0.0;
  float dist     = 4.0;
  camera(rotation, height, dist, resolution.xy, ro, rd);

  vec2 t = raytrace(ro, rd);
  if (t.x > -0.5) {
    vec3 pos = ro + rd * t.x;
    vec3 nor = normal(pos);

    vec3 lightDir = vec3( vec2( -mouse.x+0.5, 0.5+mouse.y)-(gl_FragCoord.xy / vec2(resolution.x,resolution.y)), lightWidth );
    lightDir.x *= resolution.x/resolution.y;

    lightDir = vec3( 0.1, -0.7, lightWidth/2.0);


    float D = length(lightDir);

    // vec3 N = normalize(vec3(dX,dY,1.0/50.0));
    vec3 N = nor;
    vec3 L = normalize(lightDir);
    vec3 H = L;
    // vec3 viewDirection = -H;
    vec3 viewDirection = vec3(0.0, 0.0, -1.0);
    // vec2 newUv = 0.22*pos.xy;

    // newUv.x *= resolution.y/resolution.x;
    // newUv += vec2(0.5, 0.5);
    vec2 newUv = vUv;


    vec3 offsetNormal = -N + dot(N, viewDirection) * viewDirection;
    vec2 rOffset = normalize(offsetNormal.xy) * length(offsetNormal) * .08;
    // vec2 rOffset = vec2(0.0, 0.0);
    vec4 diffuseColor = texture2D(texture2, newUv + rOffset);

    vec4 lightColor = texture2D(texture2, newUv + rOffset)*0.7 + 0.4*texture2D(texture, newUv + rOffset);
    vec4 ambientColor = vec4(vec3(lightColor.rgb*lightBrightness),0.5);

    vec3 diffuse = (lightColor.rgb * lightColor.a) * max(dot(N, L), 0.0);
    vec3 ambient = ambientColor.rgb * ambientColor.a;

    float shin = 1000.1;
    float sf = blinnPhong(lightDir, viewDirection, N, shin);
    // float sf = phongSpec(lightDir, viewDirection, N, shin);

    vec3 falloff = vec3(1.0,3.0,20.5);
    float attenuation = 1.0 / (falloff.x + (falloff.y*D) + (falloff.z * D * D) );

    vec3 intensity =  ambient+( diffuse+sf ) * attenuation;
    vec3 finalColor = (diffuseColor.rgb * intensity);

    col = ambient+( finalColor+sf * 1.0 );


  }




  gl_FragColor = vec4(col, 1.0);

}