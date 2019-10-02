(function(global) {

  var canvas, gl, program;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Register Callbacks
    window.addEventListener('resize', resizer);

    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    resizer();
  }

  // draw!
  function draw() {
    // renderer info
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Write the positions of vertices to a vertex shader
    // drawPoint();
    // drawLine();
    // drawTriangle();

    var linesVertices = new Float32Array([
      -0.8, -0.5,  -0.8, +0.5,  -0.7, +0.5, -0.7, +0.1,  -0.5, +0.1,  -0.5, +0.5,  -0.40, +0.5,  -0.40, -0.5, -0.5, -0.5, -0.5, -0.1, -0.7, -0.1, -0.7, -0.5,
    ]);
    var linesVertices2 = new Float32Array([
      -0.8, -0.5,  -0.85, -0.4,  -0.85, 0.6,  -0.8, +0.5
    ]);
    var linesVertices3 = new Float32Array([
      -0.85, 0.6,   -0.75, +0.6,  -0.7, +0.5
    ]);
    var linesVertices4 = new Float32Array([
      -0.4, +0.5,   -0.45, +0.6,  -0.55, 0.6,   -0.55, 0.2,   -0.7, 0.2
    ]);
    var linesVertices5 = new Float32Array([
      -0.5, +0.5,   -0.55, +0.6
    ]);
    var linesVertices6 = new Float32Array([
      -0.5, +0.1,   -0.55, +0.2
    ]);
    var linesVertices7 = new Float32Array([
      -0.50, -0.5,   -0.55, -0.4,  -0.55, -0.1
    ]);

    var triangleVertices1 = new Float32Array([
      0.0, -0.5,  0.0, +0.5,  0.1, +0.5,  0.1, -0.5
    ]);
    var triangleVertices2 = new Float32Array([
      0.3, -0.5,  0.3, +0.5,  0.4, +0.5,  0.4, -0.5
    ]);
    var triangleVertices3 = new Float32Array([
      0.1, -0.1,  0.1, +0.1,  0.3, +0.1,  0.3, -0.1
    ]);
    // 0.0, +0.5
    var linesVertices21 = new Float32Array([
      0.0, -0.5,  -0.05, -0.4,  -0.05, 0.6
    ]);
    var linesVertices31 = new Float32Array([
      -0.05, 0.6,   0.05, +0.6,  0.1, +0.5
    ]);
    var linesVertices41 = new Float32Array([
      0.4, +0.5,   0.35, +0.6,  0.25, 0.6,   0.25, 0.2,   0.1, 0.2
    ]);
    var linesVertices71 = new Float32Array([
      0.30, -0.5,   0.25, -0.4,  0.25, -0.1
    ]);

    genDraw(gl.LINE_LOOP, linesVertices);
    genDraw(gl.LINE_STRIP, linesVertices2);
    genDraw(gl.LINE_STRIP, linesVertices3);
    genDraw(gl.LINE_STRIP, linesVertices4);
    genDraw(gl.LINE_STRIP, linesVertices5);
    genDraw(gl.LINE_STRIP, linesVertices6);
    genDraw(gl.LINE_STRIP, linesVertices7);

    genDraw(gl.TRIANGLE_FAN, triangleVertices1);
    genDraw(gl.TRIANGLE_FAN, triangleVertices2);
    genDraw(gl.TRIANGLE_FAN, triangleVertices3);
    genDraw(gl.LINE_STRIP, linesVertices21);
    genDraw(gl.LINE_STRIP, linesVertices31);
    genDraw(gl.LINE_STRIP, linesVertices41);
    genDraw(gl.LINE_STRIP, linesVertices71);
  }

  // Generic format
  function genDraw(type, vertices) {
    var n = initBuffers(vertices);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(type, 0, n);
  }

  function initBuffers(vertices) {
    var n = vertices.length / 2;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }

})(window || this);
