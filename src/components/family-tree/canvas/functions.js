export const canvasDrawDot = (ctx, x, y, name) => {
	// circle
	// ctx.arc(x, y, radius, startAngle, endAngle, [counterclockwise])
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, 2 * Math.PI);
	ctx.fill();

	// name
	// ctx.fillText(text, x, y, [maxwidth])
	ctx.fillStyle = "#ffffff";
	ctx.fillText(name, x, y);
};

export const canvasDrawLine = (ctx, x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
};
