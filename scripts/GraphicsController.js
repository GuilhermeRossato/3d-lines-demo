class GraphicsController {
	constructor(canvasElement, fragmentString, vertexString) {
		this.canvas = canvasElement;
		this.fragment = fragmentString;
		this.vertex = vertexString;
		window.addEventListener("resize", this.resize.bind(this))
	}

	resize() {
		this.canvas.width = document.body.clientWidth;
		this.canvas.height = document.body.clientHeight;
		this.canvasW = canvas.width;
		this.canvasH = canvas.height;
	}

	load() {
		let canvas, gl, v, f, vs, fs;
		canvas = this.canvas;
		gl = canvas.getContext("experimental-webgl");

		gl.viewport(0, 0, canvas.width, canvas.height);	
		gl.clearColor(0, 0.5, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);

		v = this.vertex;
		f = this.fragment;
		
		vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, v);
		gl.compileShader(vs);
		
		fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs, f);
		gl.compileShader(fs);

		program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		
		if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) 
			console.log(gl.getShaderInfoLog(vs));
			
		if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) 
			console.log(gl.getShaderInfoLog(fs));
		
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
			console.log(gl.getProgramInfoLog(program));
			
		var aspect = canvas.width / canvas.height;
		
		var vertices = new Float32Array([
			-0.5, 0.5*aspect, 0.5, 0.5*aspect,  0.5,-0.5*aspect,
			-0.5, 0.5*aspect, 0.5,-0.5*aspect, -0.5,-0.5*aspect
			]);
		
		vbuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);					
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		
		itemSize = 2;
		numItems = vertices.length / itemSize;

		gl.useProgram(program); 

		program.uColor = gl.getUniformLocation(program, "uColor");
		gl.uniform4fv(program.uColor, [0.0, 1.0, 0.0, 1.0]);

		program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
		gl.enableVertexAttribArray(program.aVertexPosition);
		gl.vertexAttribPointer(program.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.TRIANGLES, 0, numItems);
	}
}