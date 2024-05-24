import { useEffect, useState } from "react";
import Canvas from "./Canvas";

export default function Colors() {
	const [canvasInfo, setCanvasInfo] = useState({
		cellSize: 20,
		canvasSize: { w: 0, h: 0 },
		numCells: { w: 0, h: 0 },
	});
	const [cells, setCells] = useState([]);

	useEffect(() => {
		const canvasSize = { w: window.innerWidth, h: window.innerHeight };
		const numCells = {
			w: Math.ceil(canvasSize.w / canvasInfo.cellSize),
			h: Math.ceil(canvasSize.h / canvasInfo.cellSize),
		};
		setCanvasInfo({ ...canvasInfo, canvasSize, numCells });

		const newCells = [...Array(numCells.h).keys()].map((y) =>
			[...Array(numCells.w).keys()].map((x) => [])
		);
		setCells(newCells);
	}, []);

	// draw helpers
	const drawSquare = (ctx, x, y, color = null) => {
		// square
		ctx.beginPath();

		ctx.fillStyle = color ? color : "pink";

		ctx.lineWidth = "0";
		ctx.strokeStyle = "none";
		ctx.stroke();

		ctx.fillRect(x, y, canvasInfo.cellSize, canvasInfo.cellSize);
	};

	const drawLine = (ctx, x1, y1, x2, y2) => {
		ctx.beginPath();

		ctx.strokeStyle = "#bbb";
		ctx.lineWidth = 0.5;

		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);

		ctx.stroke();
	};

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
	const clearGrid = (ctx) => {
		ctx.beginPath();

		ctx.fillStyle = "white";

		ctx.lineWidth = "0";
		ctx.strokeStyle = "none";
		ctx.stroke();

		ctx.fillRect(0, 0, canvasInfo.canvasSize.w, canvasInfo.canvasSize.h);
	};

	// handlers

	const handleClick = (event) => {
		const { clientX, clientY } = event;

		const x = Math.floor(clientX / canvasInfo.cellSize);
		const y = Math.floor(clientY / canvasInfo.cellSize);

		setCells(
			cells.map((cellRow, i) =>
				cellRow.map((cell, j) =>
					i === y && j === x
						? [...cell, { color: "#ff000011" }]
						: cell
				)
			)
		);
	};

	// draw
	const draw = (ctx) => {
		// clear
		clearGrid(ctx);

		// begin
		drawSquare(ctx, 0, 0, "yellow");

		drawGrid(ctx);

		cells.forEach((cellRow, i) =>
			cellRow.forEach((cell, j) =>
				cell.forEach((square) =>
					drawSquare(
						ctx,
						j * canvasInfo.cellSize,
						i * canvasInfo.cellSize,
						square.color
					)
				)
			)
		);
	};

	// render
	return (
		<>
			<Canvas
				draw={draw}
				height={canvasInfo.canvasSize.h}
				width={canvasInfo.canvasSize.w}
				onClick={handleClick}
			/>
		</>
	);
}
