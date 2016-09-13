// Original https://www.shadertoy.com/view/MljSDy
// More iterations means more detail + aliasing
// More strength means more distortion
#define ITERATIONS 10
#define DISTORTION 0.0525

#pragma glslify: dxdy = require('./chunks/dxdy_r.glsl')
#pragma glslify: blinnPhong = require(glsl-specular-blinn-phong)
#pragma glslify: lights = require('./chunks/lights.glsl')

uniform vec2 resolution;
uniform float time;
uniform sampler2D texture;
uniform sampler2D bump;
varying vec2 vUv;
uniform vec2 mouse;
uniform float aspect;


void main( void ) {

    float a = 1. / aspect * resolution.x/resolution.y;


    vec2 look = (mouse.xy) * vec2(.2, -.2);

    float t = time * 10.0;
    vec2 res = resolution.xy;
    vec2 uv = gl_FragCoord.xy / res - vec2(.5) + look;

    uv *= vec2(res.x / res.y, 1.0) * 6.0;

    vec2 newUv = vUv;
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





    // float step = 3.0;
    // float mult = 0.01;
    // vec2 texCoord = vUv;
    // if (a < 1.0) {
    //     texCoord.y /= a;
    //     texCoord.y += (1.0 - 1.0 / a) / 2.0;
    // }
    // else {
    //     texCoord.x *= a;
    //     texCoord.x += (1.0 - a) / 2.0;
    // }

    // vec4 logo = texture2D(bump, texCoord * 4.);


    vec2 offset = of + val * DISTORTION;
    // offset *= 1. - logo.a * .8;

    vec4 col = texture2D(texture, newUv + offset);
    col = vec4(val * .1 * (col.r + col.g + col.b) + col.rgb, col.a);



    // // vec2 dxdy = vec2(dxdy(bump, texCoord * 6. + of + val * DISTORTION, resolution, step, mult));
    // // float dX = dxdy.x;
    // // float dY = dxdy.y;

    // // float lightWidth = 10.9;
    // // vec3 lightDir = vec3( vec2( -mouse.x+0.5, 0.5+mouse.y)-(gl_FragCoord.xy / vec2(resolution.x,resolution.y)), lightWidth );
    // // lightDir.x *= resolution.x/resolution.y;
    // // // lightDir = vec3( 0.1, -0.7, lightWidth/2.0);

    // // vec3 N = normalize(vec3(dX,dY,1));
    // // vec3 viewDirection = vec3(0.0, 0.0, -1.0);


    // // vec3 offsetNormal = -N + dot(N, viewDirection) * viewDirection;
    // // vec2 rOffset = normalize(offsetNormal.xy) * length(offsetNormal) * .08;







    // vec4 diffuseColor = col * .8;
    // vec4 lightColor = col * .4;
    // float lightBrightness = .7;

    // float shin = 1000.1;
    // float sf = blinnPhong(lightDir, viewDirection, N, shin);

    // vec3 color = lights(diffuseColor, lightColor, lightBrightness, sf, lightDir, N);

    gl_FragColor = col;
}
