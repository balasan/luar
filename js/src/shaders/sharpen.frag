uniform sampler2D texture;
uniform vec2 resolution;
varying vec2 vUv;

float kernel[9];
vec2 offset[9];

void main() {
  float step_w = 1.0/resolution.x;
  float step_h = 1.0/resolution.y;
  vec2 tc = vUv;
  vec4 input0 = texture2D(texture,tc);
  kernel[0] = -1.0; kernel[1] = -1.0; kernel[2] = -1.0;
  kernel[3] = -1.0; kernel[4] = 8.0; kernel[5] = -1.0;
  kernel[6] = -1.0; kernel[7] = -1.0; kernel[8] = -1.0;
  offset[0] = vec2(-step_w, -step_h);
  offset[1] = vec2(0.0, -step_h);
  offset[2] = vec2(step_w, -step_h);
  offset[3] = vec2(-step_w, 0.0);
  offset[4] = vec2(0.0, 0.0);
  offset[5] = vec2(step_w, 0.0);
  offset[6] = vec2(-step_w, step_h);
  offset[7] = vec2(0.0, step_h);
  offset[8] = vec2(step_w, step_h);
  input0 += texture2D(texture, tc + offset[0]) * kernel[0];
  input0 += texture2D(texture, tc + offset[1]) * kernel[1];
  input0 += texture2D(texture, tc + offset[2]) * kernel[2];
  input0 += texture2D(texture, tc + offset[3]) * kernel[3];
  input0 += texture2D(texture, tc + offset[4]) * kernel[4];
  input0 += texture2D(texture, tc + offset[5]) * kernel[5];
  input0 += texture2D(texture, tc + offset[6]) * kernel[6];
  input0 += texture2D(texture, tc + offset[7]) * kernel[7];
  input0 += texture2D(texture, tc + offset[8]) * kernel[8];
  float kernelWeight = kernel[0] + kernel[2] + kernel[3] + kernel[4] + kernel[5] + kernel[6] + kernel[7] + kernel[8];
  if (kernelWeight <= 0.0) {
    kernelWeight = 1.0;
  }
  gl_FragColor = vec4((input0/kernelWeight).rgb, 1.0);
}
