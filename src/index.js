const input = document.getElementById("numberInput");
let currentValue = input.value || "";
const selection = {};

input.addEventListener("keydown", (e) => {
	const target = e.target;
	selection.selectionStart = target.selectionStart;
	selection.selectionEnd = target.selectionEnd;
});

input.addEventListener("input", (e) => {
	const target = e.target;

	if (/^[0-9\s]*$/.test(target.value)) {
		currentValue = target.value;
	} else {
		target.value = currentValue;
		target.setSelectionRange(
			selection.selectionStart,
			selection.selectionEnd
		);
	}
});

const app = document.getElementById("app");
const h2 = document.createElement("h2");
h2.innerHTML = "Hello World!";
app.appendChild(h2);

const output = document.getElementById("output");

const clickHandler = (e) => {
	const tooltip = document.getElementById("tooltip");
	const target = e.target;
	const rect = target.getBoundingClientRect();

	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	tooltip.style.left = rect.left + "px";
	tooltip.style.top = rect.top + 20 + "px";
	tooltip.style.display = "block";
};

const leaveHandler = (e) => {
	const tooltip = document.getElementById("tooltip");
	tooltip.style.display = "none";
};

const button = document.createElement("button");
// button.addEventListener("click", clickHandler);
button.onmouseover = clickHandler;
button.onmouseleave = leaveHandler;
button.innerHTML = "Click Me!";
button.style.borderRadius = "5px";
app.appendChild(button);

const scrollbarWidth = document.body.offsetWidth - document.body.clientWidth;
console.log(scrollbarWidth);
// this works
const calculateScrollbarWidth = function () {
	const outer = document.createElement("div");
	// outer.style.visibility = "hidden";
	outer.style.overflow = "scroll";
	outer.style.backgroundColor = "red";
	document.body.appendChild(outer);

	const inner = document.createElement("div");
	outer.appendChild(inner);

	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

	document.body.removeChild(outer);

	return scrollbarWidth;
};

console.log(calculateScrollbarWidth());

const setFavicon = function (url) {
	// Find the current favicon element
	const favicon = document.querySelector('link[rel="icon"]');
	if (favicon) {
		// Update the new link
		favicon.href = url;
	} else {
		// Create new `link`
		const link = document.createElement("link");
		link.rel = "icon";
		link.href = url;

		// Append to the `head` element
		document.head.appendChild(link);
	}
};

const setEmojiIcon = (emoji) => {
	const canvas = document.createElement("canvas");
	canvas.height = 64;
	canvas.width = 64;

	const context = canvas.getContext("2d");
	context.font = "64px serif";
	context.fillText(emoji, 0, 64);

	const url = canvas.toDataURL();

	setFavicon(url);
};

setEmojiIcon("🎉");

const matches = function (ele, selector) {
	return (
		ele.matches ||
		ele.matchesSelector ||
		ele.msMatchesSelector ||
		ele.mozMatchesSelector ||
		ele.webkitMatchesSelector ||
		ele.oMatchesSelector
	).call(ele, selector);
};

let appElement = document.querySelector("#app");
console.log(matches(appElement, ".app"));

console.log(appElement.classList.contains("app"));

appElement.classList.remove("app");
appElement.classList.toggle("app");

const childElement = document.querySelector("#child");
console.log(appElement.contains(childElement));

const isDescendant = (parent, child) => {
	let node = child.parentNode;

	while (node) {
		if (node === parent) {
			return true;
		} else {
			node = node.parent;
		}
	}

	return false;
};

console.log(isDescendant(appElement, window));

const isInViewport = function (ele) {
	const rect = ele.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <=
			(window.innerWidth || document.documentElement.clientWidth)
	);
};

console.log(isInViewport(appElement));

const isScrollable = function (ele) {
	const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

	const overflowYStyle = window.getComputedStyle(ele).overflowY;
	const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

	return hasScrollableContent && !isOverflowHidden;
};

