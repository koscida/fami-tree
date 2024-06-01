import React, { useState, useEffect, useRef } from "react";
import useCanvas from "./useCanvas";
import { Box } from "@mui/material";

const fam1X = 100,
	fam2X = 300,
	fam3X = 500,
	fam4X = 700,
	gen1Y = 50,
	gen2Y = 150,
	gen3Y = 250,
	member = 50;

const Canvas = ({ family, canvasSize }) => {
	const [coords, setCoords] = useState({
		clientCoords: { x: 0, y: 0 },
		layerCoords: { x: 0, y: 0 },
		prev: { x: 0, y: 0 },
		center: { x: 0, y: 0 },
		isDragging: false,
		dragCoords: [],
	});
	const [items, setItems] = useState([
		{
			x: fam3X - member,
			y: gen1Y,
			name: "MB",
			partner: { x: fam3X + member, y: gen1Y, name: "WB" },
			children: [
				{
					x: fam1X,
					y: gen2Y,
					name: "EK",
					children: [
						{
							x: fam1X - member,
							y: gen3Y,
							name: "BK",
						},
						{
							x: fam1X + member,
							y: gen3Y,
							name: "KK",
						},
					],
				},
				{
					x: fam2X,
					y: gen2Y,
					name: "AA",
					children: [
						{
							x: fam2X,
							y: gen3Y,
							name: "AA",
						},
					],
				},
				{
					x: fam3X - member,
					y: gen2Y,
					name: "CR",
					partner: {
						x: fam3X + member,
						y: gen2Y,
						name: "TR",
					},
					children: [
						{
							x: fam3X - member * 1.5,
							y: gen3Y,
							name: "AR",
						},
						{
							x: fam3X,
							y: gen3Y,
							name: "GR",
						},
						{
							x: fam3X + member * 1.5,
							y: gen3Y,
							name: "NR",
						},
					],
				},
				{
					x: fam4X - member,
					y: gen2Y,
					name: "BB",
					partner: {
						x: fam4X + member,
						y: gen2Y,
						name: "HB",
					},
					children: [
						{
							x: fam4X,
							y: gen3Y,
							name: "PB",
						},
					],
				},
			],
		},
	]);

	// draw helpers
	const drawDot = (ctx, x, y, name) => {
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
	const drawMember = (ctx, member) => {
		drawDot(
			ctx,
			member.x + coords.center.x,
			member.y + coords.center.y,
			member.name
		);
	};
	const drawLine = (ctx, x1, y1, x2, y2) => {
		ctx.beginPath();
		ctx.moveTo(x1 + coords.center.x, y1 + coords.center.y);
		ctx.lineTo(x2 + coords.center.x, y2 + coords.center.y);
		ctx.stroke();
	};
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

	const beginDrawMember = (ctx, member) => {
		drawMember(ctx, member);

		// partner
		if (member.partner) {
			drawLineToPerson(ctx, member, member.partner);
			drawMember(ctx, member.partner);
		}
		// partner and child lines
		if (member.partner && member.children) {
			drawLineToChildrenWithPartner(
				ctx,
				member,
				member.partner,
				member.children
			);
		} else if (member.children) {
			drawLineToChildren(ctx, member, member.children);
		}
		// children
		if (member.children) {
			member.children.forEach((itemChild, j) => {
				//drawMember(ctx, itemChild);
				beginDrawMember(ctx, itemChild);
			});
		}
	};

	// ////
	// draw
	const draw = (ctx, frameCount) => {
		// clear each frame
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// items
		items.forEach((item, i) => {
			beginDrawMember(ctx, item);
		});
	};

	//
	// set-up canvas
	const useCanvas = (draw) => {
		const canvasRef = useRef(null);

		useEffect(() => {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");

			canvas.width = canvasSize.width;
			canvas.height = canvasSize.height;

			let frameCount = 0;
			let animationFrameId;

			// listeners

			// start drag
			const handleWindowMouseDown = (event) => {
				setCoords({
					...coords,
					dragCoords: [
						{
							x: event.layerX,
							y: event.layerY,
						},
					],
					isDragging: true,
				});
			};
			// dragging
			const handleWindowMouseMove = (event) => {
				const clientCoords = {
					x: event.clientX,
					y: event.clientY,
				};
				const layerCoords = {
					x: event.layerX,
					y: event.layerY,
				};
				const prev = coords.layerCoords;

				let center = coords.center;

				if (coords.isDragging) {
					center = {
						x: coords.center.x - (prev.x - layerCoords.x),
						y: coords.center.y - (prev.y - layerCoords.y),
					};
				}
				if (center.x <= -canvasSize.width) center.x = -canvasSize.width;
				if (center.y <= -canvasSize.height)
					center.y = -canvasSize.height;
				if (center.x >= 10000) center.x = 10000;
				if (center.y >= 10000) center.y = 10000;

				setCoords({
					...coords,
					clientCoords,
					layerCoords,
					center,
					prev,
				});
			};
			// stop drag
			const handleWindowMouseUp = (event) => {
				setCoords({
					...coords,
					dragCoords: [
						...coords.dragCoords,
						{
							x: event.layerX,
							y: event.layerY,
						},
					],
					isDragging: false,
				});
			};
			// click item
			const handleWindowClick = (event) => {
				console.log(event);
				const click = {
					x: event.layerX,
					y: event.layerY,
				};
				const itemSelected = items.filter((item) => {
					return (
						item.x + coords.center.x - 5 <= click.x &&
						item.x + coords.center.x + 20 + 5 >= click.x &&
						item.y + coords.center.y - 5 <= click.y &&
						item.y + coords.center.y + 20 + 5 >= click.y
					);
				});
				console.log("itemSelected: ", itemSelected, " click: ", click);
			};

			// group all listeners
			const listeners = [
				{ name: "mousedown", handler: handleWindowMouseDown },
				{ name: "mousemove", handler: handleWindowMouseMove },
				{ name: "mouseup", handler: handleWindowMouseUp },

				{ name: "click", handler: handleWindowClick },
			];
			// add listeners
			listeners.forEach(({ name, handler }) =>
				window.addEventListener(name, handler)
			);

			// render
			const render = () => {
				frameCount++;
				draw(context, frameCount);
				animationFrameId = window.requestAnimationFrame(render);
			};
			render();

			// remove listeners
			return () => {
				window.cancelAnimationFrame(animationFrameId);
				listeners.forEach(({ name, handler }) =>
					window.removeEventListener(name, handler)
				);
			};
		}, [draw]);

		return canvasRef;
	};
	const canvasRef = useCanvas(draw);

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
