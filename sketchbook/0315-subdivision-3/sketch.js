// risou, 2023
// https://github.com/risoume/daily-sketch
// ideas: subdivision, nested rectangle
// color palette gruvbox

const palette = [
	'#282828', '#ebdbb2', '#fb4934', '#b8bb26', '#fabd2f',
	'#83a598', '#d3869b', '#8ec07c', '#a89984', '#fe8019',
];

const pad = 20;

function setup() {
	createCanvas(600, 600);
	// pixelDensity(4);
	noLoop();
}

function draw() {
	background(palette[1]);
	stroke(palette[0]);
	const palette2 = shuffle(palette);

	divs = subDivide(pad, pad, width-2*pad, height-2*pad, 7);
	divs.forEach((div, i) => {
		makeNestedCard(div.x, div.y, div.wide, div.high, palette2[i % palette2.length], 5);
	});
}

function subDivide(_x, _y, _w, _h, _n) {
	const divs = [];

	function subDiv(x, y, w, h, n) {
		if (n === 0) {
			divs.push({
				x, 
				y, 
				wide: w,
				high: h,
			});
			return;
		}

		// vertical or horizontal split
		const vsplit = random([true, false]);

		// the ratio of the first resulting side to original side
		const mult = random(0.3, 0.8);

		if (vsplit) {
			let wLeft = w*mult;
			subDiv(x, y, wLeft, h, n-1);
			subDiv(x+wLeft, y, w-wLeft, h, n-1);
		} else {
			let hTop = h*mult;
			subDiv(x, y, w, hTop, n-1);
			subDiv(x, y+hTop, w, h-hTop, n-1);
		}
	}

	subDiv(_x, _y, _w, _h, _n);
	return divs;
}

// for a nice result, n (nesting depth) should be an odd number
function makeNestedCard(x, y, wide, high, bg, n) {
	push();
	translate(x+wide/2, y+high/2);
	const r = 0.98;

	for (let i = 1; i <= n; i++) {
		if (i % 2 === 1) {
			fill(bg);
		} else {
			fill(palette[1]);
		}

		rect(-wide/2, -high/2, wide, high);

		wide *= r;
		high *= r;
	}
	pop();
}

function mouseClicked() {redraw();}
function keyReleased() {if (key === 's') save('res.jpg');}
