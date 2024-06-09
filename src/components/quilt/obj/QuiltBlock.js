import { drawSquare } from "../canvasHelpers";

export default class QuiltBlock {
	constructor(type) {
		this.type = type;
		this.x = 0;
		this.y = 0;
	}

	draw(ctx) {
		drawSquare(ctx, this.x, this.y, 10, 10, "pink");
	}
}
