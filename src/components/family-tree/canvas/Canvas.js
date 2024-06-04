import React, { useState, useEffect, useRef } from "react";
import useCanvas from "./useCanvas";
import { Box } from "@mui/material";
import { canvasDrawLine } from "./functions";
import loadDefault from "../family-member/defaultFamilyMembers";
import FamilyFactory from "../family-member/FamilyFactory";
import FamilyGroup from "../family-member/FamilyGroup";

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
	const drawLine = (ctx, x1, y1, x2, y2) => {
		canvasDrawLine(
			ctx,
			x1 + coords.center.x,
			y1 + coords.center.y,
			x2 + coords.center.x,
			y2 + coords.center.y
		);
	};
	//
	const drawLineToPerson = (ctx, personA, personB) => {
		drawLine(ctx, personA.x, personA.y, personB.x, personB.y);
	};
	const drawLineToChildrenWithPartner = (ctx, person, partner, children) => {
		drawLineToChildren(
			ctx,
			{ x: (person.x + partner.x) / 2, y: person.y },
			children
		);
	};
	const drawLineToChildren = (ctx, mid, children) => {
		const child1 = children[0];
		if (children.length > 1) {
			// more than 1 child, raise the bar
			const midBarY = child1.y - 50;

			// line straight down from parents
			drawLine(ctx, mid.x, mid.y, mid.x, midBarY);

			// bar across
			drawLine(
				ctx,
				child1.x,
				midBarY,
				children[children.length - 1].x,
				midBarY
			);

			// lines down to each child
			children.forEach((child) => {
				drawLine(ctx, child.x, midBarY, child.x, child.y);
			});
		} else {
			// single child, draw line straight down
			drawLine(ctx, mid.x, mid.y, mid.x, child1.y);
		}
	};

	//
	const beginDrawRelationship = (ctx, rel) => {
		const { parentGroup, childGroup } = rel;

		// draw line from parent-to-parent
		if (parentGroup) {
			parentGroup.forEach((parent, i) => {
				if (i > 0) drawLineToPerson(ctx, parentGroup[i - 1], parent);
			});
		} else {
			// draw simple parent if sibling group
			if (childGroup && childGroup.length > 1) {
				// TODO: draw stub
			}
		}

		// draw sibling groups
		if (childGroup && parentGroup) {
			// single parent with single child
			if (parentGroup.length === 1 && childGroup.length === 1) {
				drawLineToPerson(ctx, childGroup[0], parentGroup[0]);
			}
			// single parent with multiple children
			else if (parentGroup.length === 1 && childGroup.length > 1) {
				drawLineToChildren(ctx, parentGroup[0], childGroup);
			}
			// partners with single child
			else if (parentGroup.length > 1) {
				drawLineToChildrenWithPartner(
					ctx,
					parentGroup[0],
					parentGroup[1],
					childGroup
				);
			}
		}
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
			beginDrawRelationship(ctx, relationship);
		});
	};

	//
	// set-up canvas
	const handleInteraction = (event) => {
		const { clientX, clientY, layerX, layerY, type } = event;
		// listeners
		if (event.target.nodeName === "CANVAS") {
			let { prev, center, isDragging, isClicking, dragCoords, lastType } =
				coords;
			const layerCoords = { x: layerX, y: layerY };
			const clientCoords = { x: clientX, y: clientY };
			console.log("--handleInteraction-- type: ", type);

			// start drag
			if (type === "mousedown") {
				dragCoords = [layerCoords];
				// turn on clicking and dragging
				isClicking = true;
				isDragging = true;
			}

			// dragging
			if (type === "mousemove") {
				prev = coords.layerCoords;
				// is dragging, so turn off clicking
				isClicking = false;

				if (isDragging) {
					center = {
						x: center.x - (prev.x - layerCoords.x),
						y: center.y - (prev.y - layerCoords.y),
					};
				}
				if (center.x <= -canvasSize.width) center.x = -canvasSize.width;
				if (center.y <= -canvasSize.height)
					center.y = -canvasSize.height;
				if (center.x >= 10000) center.x = 10000;
				if (center.y >= 10000) center.y = 10000;
			}

			// stop drag
			if (type === "mouseup") {
				dragCoords = [...dragCoords, layerCoords];
				// turn off dragging
				isDragging = false;
			}

			// click item
			if (type === "click" && isClicking && !isDragging) {
				// turn off clicking
				isClicking = false;
				const itemSelected = familyList.filter((mem) => {
					return (
						mem.x + center.x - 5 <= layerCoords.x &&
						mem.x + center.x + 20 + 5 >= layerCoords.x &&
						mem.y + center.y - 5 <= layerCoords.y &&
						mem.y + center.y + 20 + 5 >= layerCoords.y
					);
				});
				setSelectedId(
					itemSelected && itemSelected.length > 0
						? itemSelected[0].id
						: null
				);
			}

			// update last
			lastType = type;

			// update coords
			setCoords({
				...coords,
				clientCoords,
				layerCoords,
				center,
				prev,
				isDragging,
				dragCoords,
				isClicking,
				lastType,
			});
		}
	};
	const canvasRef = useCanvas(draw, canvasSize, handleInteraction);

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
		</>
	);
};

export default Canvas;
