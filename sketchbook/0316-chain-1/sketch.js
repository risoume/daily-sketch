// risou, 2023
// https://github.com/risoume/daily-sketch
// ideas: chain, minimal, shadow
// color palette onehalf

const palette = [
	'#282c34', '#dcdfe4', '#e06c75', '#98c379',
	'#e5c07b', '#61afef', '#c678dd', '#56b6c2',
];

const pad = 20;

function setup() {
	createCanvas(600, 600);
	// pixelDensity(4);
	noLoop();
}

function draw() {
	background(palette[0]);
	fill('#f5f5f5');
	rect(pad, pad, width-2*pad, height-2*pad);
	translate(pad, pad);
	chainGallery();
}

function chainGallery() {
	const margin = 20;
	const spacing = 15;
	const drawingWide = width-2*pad-2*margin;
	const drawingHigh = drawingWide;
	let chainNum = int(random(2, 7)); 
	let diam = (drawingHigh - spacing*(chainNum-1)) / chainNum;
	
	// constraint: 0 <= thickness <= diam/4 
	let thickness = random(diam/4);
	// thickness = diam/4-5;
	
	// constraint: 0 <= shadowOff <= diam/4-thickness
	let shadowOff = random(diam/4-thickness);
	// shadowOff = 0;

	// constraint: 0 <= offset <= diam/2-2*thickness-1.5*shadowOff
	let offset = random(diam/2-2*thickness-1.5*shadowOff);
	// offset = 0;

	let ringDistance = diam-2*thickness-shadowOff-offset;

	// maximum number of rings that can fit in drawingWide
	let ringNum = floor((drawingWide+ringDistance-diam) / ringDistance);

	let freeSpace = drawingWide-diam-ringDistance*(ringNum-1);

	for (let i = 0; i < chainNum; i++) {
		simpleChain(margin+freeSpace/2, margin+(diam+spacing)*i, diam,
			thickness, ringNum, ringDistance, shadowOff);
	}
}

function simpleChain(x, y, diam, thickness, ringNum, ringDistance, shadowOff){
	push();
	translate(x+diam/2, y+diam/2);
	noFill();
	strokeCap(SQUARE);
	strokeWeight(thickness);
	const shadow = '#00000080';

	// draw lower half of chain
	for (let i = 0; i < ringNum; i++) {
		stroke(shadow);
		arc(ringDistance*i+shadowOff, 0, diam-thickness, diam-thickness, 0, PI);
		stroke(palette[i % palette.length]);
		arc(ringDistance*i, 0, diam-thickness, diam-thickness, 0, PI);
	}

	// draw upper half of chain in the opposite order
	for (let i = ringNum-1; i >= 0; i--) {
		stroke(shadow);
		arc(ringDistance*i+shadowOff, 0, diam-thickness, diam-thickness, PI, TAU);
		stroke(palette[i % palette.length]);
		arc(ringDistance*i, 0, diam-thickness, diam-thickness, PI, TAU);
	}
	pop();
}

function mouseClicked() {redraw();}
function keyReleased() {if (key === 's') save('res.jpg');}
