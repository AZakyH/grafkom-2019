(function() {

    var canvas = document.getElementById("glcanvas");
    var gl;
    var contexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"]

    for (var i = 0; i < contexts.length; i++) {
        var context = contexts[i];
        gl = canvas.getContext(context)
    }
    
})();