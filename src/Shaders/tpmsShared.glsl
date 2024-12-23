varying vec3 uvV;

float sdUnion(float d0, float d1) {
  return min(d0, d1);
}
vec3 getColor(float d) {
  return mix(color0, color1, min(max(d, 0.0), 1.0));
}