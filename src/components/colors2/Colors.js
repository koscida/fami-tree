import { useState } from "react";

const frameWidth = window.innerWidth;
const frameHeight = window.innerHeight;
const padding = 5;

const canvasWidth = frameWidth - padding * 2;
const canvasHeight = frameHeight - padding * 2;

const colorPickerWidth = 200,
	colorPickerHeight = 200,
	colorPickerX = frameWidth - colorPickerWidth - padding * 3,
	colorPickerY = 0 + padding;

const gridWidth = canvasWidth - colorPickerWidth - padding * 3,
	gridHeight = canvasHeight;
const cellSize = 10;
const gridXCount = Math.floor(gridWidth / cellSize),
	gridYCount = Math.floor(gridHeight / cellSize);

// ////

const drawLine = (
	x1,
	y1,
	x2,
	y2,
	styles = { stroke: "#bbb", strokeWidth: "1" }
) => <line x1={x1} y1={y1} x2={x2} y2={y2} style={styles} />;

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
	var rat = x / colorPickerWidth;
	var red, green, blue;
	if (rat <= 0.15) {
		red = 255;
		green = 0;
		blue = (rat / 0.15) * 255;
	} else if (rat <= 0.33) {
		red = 255 - ((rat - 0.15) / (0.33 - 0.15)) * 255;
		green = 0;
		blue = 255;
	} else if (rat <= 0.49) {
		red = 0;
		green = ((rat - 0.33) / (0.49 - 0.33)) * 255;
		blue = 255;
	} else if (rat <= 0.67) {
		red = 0;
		green = 255;
		blue = 255 - ((rat - 0.49) / (0.67 - 0.49)) * 255;
	} else if (rat <= 0.84) {
		red = ((rat - 0.67) / (0.84 - 0.67)) * 255;
		green = 255;
		blue = 0;
	} else {
		red = 255;
		green = 255 - ((rat - 0.84) / (1 - 0.84)) * 255;
		blue = 0;
	}

	// y determines transparency
	// (white -> transparent -> black)
	// 	{ offset: 0, color: "rgba(255, 255, 255, 1)" },
	// 	{ offset: 0.5, color: "rgba(255, 255, 255, 0)" },
	// 	{ offset: 0.5, color: "rgba(0,     0,   0, 0)" },
	// 	{ offset: 1, color: "rgba(0,     0,   0, 1)" },
	rat = y / colorPickerHeight;
	var w;
	if (rat <= 0.5) {
		w = 255 - (rat / 0.5) * 255;
	} else {
		w = ((0.5 - rat) / 0.5) * 255;
	}
	red += w;
	green += w;
	blue += w;

	// limit range
	red = Math.max(0, Math.min(255, Math.round(red)));
	green = Math.max(0, Math.min(255, Math.round(green)));
	blue = Math.max(0, Math.min(255, Math.round(blue)));

	// return
	return {
		color: "rgb(" + red + "," + green + "," + blue + ")",
		red,
		green,
		blue,
	};
};

const getCellsColors = (cells, cellMarkers) => {
	// add all colors
	for (var i = 0; i < cellMarkers.length; i++) {
		for (var j = i + 1; j < cellMarkers.length; j++) {
			const a = cellMarkers[i],
				b = cellMarkers[j];
			const cellA = cells[a.x][a.y],
				cellB = cells[b.x][b.y];
			const diffX = Math.abs(a.x - b.x),
				diffY = Math.abs(a.y - b.y),
				maxX = Math.max(a.x, b.x),
				minX = Math.min(a.x, b.x),
				maxY = Math.max(a.y, b.y),
				minY = Math.min(a.y, b.y);
			const diffRed = Math.abs(cellA.red - cellB.red),
				diffGreen = Math.abs(cellA.green - cellB.green),
				diffBlue = Math.abs(cellA.blue - cellB.blue);
			console.log(
				" a: ",
				a,
				" b: ",
				b,
				" diffX: ",
				diffX,
				" diffY: ",
				diffY,
				" cellA: ",
				cellA,
				" cellB: ",
				cellB
			);

			// create the path
			const distMax = Math.max(diffX, diffY);
			let stepX, stepY, stepRed, stepGreen, stepBlue, color;
			for (var d = 1; d < distMax; d++) {
				const xDir = a.x <= b.x ? 1 : -1,
					yDir = a.y <= b.y ? 1 : -1,
					redDir = cellA.red <= cellB.red ? 1 : -1,
					greenDir = cellA.green <= cellB.green ? 1 : -1,
					blueDir = cellA.blue <= cellB.blue ? 1 : -1,
					ratio = d / distMax;

				// move x
				stepX = a.x + xDir * Math.round(ratio * diffX);

				// move y
				stepY = a.y + yDir * Math.round(ratio * diffY);

				// move color
				stepRed = cellA.red + redDir * Math.round(ratio * diffRed);
				stepGreen =
					cellA.green + greenDir * Math.round(ratio * diffGreen);
				stepBlue = cellA.blue + blueDir * Math.round(ratio * diffBlue);
				color = `rgb(${stepRed}, ${stepGreen}, ${stepBlue})`;
				console.log(
					" stepRed: ",
					stepRed,
					" stepGreen: ",
					stepGreen,
					" stepBlue: ",
					stepBlue,
					" color: ",
					color
				);

				// color path
				cells[stepX][stepY] = {
					color,
					red: stepRed,
					blue: stepGreen,
					green: stepBlue,
				};
			}
		}
	}
	cellMarkers.forEach(({ x, y }, i) => {});

	// mix
	// return
	return cells;
};

