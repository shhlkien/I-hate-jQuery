function getElementY(element) {
	return window.pageYOffset + document.querySelector('#' + element).getBoundingClientRect().top;
}

function smoothScrolling(element, duration) {
	element = element.href.split('#').pop();
	// console.log(element.href.split('#').pop());
	console.log(element);
	var startingY = window.pageYOffset;
	var elementY = getElementY(element);
	// If element is close to page's bottom then window will scroll only to some position above the element.
	var targetY =
		document.body.scrollHeight - elementY < window.innerHeight
			? document.body.scrollHeight - window.innerHeight
			: elementY;
	var diff = targetY - startingY;
	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	var easing = function(t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	};
	var start;

	if (!diff) return;

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
		if (!start) start = timestamp;
		// Elapsed miliseconds since start of scrolling.
		var time = timestamp - start;
		// Get percent of completion in range [0, 1].
		var percent = Math.min(time / duration, 1);
		// Apply the easing.
		// It can cause bad-looking slow frames in browser performance tool, so be careful.
		percent = easing(percent);

		window.scrollTo(0, startingY + diff * percent);

		// Proceed with animation as long as we wanted it to.
		if (time < duration) {
			window.requestAnimationFrame(step);
		}
	});
}

// Apply event handlers. Example of firing the scrolling mechanism.
// document.getElementById('scrollMid').addEventListener('click', doScrolling.bind(null, '#middle', 1000))
// document.getElementById('scrollTop').addEventListener('click', doScrolling.bind(null, '#top', 1500))
// document.getElementById('scrollBot').addEventListener('click', doScrolling.bind(null, '#bottom', 1000))

document.querySelectorAll("a[href*='#']:not([href='#'])").forEach(function(el) {
	el.addEventListener("click", function(e) {
		// e.preventDefault();
		doScrolling(this, 1500);
	});
});
