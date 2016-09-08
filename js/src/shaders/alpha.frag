uniform sampler2D texture;
varying vec2 vUv;

void main() {

  float avg = dot(texture2D(texture, vUv).rgb, vec3(1.0))/3.0;
    //if(texture2D(texture, vUv).rgb > 0.1){
  if(avg > 0.5){
    gl_FragColor = vec4(texture2D(texture, vUv).rgb, texture2D(texture, vUv).a);
  }
  else {
    discard;
    // gl_FragColor = vec4(texture2D(texture, vUv).rgb, avg);
  }

}