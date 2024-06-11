import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import QuiltOptions from "./QuiltOptions";
import QuiltFactory from "./QuiltFactory";
import QuiltBlock from "./obj/QuiltBlock";
import Quilt9Block from "./obj/Quilt9Block";
import ViewQuiltBlock from "./views/ViewQuiltBlock";
import ViewQuilt9Block from "./views/ViewQuilt9Block";
import Draggable from "react-draggable";

export default function Quilt2() {
	const [canvasInfo, setCanvasInfo] = useState({
		padding: 20,
		canvasSize: { w: 0, h: 0 },
	});
	const [options, setOptions] = useState({
		cellSize: 20,
		colorWay: ["#ff0000", "#0000ff"],
	});

	const [canvasObjects, setCanvasObjects] = useState({});
	// const quiltFactory = new QuiltFactory();

	useEffect(() => {
		// update canvas size
		const canvasSize = {
			w: window.innerWidth * 0.7,
			h: window.innerHeight,
		};

		// update
		setCanvasInfo({ ...canvasInfo, canvasSize });
	}, []);

	// ////
	// handlers

	const setQuilt9Block = (changingObj, newQuiltSettings) => {
		let newObj = changingObj;
		if (newQuiltSettings.hovering) {
			newObj.hovering = newQuiltSettings.hovering;
		}
		if (newQuiltSettings.dragging) {
			newObj.dragging = newQuiltSettings.dragging;
		}
		if (newQuiltSettings.colors) {
			newObj.colors = newQuiltSettings.colors;
		}
		setCanvasObjects({
			...canvasObjects,
			[newObj.id]: newObj,
		});
	};

	// handler helpers

	const addBlocks = (blockInfo) => {
		const { type } = blockInfo;
		addCanvasPatch(type);
	};
	const addCanvasPatch = (type) => {
		// console.log("--addCanvasPatch--, colorWay: ", options.colorWay);
		const colorWay =
			Object.values(canvasObjects).filter(
				(obj) => obj instanceof Quilt9Block
			).length %
				2 ===
			1
				? [options.colorWay[1], options.colorWay[0]]
				: options.colorWay;
		const newQuiltBlock = QuiltFactory.createNewBlock(type, {
			...options,
			colorWay,
		});
		setCanvasObjects({
			...canvasObjects,
			[newQuiltBlock.id]: newQuiltBlock,
		});
	};

	// ////
	// render
	return (
		<div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
			<div
				style={{
					overflow: "scroll",
					height: canvasInfo.canvasSize.h + "px",
					backgroundColor: "#f3f3f3",
					boxSizing: "border-box",
					padding: canvasInfo.padding,
				}}
			>
				<QuiltOptions
					options={options}
					setOptions={setOptions}
					addBlocks={addBlocks}
				/>
			</div>
			<div style={{ backgroundColor: "#f8faff" }}>
				<Box sx={{ position: "relative" }}>
					{Object.values(canvasObjects).map((obj, i) =>
						obj instanceof Quilt9Block ? (
							<ViewQuilt9Block
								key={i}
								options={options}
								quiltBlock={obj}
								setQuiltBlock={(s) => setQuilt9Block(obj, s)}
							/>
						) : obj instanceof QuiltBlock ? (
							<ViewQuiltBlock quiltBlock={obj} key={i} />
						) : (
							<></>
						)
					)}
				</Box>
			</div>
		</div>
	);
}
