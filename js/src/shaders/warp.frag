uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
varying vec2 vUv;
uniform vec2 mouse;

void main(){
  vec2 q = (-resolution.xy + 2.0*gl_FragCoord.xy) / resolution.y;
  //vec2 q = vUv;
  vec2 p = q;

  // p += .2*cos( 1.5*p.yx + 1.0*time + vec2(0.1,1.1) );
  // p += .2*cos( 2.4*p.yx + 1.6*time + vec2(4.5,2.6) );
  // p += .2*cos( 3.3*p.yx + 1.2*time + vec2(3.2,3.4) );
  // p += .2*cos( 4.2*p.yx + 1.7*time + vec2(1.8,5.2) );
  // p += .2*cos( 9.1*p.yx + 1.1*time + vec2(6.3,3.9) );
  p += .2*cos( 1.5*p.yx + 1.0*time + vec2(0.1*mouse.x,1.1*mouse.y) );
  p += .2*cos( 2.4*p.yx + 1.6*time + vec2(4.5*mouse.x,2.6*mouse.y) );
  p += .2*cos( 3.3*p.yx + 1.2*time + vec2(3.2*mouse.x,3.4*mouse.y) );
  p += .2*cos( 4.2*p.yx + 1.7*time + vec2(1.8*mouse.x,5.2*mouse.y) );
  p += .2*cos( 9.1*p.yx + 1.1*time + vec2(6.3*mouse.x,3.9*mouse.y) );

  float r = length( p );

  // vec3 col = texture2D( texture, vec2(r,     0.0), 0.0 ).rgb;
  vec3 col = texture2D( texture, p).rgb;

  gl_FragColor = vec4( col, 1.0 );

}