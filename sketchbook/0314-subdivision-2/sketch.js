// risou, 2023
// https://github.com/risoume/daily-sketch
// ideas: subdivision, cubism?
// color palette gruvbox

const palette = [
	'#282828', '#ebdbb2', '#fb4934', '#b8bb26', '#fabd2f',
	'#83a598', '#d3869b', '#8ec07c', '#a89984', '#fe8019',
];

const pad = 20;

// store position, wide, and high of resulting subdivision
let divs = [];

function setup() {
	createCanvas(600, 600);
	// pixelDensity(4);
	noLoop();
}

function draw() {
	background(palette[1]);
	noStroke();
	const palette2 = shuffle(palette);

	divs = subDivide(pad, pad, width-2*pad, height-2*pad, 5);
	divs.forEach((div, i) => {
		makeClassicCard(div.x, div.y, div.wide, div.high);
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

function makeClassicCard(x, y, wide, high) {
	push();
	translate(x, y);
	const palette2 = shuffle(palette);

	if (wide > high) {
		fill(palette2[0]);
		rect(0, 0, wide, high/2);
		fill(palette2[1]);
		rect(0, high/2, wide, high/2);
		fill(palette2[2]);
		arc(0, high/2, high, high, 3*HALF_PI, 5*HALF_PI);
		fill(palette2[3]);
		arc(wide, high/2, high, high, HALF_PI, 3*HALF_PI);
	} else {
		fill(palette2[0]);
		rect(0, 0, wide/2, high);
		fill(palette2[1]);
		rect(wide/2, 0, wide/2, high);
		fill(palette2[2]);
		arc(wide/2, 0, wide, wide, 0, PI);
		fill(palette2[3]);
		arc(wide/2, high, wide, wide, PI, TAU);
	}
	pop();
}

function mouseClicked() {redraw();}
function keyReleased() {if (key === 's') save('res.jpg');}
