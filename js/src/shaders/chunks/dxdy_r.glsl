
vec2 dxdy(sampler2D texture, vec2 vUv, vec2 resolution, float step, float mult) {

  vec2 texelWidth = 1.0/resolution;

  float tl = abs(texture2D(texture, vUv + texelWidth * vec2(-step, -step)).x);   // top left
  float  l = abs(texture2D(texture, vUv + texelWidth * vec2(-step,  0.0)).x);   // left
  float bl = abs(texture2D(texture, vUv + texelWidth * vec2(-step,  step)).x);   // bottom left
  float  t = abs(texture2D(texture, vUv + texelWidth * vec2( 0.0, -step)).x);   // top
  float  b = abs(texture2D(texture, vUv + texelWidth * vec2( 0.0,  step)).x);   // bottom
  float tr = abs(texture2D(texture, vUv + texelWidth * vec2( step, -step)).x);   // top right
  float  r = abs(texture2D(texture, vUv + texelWidth * vec2( step,  0.0)).x);   // right
  float br = abs(texture2D(texture, vUv + texelWidth * vec2( step,  step)).x);   // bottom right

  float dX = tr*mult + 2.0*r*mult + br*mult -tl*mult - 2.0*l*mult - bl*mult;
  float dY = bl*mult + 2.0*b*mult + br*mult -tl*mult - 2.0*t*mult - tr*mult;

  return vec2(dX, dY);

}

#pragma glslify: export(dxdy)