// ////

const startingHighlight = { x: -1, y: -1 };
const startingPalletColors = {
	0: { color: "rgb(255, 255,   0)", red: 255, green: 255, blue: 0 },
	1: { color: "rgb(0,   255, 255)", red: 0, green: 255, blue: 255 },
	2: { color: "rgb(255,   0, 255)", red: 255, green: 0, blue: 255 },
	3: { color: "rgb(200, 200, 200)", red: 200, green: 200, blue: 200 },
	4: { color: "rgb(100, 100, 100)", red: 100, green: 100, blue: 100 },

	5: { color: "rgb(0,   255,   0)", red: 0, green: 255, blue: 0 },
	6: { color: "rgb(0,     0, 255)", red: 0, green: 0, blue: 255 },
	7: { color: "rgb(255,   0,   0)", red: 255, green: 0, blue: 0 },
	8: { color: "rgb(255, 255, 255)", red: 255, green: 255, blue: 255 },
	9: { color: "rgb(0,     0,   0)", red: 0, green: 0, blue: 0 },
};
const selectedColor = "#969600";
const startingCells = [...Array(gridXCount).keys()].map((x) =>
	[...Array(gridYCount).keys()].map((y) => ({ color: "transparent" }))
);

export default function Colors() {
	const [highlight, setHighlight] = useState(startingHighlight);
	const [cells, setCells] = useState(startingCells);
	const [cellMarkers, setCellMarkers] = useState([]);
	const [palletColors, setPalletColors] = useState(startingPalletColors);
	const [selectedDelete, setSelectedDelete] = useState(false);
	const [selectedPalletIdx, setSelectedPalletIdx] = useState(null);

	// ////

	const handleCellHighlight = (x, y) => {
		const newHighlight = { x, y };
		setHighlight(
			highlight.x === newHighlight.x && highlight.y === newHighlight.y
				? startingHighlight
				: newHighlight
		);

		if (selectedPalletIdx >= 0) {
			// set new markers
			const newCellMarkers = [
				...cellMarkers.filter(
					({ x, y }) => x !== newHighlight.x && y !== newHighlight.y
				),
				newHighlight,
			];
			setCellMarkers(newCellMarkers);

			// reset cell grid with colors

			// 1. set new color
			let newCells = cells;
			newCells[x][y] = palletColors[selectedPalletIdx];
			// 2. run cell color algorithm
			newCells = getCellsColors(newCells, newCellMarkers);
			// 3. set
			setCells(newCells);
		}
	};

	const handleColorSelect = (e) => {
		// console.log(e);
		const newCoords = {
			x: e.clientX - colorPickerX - padding,
			y: e.clientY - colorPickerY - padding,
		};

		const newColor = getColorFromPos(newCoords);

		if (selectedPalletIdx >= 0) {
			setPalletColors({ ...palletColors, [selectedPalletIdx]: newColor });
		}
	};

	const handleDeleteSelect = () => {
		const newSelectedDelete = !selectedDelete;
		setSelectedDelete(newSelectedDelete);
		if (newSelectedDelete) {
			setSelectedPalletIdx(null);
		}
	};

	const handlePalletSelect = (i) => {
		setSelectedPalletIdx(i);
		setSelectedDelete(false);
	};

	// ////

	const ColorPicker = () => {
		const colorStops = [
			{ offset: 0, color: "rgb(255,   0,   0)" },
			{ offset: 0.15, color: "rgb(255,   0, 255)" },
			{ offset: 0.33, color: "rgb(0,     0, 255)" },
			{ offset: 0.49, color: "rgb(0,   255, 255)" },
			{ offset: 0.67, color: "rgb(0,   255,   0)" },
			{ offset: 0.84, color: "rgb(255, 255,   0)" },
			{ offset: 1, color: "rgb(255,   0,   0)" },
		];
		const transparentStops = [
			{ offset: 0, color: "rgba(255, 255, 255, 1)" },
			{ offset: 0.5, color: "rgba(255, 255, 255, 0)" },
			{ offset: 0.5, color: "rgba(0,     0,   0, 0)" },
			{ offset: 1, color: "rgba(0,     0,   0, 1)" },
		];

		return (
			<>
				{/* Background */}
				<rect
					width={colorPickerWidth + padding * 3}
					height={frameHeight}
					x={colorPickerX - padding * 2}
					y={colorPickerY - padding}
					fill="#eaecef"
				/>

				{/* Background */}
				<rect
					width={colorPickerWidth + padding * 2}
					height={colorPickerHeight + padding * 2}
					x={colorPickerX - padding}
					y={colorPickerY - padding}
					fill="#aaa"
				/>

				{/* Create color gradient (red, magenta, blue, teal, green, yellow, red) */}
				<defs>
					<linearGradient
						id="colorStops"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						{colorStops.map((stop, i) => (
							<stop
								key={i}
								offset={stop.offset}
								stopColor={stop.color}
							/>
						))}
					</linearGradient>
				</defs>
				<rect
					width={colorPickerWidth}
					height={colorPickerHeight}
					x={colorPickerX}
					y={colorPickerY}
					fill="url(#colorStops)"
				/>

				{/* Create semi transparent gradient (white -> transparent -> black) */}
				<defs>
					<linearGradient
						id="transparentStops"
						x1="0%"
						y1="0%"
						x2="0%"
						y2="100%"
					>
						{transparentStops.map((stop, i) => (
							<stop
								key={i}
								offset={stop.offset}
								stopColor={stop.color}
							/>
						))}
					</linearGradient>
				</defs>
				<rect
					width={colorPickerWidth}
					height={colorPickerHeight}
					x={colorPickerX}
					y={colorPickerY}
					fill="url(#transparentStops)"
				/>

				{/* Select */}
				<rect
					width={colorPickerWidth}
					height={colorPickerHeight}
					x={colorPickerX}
					y={colorPickerY}
					fill="transparent"
					stroke="transparent"
					onClick={handleColorSelect}
				/>

				{/* Pallet  */}
				<ColorPickerPallet />
			</>
		);
	};

	const ColorPickerPallet = () => {
		const pallet = 30,
			colorPalletX = colorPickerX - padding,
			colorPalletY = colorPickerY + colorPickerHeight + padding * 2;

		return (
			<>
				<rect
					x={colorPalletX}
					y={colorPalletY}
					width={pallet}
					height={pallet}
					fill={"transparent"}
					stroke={selectedDelete ? selectedColor : "black"}
					strokeWidth={1}
				/>
				<text
					x={colorPalletX + (1 / 8) * pallet}
					y={colorPalletY + (2 / 3) * pallet}
					width={pallet}
					textLength={pallet}
					height={pallet}
					onClick={handleDeleteSelect}
				>
					🚫
				</text>

				{[0, 1].map((i) =>
					[0, 1, 2, 3, 4].map((j) => {
						const idx = i * 5 + j;
						return (
							<rect
								key={idx}
								x={colorPalletX + (padding + pallet) * (j + 1)}
								y={colorPalletY + (pallet + padding) * i}
								width={pallet}
								height={pallet}
								fill={palletColors[idx].color}
								stroke={
									selectedPalletIdx === idx
										? selectedColor
										: "transparent"
								}
								strokeWidth={2}
								onClick={() => handlePalletSelect(idx)}
							/>
						);
					})
				)}
			</>
		);
	};

	const Grid = () => {
		const gridWidthAdj = gridXCount * cellSize,
			gridHeightAdj = gridYCount * cellSize;

		return (
			<>
				{/* background */}
				<rect
					width={gridWidthAdj + 1}
					height={gridHeightAdj + 1}
					x={0}
					y={0}
					fill="transparent"
					stroke={"black"}
					strokeWidth={0}
				/>

				{[...Array(gridXCount).keys()].map((x) =>
					[...Array(gridYCount).keys()].map((y) => {
						const idx = y + x * gridXCount;
						return (
							<rect
								key={idx}
								width={cellSize - 1}
								height={cellSize - 1}
								x={x * cellSize + 1}
								y={y * cellSize + 1}
								fill={cells[x][y].color}
								stroke={
									highlight.x === x && highlight.y === y
										? "#f00"
										: "#fafafa"
								}
								strokeWidth={1}
								onClick={() => handleCellHighlight(x, y)}
							/>
						);
					})
				)}
			</>
		);
	};

	// ////

	return (
		<div
			style={{
				overflow: "hidden",
				width: frameWidth,
				height: frameHeight,
			}}
		>
			<svg
				width={canvasWidth}
				height={canvasHeight}
				style={{ border: "0px solid black", margin: padding }}
			>
				<Grid />
				<ColorPicker />
			</svg>

			<div style={{ position: "absolute", bottom: 0, right: 0 }}>
				<p></p>
			</div>
		</div>
	);
}
