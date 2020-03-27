void main() {

  vec3 color = getCam(uv);

  // try uncommenting this line:
  // color = getPrevious(uv + (color.rg - color.bb) * 0.1);

  for (int i = 0; i < 6; i++) {
    float a = time + TAU * float(i) / 6.;
    vec2 offset = vec2(sin(a), cos(a));
    offset *= 1.5;
    vec2 pos = uv * 2.4;
    if (getFace(pos - offset) > 0.1) {
      color = getCam(pos - offset);
    }
  }

  gl_FragColor = vec4(color, 1);
}
