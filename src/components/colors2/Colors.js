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
	rat = y / colorPickerHeight;
	var w;
	if (rat <= 0.5) {
		w = 255 - (rat / 0.5) * 255;
	} else {
		w = ((0.5 - rat) / 0.5) * 255;
	}
	r += w;
	g += w;
	b += w;

	return "rgb(" + r + "," + g + "," + b + ")";
};

const getCellsColors = (cells, cellMarkers) => {
	// add all colors
	for (var i = 0; i < cellMarkers.length; i++) {
		for (var j = i + 1; j < cellMarkers.length; j++) {
			const a = cellMarkers[i],
				b = cellMarkers[j];
			const diffX = a.x - b.x,
				diffY = a.y - b.y;
			const cellA = cells[a.x][a.y],
				cellB = cells[b.x][b.y];
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
		}
	}
	cellMarkers.forEach(({ x, y }, i) => {});

	// mix
	// return
	return cells;
};

// ////

const startingHighlight = { x: -1, y: -1 };
const startingPalletColors = [
	"#000",
	"#000",
	"#000",
	"#000",
	"#000",
	"#000",
	"#000",
	"#000",
	"#000",
	"#000",
];
const selectedColor = "#969600";
const startingCells = [...Array(gridXCount).keys()].map((x) =>
	[...Array(gridYCount).keys()].map((y) => ({ color: "transparent" }))
);

export default function Colors() {
	const [highlight, setHighlight] = useState(startingHighlight);
	const [cells, setCells] = useState(startingCells);
	const [cellMarkers, setCellMarkers] = useState([]);
	const [coords, setCoords] = useState({ x: -1, y: -1 });
	const [palletColors, setPalletColors] = useState([startingPalletColors]);
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
			newCells[x][y].color = palletColors[selectedPalletIdx];
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
		setCoords(newCoords);

		const newColor = getColorFromPos(newCoords);
		if (selectedPalletIdx >= 0) {
			const newPalletColors = palletColors;
			newPalletColors[selectedPalletIdx] = newColor;
			setPalletColors(newPalletColors);
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
			</>
		);
	};

	const ColorPallet = () => {
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
						const idx = i * 4 + j;
						return (
							<rect
								key={idx}
								x={colorPalletX + (padding + pallet) * (j + 1)}
								y={colorPalletY + (pallet + padding) * i}
								width={pallet}
								height={pallet}
								fill={palletColors[idx]}
								stroke={
									selectedPalletIdx === idx
										? selectedColor
										: "transparend"
								}
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
					strokeWidth={1}
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
				style={{ border: "1px solid black", margin: padding }}
			>
				<Grid />
				<ColorPicker />
				<ColorPallet />
			</svg>

			<div style={{ position: "absolute", bottom: 0, right: 0 }}>
				<p>
					Coords:
					<br />
					X: {coords.x}
					<br />
					Y: {coords.y}
					<br />
					Color:{" "}
					{palletColors.map((c, i) => (
						<span key={i}>{c}</span>
					))}
				</p>
			</div>
		</div>
	);
}
