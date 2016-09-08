uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
varying vec2 vUv;
uniform vec2 mouse;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(( (q.z + (q.w - q.y) / (6.0 * d + e))) ), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float rand(vec2 p) {
  vec2 n = floor(p/2.0);
  return fract(cos(dot(n,vec2(48.233,39.645)))*375.42); 
}

float srand(vec2 p) {
  vec2 f = floor(p);
  vec2 s = smoothstep(vec2(0.0),vec2(1.0),fract(p));

  return mix(mix(rand(f),rand(f+vec2(1.0,0.0)),s.x),
         mix(rand(f+vec2(0.0,1.0)),rand(f+vec2(1.0,1.0)),s.x),s.y);
}

float noise(vec2 p) {
  float total = srand(p/128.0)*0.5+srand(p/64.0)*0.35+srand(p/32.0)*0.1+srand(p/16.0)*0.05;
  return total;
}

void main() {

  float t = time;
  vec2 warp = vec2(noise(gl_FragCoord.xy+t)+noise(gl_FragCoord.xy*0.5+t*3.5),
                     noise(gl_FragCoord.xy+128.0-t)+noise(gl_FragCoord.xy*0.6-t*2.5))*0.5-0.25;
  //    vec2 uv = gl_FragCoord.xy / resolution.xy+warp;
  vec2 mW = warp*mouse;
  vec2 uv = vUv+mW*sin(time);
  vec4 look = gl_FragColor = texture2D(texture,uv);
  vec2 offs = vec2(look.y-look.x,look.w-look.z)*vec2(mouse.x*uv.x/100.0, mouse.y*uv.y/100.0);
  vec2 coord = offs+vUv;
  vec4 repos = texture2D(texture, coord);

  gl_FragColor = texture2D(texture,uv);
  //    gl_FragColor = repos;
  vec4 tex0 = repos;
  vec3 hsv = rgb2hsv(tex0.rgb);

  hsv.r += 0.01;
  hsv.r = mod(hsv.r, 1.0);
  hsv.g *= 1.001;
  // hsv.g = mod(hsv.g, 1.0);
  vec3 rgb = hsv2rgb(hsv);

  gl_FragColor = vec4(rgb,1.0);

}