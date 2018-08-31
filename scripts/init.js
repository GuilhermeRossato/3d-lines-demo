'use strict';

(async function() {
	let canvas, title, fragmentShader, vertexShader;
	try {
		while (!(canvas = document.querySelector('canvas'))) {
			await new Promise(r=>setTimeout(r, 100));
		}
		title = document.querySelector('h2')
		title.innerText = "Loading shaders";
		[fragmentShader, vertexShader] = await Promise.all([
			fetch('/shaders/vertex.glsl'),
			fetch('/shaders/fragment.glsl')
		]);
		title.innerText = "Loading webgl";
		await (new GraphicsController(canvas, fragmentShader, vertexShader)).load();
		title.remove();
	} catch(err) {
		console.error(err);
		document.querySelector('h1') && (document.querySelector('h1').innerText = err);
	}
})();