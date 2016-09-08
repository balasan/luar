vec2 doModel(vec3 p);

#pragma glslify: dxdy = require('./chunks/dxdy_r.glsl')
#pragma glslify: phongSpec = require(glsl-specular-phong)
#pragma glslify: blinnPhong = require(glsl-specular-blinn-phong)


uniform sampler2D texture;
uniform sampler2D texture2;
uniform vec2 mouse;
uniform float time;
uniform float lightWidth;
uniform float lightBrightness;
varying vec2 vUv;
uniform vec2 resolution;


void main() {

  float step = 3.0;
  float mult = 0.01;
  vec3 col = vec3(1.0, 1.0, 1.0);

  vec2 dxdy = vec2(dxdy(texture, vUv, resolution, step, mult));
  float dX = dxdy.x;
  float dY = dxdy.y;

  vec3 lightDir = vec3( vec2( mouse.x/resolution.x, 1.0-mouse.y/resolution.y)-(gl_FragCoord.xy / vec2(resolution.x,resolution.y)), lightWidth );
  lightDir.x *= resolution.x/resolution.y;

  float D = length(lightDir);

  vec3 N = normalize(vec3(dX,dY,1.0/50.0));
  vec3 L = normalize(lightDir);
  vec3 H = L;
  vec3 viewDirection = -H;
  // vec3 viewDirection = vec3(0.0, 0.0, -1.0);

  vec3 offsetNormal = N - dot(N, vec3(0.0, 0.0, 1.0)) * vec3(0.0, 0.0, 1.0);
  vec2 rOffset = normalize(offsetNormal.xy) * length(offsetNormal) * .3;
  vec4 diffuseColor = texture2D(texture2, vUv + rOffset);

  vec4 lightColor = texture2D(texture2, vUv + rOffset)*0.7 + 0.4*texture2D(texture, vUv);
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

  gl_FragColor = vec4(col, 1.0);

}