varying vec3 uvV;
uniform float uTime;

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

float pDistance(vec2 p0, vec2 p1) {
  vec2 d = p1 - p0;
  return pow(dot(d,d),0.5);
}

float sdLine(vec2 a, vec2 d, vec2 p) {
	vec2 pa = p - a;
	float h = clamp(dot(pa, d) / dot(d, d), 0., 1.);
	return length(pa - h * d);
}

float sdLineSigned(vec2 a, vec2 d, vec2 p) {
  vec2 pa = p - a;
  vec2 n = normalize(vec2(-d.y, d.x));
  return dot(n, pa);
}

float sdCircle(vec3 c, vec2 p) {
  return pDistance(c.xy, p) - c.z;
}