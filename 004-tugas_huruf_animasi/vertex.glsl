precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
uniform float theta;
uniform float sx;
uniform float sy;
uniform float sz;
uniform float originx;
uniform float originy;
uniform float ioriginx;
uniform float ioriginy;

void main() {
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

    mat4 origin = mat4(
      1.0 , 0.0, 0.0, originx,  //0.5,
      0.0, 1.0 , 0.0, originy,  //0.0,
      0.0, 0.0, 1.0 , 0.0,
      0.0, 0.0, 0.0, 1.0
    );

    mat4 iorigin = mat4(
      1.0 , 0.0, 0.0, ioriginx,  //-0.5,
      0.0, 1.0 , 0.0, ioriginy,  //0.0,
      0.0, 0.0, 1.0 , 0.0,
      0.0, 0.0, 0.0, 1.0
    );

    gl_Position = vec4(vPosition, 0.0, 1.0) * origin * rotate * scale * iorigin;
}