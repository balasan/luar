uniform sampler2D texture;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(texture, vUv);
  if(color.a>0.0){
    gl_FragColor = vec4(color.rgb, color.a);
  } else {
    discard;
  }
}