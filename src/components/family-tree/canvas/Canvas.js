import React, { useState, useEffect, useRef } from "react";
import useCanvas from "./useCanvas";
import { Box } from "@mui/material";
import { canvasDrawLine } from "./functions";
import loadDefault from "../family-member/defaultFamilyMembers";
import FamilyFactory from "../family-member/FamilyFactory";
import FamilyGroup from "../family-member/FamilyGroup";
import canvasInteraction from "./canvasInteraction";

const Canvas = ({
	familyList,
	setFamilyList,
	relationships,
	canvasSize,
	selectedId,
	setSelectedId,
}) => {
	const [coords, setCoords] = useState({
		clientCoords: { x: 0, y: 0 },
		layerCoords: { x: 0, y: 0 },
		prev: { x: 0, y: 0 },
		center: { x: 0, y: 0 },
		isDragging: false,
		dragCoords: [],
		lastType: null,
		isClicking: false,
	});

	// draw helpers
	const drawMember = (ctx, member) => {
		selectedId && selectedId === member.id
			? member.drawMemberSelected(ctx, coords.center)
			: member.drawMember(ctx, coords.center);
	};
	const drawRelationship = (ctx, rel) => {
		rel.drawFamilyGroup(ctx, coords.center);
	};

	// ////
	// draw
	const draw = (ctx, frameCount) => {
		// clear each frame
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// members
		familyList.forEach((member, i) => {
			drawMember(ctx, member);
		});

		// relationships
		relationships.forEach((relationship) => {
			drawRelationship(ctx, relationship);
		});
	};

	//
	// set-up canvas
	const canvasRef = useCanvas(draw, canvasSize, (event) =>
		canvasInteraction(
			event,
			canvasSize,
			coords,
			setCoords,
			familyList,
			setSelectedId
		)
	);

	// render helper
	const drawStats = () => (
		<Box
			position={"absolute"}
			top={0}
			right={0}
			display={"block"}
			backgroundColor={"rgba(255,255,255,0.5)"}
			zIndex={1}
		>
			<div>
				<p>
					Client:
					<b>
						({coords.clientCoords.x}, {coords.clientCoords.y})
					</b>
					<br />
					Layer:
					<b>
						({coords.layerCoords.x}, {coords.layerCoords.y})
					</b>
					<br />
					Prev:
					<b>
						({coords.prev.x}, {coords.prev.y})
					</b>
					<br />
					Center:
					<b>
						({coords.center.x}, {coords.center.y})
					</b>
				</p>
			</div>
			<div>
				<p>
					Dragged:
					<b>
						{coords.dragCoords.map((dragCoord, i) => (
							<span key={i}>
								({dragCoord.x}, {dragCoord.y})
							</span>
						))}
					</b>
					<br />
					Dragging: <b>{coords.isDragging ? "TRUE" : "FALSE"}</b>
				</p>
			</div>
		</Box>
	);

	//
	// render
	return (
		<>
			<Box position={"relative"}>
				{canvasSize ? (
					<canvas
						ref={canvasRef}
						style={{
							border: "1px solid red",
							position: "absolute",
							top: "10px",
							left: "10px",
						}}
					/>
				) : (
					<></>
				)}
			</Box>
			{drawStats()}
		</>
	);
};

export default Canvas;
