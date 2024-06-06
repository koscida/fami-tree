export default function canvasInteraction(
	event,
	canvasSize,
	coords,
	setCoords,
	familyList,
	setSelectedId
) {
	const { clientX, clientY, layerX, layerY, type } = event;
	// listeners
	if (event.target.nodeName === "CANVAS") {
		let { prev, center, isDragging, isClicking, dragCoords, lastType } =
			coords;
		const layerCoords = { x: layerX, y: layerY };
		const clientCoords = { x: clientX, y: clientY };
		//console.log("--handleInteraction-- type: ", type);

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
			if (center.y <= -canvasSize.height) center.y = -canvasSize.height;
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
}
