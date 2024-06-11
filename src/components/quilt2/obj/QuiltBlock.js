import { Box } from "@mui/material";

export default class QuiltBlock {
	constructor(type, options) {
		this.id = Math.random();
		this.type = type;
		this.x = 0;
		this.y = 0;

		this.w = options.cellSize;
		this.h = options.cellSize;
		this.styles = {
			backgroundColor: options.colorWay[0],
			width: this.w + "px",
			height: this.h + "px",
			position: "absolute",
		};
	}

	// draw() {
	// 	return (
	// 		<Box
	// 			key={this.id}
	// 			sx={{
	// 				...this.styles,
	// 				top: this.x,
	// 				left: this.y,
	// 			}}
	// 		></Box>
	// 	);
	// }
}
