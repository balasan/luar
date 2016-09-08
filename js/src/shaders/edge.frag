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



    float mouseDown = step(.05, 0.0);
    float scale = mix(1., .4, mouseDown);
    vec2 look = (mouse.xy / resolution.xy - .5) * 3. * mouseDown;

    float t = time * mouse.x * mouse.y * 10.0;
    vec2 res = resolution.xy;
    vec2 uv = gl_FragCoord.xy / res - vec2(.5) + look;

    uv *= vec2(res.x / res.y, 1.) * 4. * scale;

    float len = dot(uv, uv) * .3 - .4;

    vec3 z = sin(t * vec3(.23, .19, .17));
    for (int i = 0; i < ITERATIONS; i++) {
        z += cos(z.zxy + uv.yxy * float(i) * len);
    }

    float val = z.r * .06 + .3;
    val -= smoothstep(.1, -.3, len) * 1.5 + len * .3 - 1.4;
    // gl_FragColor = vec4(vec3(max(val, .1)), 1.);
    vec2 of = vec2(DISTORTION)*-.5;
    vec4 col = texture2D(texture, (gl_FragCoord.xy / res) + of + val * DISTORTION);
    gl_FragColor = vec4(vec3(val*col.r, val*col.g, val*col.b), col.a);
}
