// Original https://www.shadertoy.com/view/MljSDy
// More iterations means more detail + aliasing
// More strength means more distortion
#define ITERATIONS 10
#define DISTORTION 0.125

void mainImage (out vec4 fragColor, in vec2 fragCoord) {
    float mouseDown = step(.05, iMouse.z);
    float scale = mix(1., .4, mouseDown);
    vec2 look = (iMouse.xy / iResolution.xy - .5) * 3. * mouseDown;

    float time = iGlobalTime * 2. + 15.;
    vec2 res = iResolution.xy;
    vec2 uv = fragCoord.xy / res - vec2(.5) + look;
    uv *= vec2(res.x / res.y, 1.) * 4. * scale;

    float len = dot(uv, uv) * .3 - .4;

    vec3 z = sin(time * vec3(.23, .19, .17));
    for (int i = 0; i < ITERATIONS; i++) {
        z += cos(z.zxy + uv.yxy * float(i) * len);
    }

    float val = z.r * .06 + .3;
    val -= smoothstep(.1, -.3, len) * 1.5 + len * .3 - .4;
    //fragColor = vec4(vec3(max(val, .1)), 1.);
    vec2 of = vec2(DISTORTION)*-.5;
    vec4 col = texture2D(iChannel0, (fragCoord.xy / res) + of + val * DISTORTION);
    fragColor = vec4(vec3(val*col.r, val*col.g, val*col.b), col.a);
}

#pragma glslify: export(mainImage)
