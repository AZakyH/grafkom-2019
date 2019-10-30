precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
// varying vec3 fColor;
uniform vec3 translation;
uniform vec3 translation2;
uniform float theta;
uniform float sx;
uniform float sy;
uniform float sz;
uniform float originx;
uniform float originy;
uniform float ioriginx;
uniform float ioriginy;

void main() {
    // fColor = vColor;
    // float sx = 0.2;
    // float sy = 0.2;
    // float sz = 0.0;

    mat4 translate = mat4(
      1.0, 0.0, 0.0, 0.5,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    );

    mat4 translate2 = mat4(
      1.0, 0.0, 0.0, -0.5,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
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

    mat4 origin2 = mat4(
      1.0 , 0.0, 0.0, -0.4,
      0.0, 1.0 , 0.0, 0.0,
      0.0, 0.0, 1.0 , 0.0,
      0.0, 0.0, 0.0, 1.0
    );

    mat4 iorigin2 = mat4(
      1.0 , 0.0, 0.0, 0.4,
      0.0, 1.0 , 0.0, 0.0,
      0.0, 0.0, 1.0 , 0.0,
      0.0, 0.0, 0.0, 1.0
    );

    // gl_Position = rotate * vec4(vPosition, 0.0, 1.0);
    // gl_Position = rotate * translate * scale * vec4(vPosition, 0.0, 1.0);
    
    //testing
    // gl_Position = translate * vec4(vPosition, 0.0, 1.0) * origin * rotate * iorigin  ;
    // gl_Position = vec4(vPosition, 0.0, 1.0) * origin2 * scale * iorigin2  ;
    gl_Position = vec4(vPosition, 0.0, 1.0) * origin * rotate * scale * iorigin;

    // working
    // gl_Position = translate * rotate * scale *  vec4(vPosition, 0.0, 1.0);
}