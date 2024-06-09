import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Canvas = ({ draw, height, width, handleInteraction }) => {
	const [frame, setFrame] = useState(0);
	const [shouldStop, setShouldStop] = useState(false);

	const [isDragging, setIsDragging] = useState(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });

	const canvasRef = useRef();

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		context.clearRect(0, 0, canvas.width, canvas.height);

		draw(context);
	}, [frame]);

	useLayoutEffect(() => {
		if (!shouldStop) {
			let timerId;

			const animate = () => {
				setFrame((c) => c + 1);
				timerId = requestAnimationFrame(animate);
			};
			timerId = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(timerId);
		}
	});

	// render
	return (
		<canvas
			ref={canvasRef}
			height={height}
			width={width}
			onMouseDown={(e) => handleInteraction(e)}
			onMouseUp={(e) => handleInteraction(e)}
			onMouseMove={(e) => handleInteraction(e)}
		/>
	);
};

Canvas.propTypes = {
	draw: PropTypes.func.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
};

export default Canvas;
