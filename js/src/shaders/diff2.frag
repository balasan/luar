uniform sampler2D texture;
uniform sampler2D texture2;
varying vec2 vUv;

void main() {

  vec4 tex0 = texture2D(texture, vUv);
  vec4 tex1 = texture2D(texture2, vUv);

  vec4 fc = (tex1 - tex0 * .9);
  gl_FragColor = vec4(fc);

}