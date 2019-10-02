(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

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

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return -1;
      }

      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      return n;
    }

    var hurufVertices = new Float32Array([
      -0.7, -0.5,  -0.7, +0.5,  -0.6, +0.5, -0.6, +0.1,  -0.4, +0.1,  -0.4, +0.5,  -0.3, +0.5,  -0.3, -0.5, -0.4, -0.5, -0.4, -0.1, -0.6, -0.1, -0.6, -0.5,
    ]);
    var hurufVertices2 = new Float32Array([
      -0.7, -0.5,  -0.75, -0.4,  -0.75, 0.6,  -0.7, +0.5
    ]);
    var linesVertices3 = new Float32Array([
      -0.75, 0.6,   -0.65, +0.6,  -0.6, +0.5
    ]);
    var linesVertices4 = new Float32Array([
      -0.3, +0.5,   -0.35, +0.6,  -0.45, 0.6,   -0.45, 0.2,   -0.6, 0.2
    ]);
    var linesVertices5 = new Float32Array([
      -0.4, +0.5,   -0.45, +0.6
    ]);
    var linesVertices6 = new Float32Array([
      -0.4, +0.1,   -0.45, +0.2
    ]);
    var linesVertices7 = new Float32Array([
      -0.4, -0.5,   -0.45, -0.4,  -0.45, -0.1
    ]);

    var triangleVertices1 = new Float32Array([
      0.2, -0.5,  0.2, +0.5,  0.3, +0.5,  0.3, -0.5
    ]);
    var triangleVertices2 = new Float32Array([
      0.5, -0.5,  0.5, +0.5,  0.6, +0.5,  0.6, -0.5
    ]);
    var triangleVertices3 = new Float32Array([
      0.3, -0.1,  0.3, +0.1,  0.5, +0.1,  0.5, -0.1
    ]);
    var linesVertices21 = new Float32Array([
      0.2, -0.5,  0.15, -0.4,  0.15, 0.6
    ]);
    var linesVertices31 = new Float32Array([
      0.15, 0.6,   0.25, +0.6,  0.3, +0.5
    ]);
    var linesVertices41 = new Float32Array([
      0.6, +0.5,   0.55, +0.6,  0.45, 0.6,   0.45, 0.2,   0.3, 0.2
    ]);
    var linesVertices71 = new Float32Array([
      0.50, -0.5,   0.45, -0.4,  0.45, -0.1
    ]);
    
    var originxLoc = gl.getUniformLocation(program, 'originx');
    var originyLoc = gl.getUniformLocation(program, 'originy');

    var ioriginxLoc = gl.getUniformLocation(program, 'ioriginx');
    var ioriginyLoc = gl.getUniformLocation(program, 'ioriginy');

    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0;
    var theta2 = 0.0;

    var sxLoc = gl.getUniformLocation(program, 'sx');
    var sx = 1.0;
    var sx2 = 1.0;
    var syLoc = gl.getUniformLocation(program, 'sy');
    var sy = 1.0;
    var sy2 = 1.0;
    var szLoc = gl.getUniformLocation(program, 'sz');
    var sz = 1.0;
    var sz2 = 1.0;

    var flag = 0;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Rotate
      theta += 0.0037;
      gl.uniform1f(thetaLocation, theta);

      //Skala
      gl.uniform1f(sxLoc, sx);
      gl.uniform1f(syLoc, sy);
      gl.uniform1f(szLoc, sz);

      // Origin
      var originx = 0.5;
      var originy = 0.0;
      var ioriginx = -0.5;    
      var ioriginy = 0.0;
      gl.uniform1f(originxLoc, originx);
      gl.uniform1f(originyLoc, originy);
      gl.uniform1f(ioriginxLoc, ioriginx);
      gl.uniform1f(ioriginyLoc, ioriginy);

      genDraw(gl.LINE_LOOP, hurufVertices);
      genDraw(gl.LINE_LOOP, hurufVertices2);
      genDraw(gl.LINE_STRIP, linesVertices3);
      genDraw(gl.LINE_STRIP, linesVertices4);
      genDraw(gl.LINE_STRIP, linesVertices5);
      genDraw(gl.LINE_STRIP, linesVertices6);
      genDraw(gl.LINE_STRIP, linesVertices7);

      // Origin2
      var originx = -0.4;
      var originy = 0.0;
      var ioriginx = 0.4;    
      var ioriginy = 0.0; 
      gl.uniform1f(originxLoc, originx);
      gl.uniform1f(originyLoc, originy);
      gl.uniform1f(ioriginxLoc, ioriginx);
      gl.uniform1f(ioriginyLoc, ioriginy);

      //Pseudo-rotation
      if(flag==0){
        sx2+=0.0037;
      }
      else if(flag==1){
        sx2-=0.0037; 
      }

      if(sx2<=-1){
        flag = 0;
      }
      else if(sx2>=1){
        flag = 1;        
      }
      
      //Skala
      gl.uniform1f(sxLoc, sx2);
      gl.uniform1f(syLoc, sy2);
      gl.uniform1f(szLoc, sz2);

      //Hentikan Rotasi
      theta2 -= 0.0;
      gl.uniform1f(thetaLocation, theta2);

      genDraw(gl.TRIANGLE_FAN, triangleVertices1);
      genDraw(gl.TRIANGLE_FAN, triangleVertices2);
      genDraw(gl.TRIANGLE_FAN, triangleVertices3);
      genDraw(gl.LINE_STRIP, linesVertices21);
      genDraw(gl.LINE_STRIP, linesVertices31);
      genDraw(gl.LINE_STRIP, linesVertices41);
      genDraw(gl.LINE_STRIP, linesVertices71);
  
      requestAnimationFrame(render);
    }
    render();
  }
})();
