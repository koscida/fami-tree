import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { Box } from "@mui/material";

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
const drawLine = (ctx, x1, y1, x2, y2) => {
	ctx.beginPath();

	ctx.strokeStyle = "#bbb";
	ctx.lineWidth = 0.5;

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);

	ctx.stroke();
};
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

const defaultColor = "#ff000022";

export default function Colors() {
	const [canvasInfo, setCanvasInfo] = useState({
		cellSize: 20,
		canvasSize: { w: 0, h: 0 },
		numCells: { w: 0, h: 0 },
	});
	const [picker, setPicker] = useState({
		pos: { x: 0, y: 0 },
		meta: {
			w: 255,
			h: 255,
			x: 0,
			y: 0,
			x1: 0,
			y1: 0,
			x2: 255,
			y2: 255,
			color: "#888",
			padding: 4,
			scrollPadding: 5,
		},
		isDragging: false,
		hoverColor: defaultColor,
		selectedColor: defaultColor,
		pastColors: [],
	});
	const [cells, setCells] = useState([]);

	useEffect(() => {
		// update canvas size
		const canvasSize = { w: window.innerWidth, h: window.innerHeight };

		// cells based on canvas size
		const numCells = {
			w: Math.ceil(canvasSize.w / canvasInfo.cellSize),
			h: Math.ceil(canvasSize.h / canvasInfo.cellSize),
		};

		// update
		setCanvasInfo({ ...canvasInfo, canvasSize, numCells });

		// picker based on canvas size
		const x1 =
			canvasSize.w -
			picker.meta.w -
			picker.meta.padding * 2 -
			picker.meta.scrollPadding;
		const y1 = 0 + picker.meta.padding + picker.meta.scrollPadding;
		const meta = {
			...picker.meta,
			x: x1 - picker.meta.padding,
			y: y1 + picker.meta.padding,
			x1,
			y1,
			x2: x1 + picker.meta.w,
			y2: y1 + picker.meta.h,
		};
		// update
		setPicker({ ...picker, meta });

		// empty cells
		const newCells = [...Array(numCells.h).keys()].map((y) =>
			[...Array(numCells.w).keys()].map((x) => [])
		);
		setCells(newCells);
	}, []);

	//
	// common
	const drawGrid = (ctx) => {
		// vertical lines
		[...Array(canvasInfo.numCells.w).keys()].forEach((i) => {
			drawLine(
				ctx,
				i * canvasInfo.cellSize,
				0,
				i * canvasInfo.cellSize,
				canvasInfo.canvasSize.h
			);
		});
		// horizontal lines
		[...Array(canvasInfo.numCells.h).keys()].forEach((i) => {
			drawLine(
				ctx,
				0,
				i * canvasInfo.cellSize,
				canvasInfo.canvasSize.w,
				i * canvasInfo.cellSize
			);
		});
	};
	const drawBlock = (ctx, x, y, color = null) => {
		drawSquare(ctx, x, y, canvasInfo.cellSize, canvasInfo.cellSize, color);
	};

	// ////
	// Color Picker
	const drawColorPicker = (ctx) => {
		const { x, y, w, h, x1, y1, x2, y2, color, padding, scrollPadding } =
			picker.meta;

		// ////
		// color picker
		const pickWPad = w + padding * 2;
		const pickHPad = h + padding * 2;

		// background
		drawSquare(ctx, x1 - padding, y1 - padding, pickWPad, pickHPad, color);

		// Create color gradient (red, magenta, blue, teal, green, yellow, red)
		var colorStops = [
			{ offset: 0, color: "rgb(255,   0,   0)" },
			{ offset: 0.15, color: "rgb(255,   0, 255)" },
			{ offset: 0.33, color: "rgb(0,     0, 255)" },
			{ offset: 0.49, color: "rgb(0,   255, 255)" },
			{ offset: 0.67, color: "rgb(0,   255,   0)" },
			{ offset: 0.84, color: "rgb(255, 255,   0)" },
			{ offset: 1, color: "rgb(255,   0,   0)" },
		];
		drawGradient(ctx, x1, y1, x2, y2, "horizontal", colorStops);

		// Create semi transparent gradient (white -> transparent -> black)
		colorStops = [
			{ offset: 0, color: "rgba(255, 255, 255, 1)" },
			{ offset: 0.5, color: "rgba(255, 255, 255, 0)" },
			{ offset: 0.5, color: "rgba(0,     0,   0, 0)" },
			{ offset: 1, color: "rgba(0,     0,   0, 1)" },
		];
		drawGradient(ctx, x1, y1, x2, y2, "vertical", colorStops);

		// ////
		// selected color
		const selectedH = 20;
		const selectedHPad = selectedH + padding;
		const selectedY = y2 + padding;

		// background
		drawSquare(ctx, x1 - padding, selectedY, pickWPad, selectedHPad, color);

		// selected (first place)
		drawSquare(
			ctx,
			x1,
			selectedY,
			selectedH,
			selectedH,
			picker.selectedColor
		);

		// past selected (second - seventh place)
		let pastX = x1;
		picker.pastColors.forEach((color) => {
			pastX += selectedHPad;
			drawSquare(ctx, pastX, selectedY, selectedH, selectedH, color);
		});

		// mouse move (last place)
		drawSquare(
			ctx,
			x2 - selectedH,
			selectedY,
			selectedH,
			selectedH,
			picker.hoverColor
		);
	};

	// ////
	// handlers
	const handleInteraction = (event) => {
		const { clientX, clientY } = event;
		const x = Math.floor(clientX / canvasInfo.cellSize);
		const y = Math.floor(clientY / canvasInfo.cellSize);

		let { isDragging, hoverColor, selectedColor, pastColors } = picker;

		// set new position
		const pos = { x, y };

		// if dragging
		if (
			(event.type === "mousedown" ||
				(event.type === "mousemove" && picker.isDragging)) &&
			(clientX < picker.meta.x || clientY > picker.meta.y)
		) {
			// set dragging
			isDragging = true;
			// if entering a new block
			if (picker.pos.x !== x || picker.pos.y !== y) {
				// add block to cell
				addBlock(x, y, selectedColor);
			}
		} else {
			isDragging = false;
		}

		// if in color picker
		if (
			clientX >= picker.meta.x1 &&
			clientX <= picker.meta.x2 &&
			clientY >= picker.meta.y1 &&
			clientY <= picker.meta.y2
		) {
			// is hovering on color picker
			hoverColor = getColorFromPos({ x: clientX, y: clientY });

			// select color
			if (event.type === "mousedown") {
				// move last selected to pastColors
				pastColors = [selectedColor, ...pastColors].slice(0, 6);

				// select new color
				selectedColor = hoverColor;
			}
		}

		// update picker
		setPicker({
			...picker,
			pos,
			hoverColor,
			isDragging,
			selectedColor,
			pastColors,
		});
	};

	const getColorFromPos = ({ x, y }) => {
		// x determines color
		// (red, magenta, blue, teal, green, yellow, red)
		// 	{ offset:    0, color: "rgb(255,   0,   0)" },
		// 	{ offset: 0.15, color: "rgb(255,   0, 255)" },
		// 	{ offset: 0.33, color: "rgb(0,     0, 255)" },
		// 	{ offset: 0.49, color: "rgb(0,   255, 255)" },
		// 	{ offset: 0.67, color: "rgb(0,   255,   0)" },
		// 	{ offset: 0.84, color: "rgb(255, 255,   0)" },
		// 	{ offset:    1, color: "rgb(255,   0,   0)" },
		var rat = (x - picker.meta.x1) / (picker.meta.x2 - picker.meta.x1);
		var r, g, b;
		if (rat <= 0.15) {
			r = 255;
			g = 0;
			b = (rat / 0.15) * 255;
		} else if (rat <= 0.33) {
			r = 255 - ((rat - 0.15) / (0.33 - 0.15)) * 255;
			g = 0;
			b = 255;
		} else if (rat <= 0.49) {
			r = 0;
			g = ((rat - 0.33) / (0.49 - 0.33)) * 255;
			b = 255;
		} else if (rat <= 0.67) {
			r = 0;
			g = 255;
			b = 255 - ((rat - 0.49) / (0.67 - 0.49)) * 255;
		} else if (rat <= 0.84) {
			r = ((rat - 0.67) / (0.84 - 0.67)) * 255;
			g = 255;
			b = 0;
		} else {
			r = 255;
			g = 255 - ((rat - 0.84) / (1 - 0.84)) * 255;
			b = 0;
		}

		// y determines transparency
		// (white -> transparent -> black)
		// 	{ offset: 0, color: "rgba(255, 255, 255, 1)" },
		// 	{ offset: 0.5, color: "rgba(255, 255, 255, 0)" },
		// 	{ offset: 0.5, color: "rgba(0,     0,   0, 0)" },
		// 	{ offset: 1, color: "rgba(0,     0,   0, 1)" },
		rat = (y - picker.meta.y1) / (picker.meta.y2 - picker.meta.y1);
		if (rat <= 0.5) {
			const w = 255 - (rat / 0.5) * 255;
			r += w;
			g += w;
			b += w;
		} else {
			const w = ((0.5 - rat) / 0.5) * 255;
			r += w;
			g += w;
			b += w;
		}

		return "rgb(" + r + "," + g + "," + b + ")";
	};

	const addBlock = (x, y, color) => {
		const newItem = { color };
		setCells(
			cells.map((cellRow, i) =>
				cellRow.map((cell, j) =>
					i === y && j === x ? [...cell, newItem] : cell
				)
			)
		);
	};

	// ////
	// draw
	const draw = (ctx) => {
		drawGrid(ctx);

		cells.forEach((cellRow, i) =>
			cellRow.forEach((cell, j) =>
				cell.forEach((block) =>
					drawBlock(
						ctx,
						j * canvasInfo.cellSize,
						i * canvasInfo.cellSize,
						block.color
					)
				)
			)
		);

		drawColorPicker(ctx);
	};

	// render
	return (
		<Box overflow={"hidden"}>
			<Canvas
				draw={draw}
				height={canvasInfo.canvasSize.h}
				width={canvasInfo.canvasSize.w}
				handleInteraction={handleInteraction}
			/>
			<Box
				position={"absolute"}
				bottom={0}
				right={0}
				backgroundColor={"#ffffff44"}
			>
				{false ? (
					<p>
						Picker:
						<br /> Pos: ({picker.pos.x}, {picker.pos.y})<br />
						Meta: x: {picker.meta.x}, y: {picker.meta.y},x1:{" "}
						{picker.meta.x1},y1: {picker.meta.y1},x2:{" "}
						{picker.meta.x2}
						,y2: {picker.meta.y2},
					</p>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
}
