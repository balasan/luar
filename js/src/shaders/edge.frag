// Original https://www.shadertoy.com/view/MljSDy
// More iterations means more detail + aliasing
// More strength means more distortion
#define ITERATIONS 10
#define DISTORTION 0.125

uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
varying vec2 vUv;
uniform vec2 mouse;

// void mainImage (out vec4 fragColor, in vec2 fragCoord) {

void main( void ) {



    float mouseDown = step(.05, 1.0);
    // float scale = mix(1., .4, mouseDown);
    vec2 look = (mouse.xy) * vec2(.2, -.2) * mouseDown;

    float t = time * 10.0;
    vec2 res = resolution.xy;
    vec2 uv = gl_FragCoord.xy / res - vec2(.5) + look;

    uv *= vec2(res.x / res.y, 1.0) * 6.0;

    // uv = vUv * 10.1;

    vec2 newUv = vUv;
    float a = resolution.x/resolution.y;
    if (a < 1.0) {
      newUv.y /= a;
      newUv.y += (1.0 - 1.0/a) / 2.0;
    }
    else {
      newUv.x *= a;
      newUv.x += (1.0 - a) / 2.0;
    }

    float len = dot(uv, uv) * (cos(t / 10.) + 2.)/10.;

    vec3 z = sin(t * vec3( .23 , .11 , .17));
    for (int i = 0; i < ITERATIONS; i++) {
        z += cos(z.zxy + uv.yxy * float(i) * len);
    }

    float val = z.r * .06 + .3;
    val -= smoothstep(.0, -0.9, len) - len * 1.;
    // gl_FragColor = vec4(vec3(max(val, .1)), 1.);
    vec2 of = vec2(DISTORTION)*-.5;
    vec4 col = texture2D(texture, newUv + of + val * DISTORTION);
    gl_FragColor = vec4(val * .1  + col.rgb, col.a);
}
