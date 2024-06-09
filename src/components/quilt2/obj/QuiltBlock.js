import { Box } from "@mui/material";

export default class QuiltBlock {
	constructor(type) {
		this.id = Math.random();
		this.type = type;
		this.x = 0;
		this.y = 0;

		this.w = 100;
		this.h = 100;
		this.styles = {
			backgroundColor: "pink",
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
