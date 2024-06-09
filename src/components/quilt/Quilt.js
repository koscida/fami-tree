import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { drawSquare, drawLine, drawGradient } from "./canvasHelpers";
import { Box } from "@mui/material";
import QuiltOptions from "./QuiltOptions";
import QuiltBlock from "./obj/QuiltBlock";

export default function Quilt() {
	const [canvasInfo, setCanvasInfo] = useState({
		cellSize: 20,
		padding: 20,
		canvasSize: { w: 0, h: 0 },
		numCells: { w: 0, h: 0 },
	});
	const [canvasObjects, setCanvasObjects] = useState([]);

	useEffect(() => {
		// update canvas size
		const canvasSize = {
			w: window.innerWidth * 0.7 - canvasInfo.padding,
			h: window.innerHeight - canvasInfo.padding,
		};

		// cells based on canvas size
		const numCells = {
			w: Math.ceil(canvasSize.w / canvasInfo.cellSize),
			h: Math.ceil(canvasSize.h / canvasInfo.cellSize),
		};

		// update
		setCanvasInfo({ ...canvasInfo, canvasSize, numCells });
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

	// ////
	// handlers
	const handleInteraction = (event) => {
		const { clientX, clientY } = event;
	};

	//
	const addBlocks = (blockInfo) => {
		const { type } = blockInfo;
		if (type === "9block") {
			addCanvasPatch("9block");
		}
	};
	const addCanvasPatch = (type) => {
		const newQuiltBlock = new QuiltBlock(type);
		setCanvasObjects([...canvasObjects, newQuiltBlock]);
	};

	// ////
	// draw
	const draw = (ctx) => {
		drawGrid(ctx);

		canvasObjects.forEach((obj) => obj.draw(ctx));
	};

	return (
		<div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
			<div
				style={{
					overflow: "scroll",
					height: canvasInfo.canvasSize.h + "px",
					backgroundColor: "#f3f3f3",
				}}
			>
				<QuiltOptions addBlocks={addBlocks} />
			</div>
			<div style={{ backgroundColor: "#f8faff" }}>
				<Canvas
					draw={draw}
					height={canvasInfo.canvasSize.h}
					width={canvasInfo.canvasSize.w}
					handleInteraction={handleInteraction}
				/>
			</div>
		</div>
	);
}
