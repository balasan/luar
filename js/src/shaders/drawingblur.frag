varying mediump vec2 vUv;
uniform sampler2D texture;
uniform mediump vec2 mouse;
uniform mediump float drawingSize;
uniform mediump vec2 ratio;
uniform mediump float fade;
uniform mediump float intensity;

void main() {
  mediump float centerDist = distance((vUv-0.5)*ratio,(mouse)*ratio*vec2(-1.0,1.0));

  float dist = max(drawingSize-centerDist,0.0) / drawingSize * intensity;

  // vec3 previousColor = texture2D(texture, vUv).rgb - fade;
  vec3 previousColor = vec3(0.0, 0.0, 0.0);

  gl_FragColor = vec4(previousColor + dist*(1.0-previousColor), 1.0);

  gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
}