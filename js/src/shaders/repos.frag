varying vec2 vUv;
uniform sampler2D texture;
uniform vec2 mouse;
void main(){

  vec2 tc = vUv;
  vec4 look = texture2D(texture,tc);
    // "    vec2 offs = vec2(look.y-look.x,look.w-look.z)*0.001;
  vec2 offs = vec2(look.y-look.x,look.w-look.z)*vec2(mouse.x/50.0, mouse.y/50.0);
  vec2 coord = offs+tc;
  vec4 repos = texture2D(texture, coord);
  repos*=1.01;
  gl_FragColor = repos;

}