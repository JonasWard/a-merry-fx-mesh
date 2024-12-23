const float BUBBLE_RADIUS = 0.1;
const float BUBBLE_POWER = 0.5;
const float DROP_RADIUS = 0.05;
const vec2 DROP_DIRECTION = vec2(-1.0, -1.0) * DROP_RADIUS;

float sdCircle(vec3 c, vec2 p) {
  vec2 d = c.xy - p;
  return pow(dot(d,d),0.5) - c.z;
}

float sdLine(vec2 a, vec2 d, vec2 p) {
	vec2 pa = p - a;
	float h = clamp(dot(pa, d) / dot(d, d), 0., 1.);
	return length(pa - h * d);
}

float sdCircleSharp(vec3 c, vec2 p) {
  float d = sdCircle(c, p) / c.z;
  if (d < 0.0) {
    return 0.0; 
  } else {
    return 1.0;
  }
}

float sdCircleBubble(vec3 c, vec2 p) {
  float d = sdCircle(c, p);
  if (d < 0.0) {
    return 0.0; 
  } else {
    return min(pow(d / BUBBLE_RADIUS, BUBBLE_POWER), 1.0);
  }
}

float sdDrowShadow(vec3 c, vec2 p) {
  float d = sdCircle(c, p);
  if (d < 0.0) {
    return 0.0; 
  } else {
    return min(pow((sdLine(c.xy, DROP_DIRECTION, p) - c.z + DROP_RADIUS) / DROP_RADIUS, BUBBLE_POWER), 1.0);
  }
}
