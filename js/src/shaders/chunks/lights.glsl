
vec3 lights(
  vec4 diffuseColor,
  vec4 lightColor,
  float lightBrightness,
  float sf,
  vec3 lightDir,
  vec3 N) {

  float D = length(lightDir);
  vec3 L = normalize(lightDir);

  vec4 ambientColor = vec4(vec3(lightColor.rgb*lightBrightness),0.5);

  vec3 diffuse = (lightColor.rgb * lightColor.a) * max(dot(N, L), 0.0);
  vec3 ambient = ambientColor.rgb * ambientColor.a;

  vec3 falloff = vec3(1.0,3.0,20.5);
  float attenuation = 1.0 / (falloff.x + (falloff.y*D) + (falloff.z * D * D) );

  vec3 intensity =  ambient+( diffuse + sf ) * attenuation;
  vec3 finalColor = (diffuseColor.rgb * intensity);

  return ambient + (finalColor + sf * 1.0);

}



#pragma glslify: export(lights)