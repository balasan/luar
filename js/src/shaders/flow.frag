uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
varying vec2 vUv;
uniform vec2 mouse;

void main( void ){
  vec2 uv = vUv;

  vec2 e = 1.0/resolution.xy;


  float am1 = 0.5 + 0.5*0.927180409;
  float am2 = 10.0;

  for( int i=0; i<20; i++ ){
   float h  = dot( texture2D(texture, uv*0.99            ).xyz, vec3(0.5) );
   float h1 = dot( texture2D(texture, uv+vec2(e.x,0.0001)).xyz, vec3(0.5) );
   float h2 = dot( texture2D(texture, uv+vec2(0.0001,e.y)).xyz, vec3(0.5) );
   vec2 g = 0.001*vec2( (h1-h), (h2-h) )/e;
   vec2 f = g.yx*vec2(5.0*mouse.x, 5.0*mouse.y);

   g = mix( g, f, am1 );

   uv += 0.00005*g*am2;
  }

  vec3 col = texture2D(texture, uv).xyz;
  gl_FragColor = vec4(col, 1.0);

}