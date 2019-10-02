(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    var triangleVertices = [
      //x,y       r, g, b
      0.0, 0.5,   1.0, 1.0, 0.0,
      -0.5, -0.5,  0.7, 0.0, 1.0,
      0.5, -0.5,  0.1, 1.0, 0.6 
    ]

    // Link antara CPU Memory dengan GPU Memory
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    // Link untuk attribute
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  // variable yang memegang posisi attribute di shader
      2,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data attribute
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
      0           // offset dari posisi elemen di array
    )
    gl.vertexAttribPointer(
      vColor,
      3,
      gl.FLOAT,
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var translation = gl.getUniformLocation(program, 'translation');
    var translationVector = [-0.5, 0.5, 0.0];
    gl.uniform3fv(translation, translationVector);

    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0;

    var sxLoc = gl.getUniformLocation(program, 'sx');
    var sx = 0.2;
    var syLoc = gl.getUniformLocation(program, 'sy');
    var sy = 0.2;
    var szLoc = gl.getUniformLocation(program, 'sz');
    var sz = 0.2;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      theta += 0.01;
      gl.uniform1f(thetaLocation, theta);

      //Skala
      gl.uniform1f(sxLoc, sx);
      gl.uniform1f(syLoc, sy);
      gl.uniform1f(szLoc, sz);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(render);
    }
    render();
  }
})();