isScrollable(appElement);

const isDateInputSupported = function () {
	const ele = document.createElement("input");

	ele.setAttribute("type", "date");

	const invalidValue = "not-a-valid-date";

	ele.setAttribute("value", invalidValue);

	return ele.value !== invalidValue;
};

isDateInputSupported();

// const cloned = appElement.cloneNode(false);

// const body = document.querySelector("body");
// body.appendChild(cloned);

// 15
const frame = document.getElementById("frame");
const message = "message from parent";
// post to child contentWindow
frame.contentWindow.postMessage(message, "*");

window.addEventListener("message", (e) => {
	// get the sent data
	const data = e.data;
	console.log("parent frame", JSON.parse(data));
});

// 16
const text = "This will be copied";
const textAreaEle = document.createElement("textarea");

textAreaEle.style.border = "0";
textAreaEle.style.padding = "0";
textAreaEle.style.margin = "0";

// set absolute position so you won't see it
textAreaEle.style.position = "absolute";
textAreaEle.style.left = "-9999px";
textAreaEle.style.top = "0px";

// set the value

document.body.appendChild(textAreaEle);

const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
	try {
		textAreaEle.focus();
		textAreaEle.value = input.value;
		textAreaEle.select();
		console.log("copy", textAreaEle.value);
		document.execCommand("copy");
	} catch (err) {
	} finally {
		// remove the textarea
		// document.body.removeChild(textAreaEle);
	}
});

// 17

const textarea = document.getElementById("message");
const counter = document.querySelector("#counter");

// just do straight away, no onload event
counter.innerHTML = `0/${textarea.getAttribute("maxlength")}`;

// * input event!!!!!!!
textarea.addEventListener("input", (e) => {
	// counter.innerHTML = textarea.value.length;  // textarea.value is the old value stored, need to use target
	const value = e.target.value;
	const maxlength = e.target.getAttribute("maxlength");
	counter.innerHTML = `${value.length}/${maxlength}`;
});

const isRangeInputSupported = function () {
	const ele = document.createElement("input");
	ele.setAttribute("type", "range"); // if browser not supported, it won't let you set it, it will revert back to text
	return ele.type !== "text";
};

console.log("range supported", isRangeInputSupported());

const knob = document.getElementById("knob");
const leftSide = knob.previousElementSibling;
console.log("previousElementSibling", knob.previousElementSibling);
console.log("previousSibling", knob.previousSibling);

let x = 0;
let y = 0;
let leftWidth = 0;

const mouseDownHandler = function (e) {
	x = e.clientX;
	y = e.clientY;

	leftWidth = leftSide.getBoundingClientRect().width;

	document.addEventListener("mousemove", mouseMoveHandler);
	document.addEventListener("mouseup", mouseUpHandler);
};

knob.addEventListener("mousedown", mouseDownHandler);

const mouseMoveHandler = function (e) {
	const dx = e.clientX - x;
	const dy = e.clientY - y;

	const containerWidth = knob.parentNode.getBoundingClientRect().width;
	let newLeftWidth = ((leftWidth + dx) * 100) / containerWidth; // calculated to be a %
	newLeftWidth = Math.max(newLeftWidth, 0);
	newLeftWidth = Math.min(newLeftWidth, 100);

	leftSide.style.width = `${newLeftWidth}%`;
};

const mouseUpHandler = function () {
	document.removeEventListener("mousemove", mouseMoveHandler);
	document.removeEventListener("mouseup", mouseUpHandler);
};

const ele = document.createElement("div");
const eleText = document.createTextNode("Hello World Text Node!");
ele.appendChild(eleText);
// ele.innerHTML = "Inner HTML Hello World!"
app.appendChild(ele);

// 21

const handler = function (e) {
	console.log("handler");
	e.target.removeEventListener(e.type, handler); // remove self
};

