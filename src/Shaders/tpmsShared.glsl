varying vec3 uvV;

float sdUnion(float d0, float d1) {
  return min(d0, d1);
}

float atan2(in float y, in float x)
{
    return x == 0.0 ? sign(y)*1.5707963268 : atan(y, x);
}

vec3 getColor(float d) {
  return mix(color0, color1, min(max(d, 0.0), 1.0));
}