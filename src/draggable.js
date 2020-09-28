let draggingEle;

let placeholder;
let isDraggingStarted = false;

let x = 0;
let y = 0;

const mouseDownHandler = function(e) {
	draggingEle = e.target;

	const rect = draggingEle.getBoundingClientRect();
	y = e.pageY - rect.top	// pageY mouse posY - distanceY from parent
		/*	maintain dy distance from mouseclick, set the y of the elementy e.pageY - dy
	 	----y---
		-   y  -
		-   y  -
		-      -
		--------
	*/
	x = e.pageX - rect.left;

	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {

	draggingEle.style.position = 'absolute';
	draggingEle.style.top = `${e.pageY - y}px`;		// mouse posY - (initial pageY - distanceY from parent): position element from where I moused clicked on the element
	// set y of element to where i clicked offset by distance from click and top of element
	draggingEle.style.left = `${e.pageX - x}px`;

	const draggingRect = draggingEle.getBoundingClientRect();

	if (!isDraggingStarted) {
		isDraggingStarted = true;

		placeholder = document.createElement('div');
		placeholder.classList.add('placeholder');
		draggingEle.parentNode.insertBefore(
			placeholder,
			draggingEle.nextSibling
		);

		placeholder.style.height = `${draggingRect.height}px`;
	}

	const prevEle = draggingEle.previousElementSibling;
	const nextEle = placeholder.nextElementSibling;

	if (prevEle && isAbove(draggingEle, prevEle)) {
		swap(placeholder, draggingEle);
		swap(placeholder, prevEle);
		return;
	}

	if (nextEle && isAbove(nextEle, draggingEle)) {
		swap(nextEle, placeholder);
		swap(nextEle, draggingEle);
	}
}

const swap = function(nodeA, nodeB) {
	const parentA = nodeA.parentNode;
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

	nodeB.parentNode.insertBefore(nodeA, nodeB)		// insertBefore will move it's current position if it's within the dom
	parentA.insertBefore(nodeB, siblingA);
}

const mouseUpHandler = function() {
	// remove the position styles
	draggingEle.style.removeProperty('top');
	draggingEle.style.removeProperty('left');
	draggingEle.style.removeProperty('position');

	x = null;
	y = null;
	draggingEle = null;

	placeholder && placeholder.parentNode.removeChild(placeholder);

	isDraggingStarted = false;

	document.removeEventListener('mousemove', mouseMoveHandler);
	document.removeEventListener('mouseup', mouseUpHandler);
}

const list = document.getElementById('list');

[...list.querySelectorAll(".draggable")].forEach(item => {
	item.addEventListener('mousedown', mouseDownHandler);
})

const isAbove = function(nodeA, nodeB) {
	const rectA = nodeA.getBoundingClientRect();
	const rectB = nodeB.getBoundingClientRect();

	return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
}