// * once just fires once, IE not supported
textarea.addEventListener("input", handler, { once: true });

// 22 create resizable split views, too much work lol, ok i'll do the simple case

const resizer = document.getElementById("resizer");
const leftSide22 = resizer.previousElementSibling;
const rightSide22 = resizer.nextElementSibling;
const resizableContainer = resizer.parentElement;

let x22 = 0;
let y22 = 0;

let letftWidth22 = 0;

const mouseDownHandler22 = function (e) {
	x22 = e.clientX;
	y22 = e.clientY;

	letftWidth22 = leftSide.getBoundingClientRect().width;

	document.addEventListener("mousemove", mouseMoveHandler22);
	document.addEventListener("mouseup", mouseUpHandler22);
};

resizer.addEventListener("mousedown", mouseDownHandler22);

const mouseMoveHandler22 = function (e) {
	const dx = e.clientX - x22;
	const dy = e.clientY - y22;

	resizer.style.cursor = "col-resize";
	document.body.style.cursor = "col-resize";

	leftSide22.style.userSelect = "none";
	leftSide22.style.pointerEvents = "none";

	rightSide22.style.userSelect = "none";
	rightSide22.style.pointerEvents = "none";

	const newWidth =
		((letftWidth22 + dx) * 100) /
		resizableContainer.getBoundingClientRect().width;
	leftSide22.style.width = `${newWidth}%`;
};

const mouseUpHandler22 = function (e) {
	resizer.style.removeProperty("cursor");
	document.body.style.removeProperty("cursor");

	leftSide22.style.removeProperty("user-select");
	leftSide22.style.removeProperty("pointer-events");

	rightSide22.style.removeProperty("user-select");
	rightSide22.style.removeProperty("pointer-events");
	document.removeEventListener("mousemove", mouseMoveHandler22);
	document.removeEventListener("mouseup", mouseUpHandler22);
};

// 24

const box = document.getElementsByClassName("box")[0];

document.addEventListener("click", function (e) {
	const isClickedOutside = !box.contains(e.target); // element.contains(), whether an element is a descendant of the given node
	console.log("clicked outside", isClickedOutside);
	console.log("active element (focus)", document.activeElement); // 25
});

textarea.addEventListener("keydown", (e) => {
	const capsLockOn = e.getModifierState("CapsLock");
	h2.textContent = capsLockOn ? "Caps on" : "Caps off";
	console.log("which", e.which); // which key is pressed
	console.log("shift", e.shiftKey); // if shiftKey pressed
});

// 27
const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
console.log(navigator.platform); // tells you what platform you are on
console.log("is Mac browser", isMacBrowser);

// 28

const boxStyles = window.getComputedStyle(box);
const boxBoundingClientRect = box.getBoundingClientRect(); // height width includes padding and border

// clientHeight, clientWidth includes only padding
const boxHeight =
	box.clientHeight -
	parseFloat(boxStyles.paddingTop) -
	parseFloat(boxStyles.paddingBottom);
const boxWidth =
	box.clientHeight -
	parseFloat(boxStyles.paddingLeft) -
	parseFloat(boxStyles.paddingRight);

// The size include padding and border, like getBoundingClientRect()
const boxoffsetHeight = box.offsetHeight;
const boxoffsetWidth = box.offsetWidth;

// to get margin, just use parseFloat(styles.marginTop) and parseFloat(style.marginBottom), and also marginLeft and marginRIght from styles

// 29
textarea.addEventListener("mousedown", (e) => {
	console.log("e.button", e.button);
});

// 30

const data = JSON.stringify({ message: "hello world" });

const blob = new Blob([data], { type: "application/json" });

const url = window.URL.createObjectURL(blob);

const link = document.createElement("a");
link.toggleAttribute("download");
// link.href = "favicon.ico";
link.href = url;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

window.URL.revokeObjectURL(url);

// finished 44, on 45 5/3/2020
