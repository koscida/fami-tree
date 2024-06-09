import { Box } from "@mui/material";
import QuiltBlock from "./QuiltBlock";

export default class Quilt9Block extends QuiltBlock {
	constructor(type) {
		super(type);
		this.colors = [
			"pink",
			"blue",
			"pink",
			"blue",
			"pink",
			"blue",
			"pink",
			"blue",
			"pink",
		];
		this.hovering = false;
		this.dragging = false;
	}
}
