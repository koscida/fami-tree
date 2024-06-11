import { Box } from "@mui/material";
import QuiltBlock from "./QuiltBlock";

export default class Quilt9Block extends QuiltBlock {
	constructor(type, options) {
		super(type, options);
		const rowA = [
			options.colorWay[0],
			options.colorWay[1],
			options.colorWay[0],
		];
		const rowB = [
			options.colorWay[1],
			options.colorWay[0],
			options.colorWay[1],
		];
		this.colors = [...rowA, ...rowB, ...rowA];
		this.hovering = false;
		this.dragging = false;
	}
}
