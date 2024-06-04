import { useRef, useEffect } from "react";

const useCanvas = (draw, canvasSize, handleInteraction) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		canvas.width = canvasSize.width;
		canvas.height = canvasSize.height;

		let frameCount = 0;
		let animationFrameId;

		// group all listeners
		const listeners = [
			{ name: "mousedown", handler: handleInteraction },
			{ name: "mousemove", handler: handleInteraction },
			{ name: "mouseup", handler: handleInteraction },

			{ name: "click", handler: handleInteraction },
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
export default useCanvas;
