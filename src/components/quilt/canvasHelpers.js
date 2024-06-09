// draw helpers
const drawSquare = (ctx, x, y, w, h, color = null) => {
	// square
	ctx.beginPath();

	ctx.fillStyle = color ? color : "pink";

	ctx.lineWidth = "0";
	ctx.strokeStyle = "none";
	ctx.stroke();

	ctx.fillRect(x, y, w, h);
};
exports.drawSquare = drawSquare;

const drawLine = (ctx, x1, y1, x2, y2) => {
	ctx.beginPath();

	ctx.strokeStyle = "#bbb";
	ctx.lineWidth = 0.5;

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);

	ctx.stroke();
};
exports.drawLine = drawLine;

const drawGradient = (ctx, x1, y1, x2, y2, direction, colorStops) => {
	var gradient =
		direction === "vertical"
			? ctx.createLinearGradient(x1, y1, x1, y2)
			: ctx.createLinearGradient(x1, y1, x2, y1);
	colorStops.forEach((colorStop) =>
		gradient.addColorStop(colorStop.offset, colorStop.color)
	);

	// Apply gradient to canvas
	ctx.fillStyle = gradient;
	ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
};
exports.drawGradient = drawGradient;
