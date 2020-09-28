const ele = document.getElementById('container');

ele.scrollTop = 1000;
ele.scrollLeft = 150;

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseUpHandler = function(e) {
	ele.style.cursor = 'grab';
	ele.style.removeProperty('user-select');

	document.removeEventListener('mousemove', mouseMoveHandler);
	document.removeEventListener('mouseup', mouseUpHandler);
}

const mouseMoveHandler = function(e) {
	ele.style.cursor =  'grabbing';
	ele.style.userSelect = 'none';
	const dx = e.clientX - pos.x;
	const dy = e.clientY - pos.y;

	ele.scrollTop = pos.top - dy;
	ele.scrollLeft = pos.left - dx;
}

const mouseDownHandler = function(e) {
	pos = {
		left: ele.scrollLeft,
		top: ele.scrollTop,
		x: e.clientX,
		y: e.clientY
	};

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
}

ele.addEventListener('mousedown', mouseDownHandler);

// * document.readyState = "loading" or "complete"
// * event when dom is loaded 'DOMContentLoaded'
const ready = function (cb) {
	document.readyState === "loading" ? document.addEventListener('DOMContentLoaded', function (e) {
			cb();
		}) 
	: cb();
};

ready(function() {
	console.log("doc is ready");
})