precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
// varying vec3 fColor;
uniform vec3 translation;
uniform float theta;
uniform float sx;
uniform float sy;
uniform float sz;

void main() {
    // fColor = vColor;
    // float sx = 0.2;
    // float sy = 0.2;
    // float sz = 0.0;

    mat4 translate = mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      translation , 1.0
    );

    mat4 rotate = mat4(
      cos(theta), sin(theta), 0.0, 0.0,
      -sin(theta), cos(theta), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    );
    
    mat4 scale = mat4(
      sx , 0.0, 0.0, 0.0,
      0.0, sy , 0.0, 0.0,
      0.0, 0.0, sz , 0.0,
      0.0, 0.0, 0.0, 1.0
    );

    // gl_Position = rotate * vec4(vPosition, 0.0, 1.0);
    gl_Position = rotate * scale *  vec4(vPosition, 0.0, 1.0);
    // gl_Position = rotate * translate * scale * vec4(vPosition, 0.0, 1.0);
}