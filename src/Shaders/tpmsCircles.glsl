const float BUBBLE_RADIUS = 0.1;
const float BUBBLE_POWER = 0.5;
const float DROP_RADIUS = 0.05;
const vec2 DROP_DIRECTION = vec2(-1.0, -1.0) * DROP_RADIUS;

float sdCircleSharp(vec3 c, vec2 p) {
  float d = sdCircle(c, p) / c.z;
  if (d < 0.0) {
    return 0.0; 
  } else {
    return 1.0;
  }
}

vec3 rotateCircleAroundCenter(vec3 c) {
  float a = ROTATION_VELOCITY * ( (uTime + (1.0 + 0.5 * sin(pow(dot(c.xy,c.xy),0.5) * ANGLE_MULTIPLIER)))) * c.z;
  return vec3(c.x * CENTER_OFFSET_MULTIPLIER + c.x * cos(a) - c.y * sin(a), c.y * CENTER_OFFSET_MULTIPLIER + c.x * sin(a) + c.y * cos(a), c.z); 
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
