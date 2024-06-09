import { Box } from "@mui/material";
import QuiltBlock from "./ViewQuiltBlock";
import { useState } from "react";

export default function ViewQuilt9Block({ quiltBlock, setQuiltBlock }) {
	const handleMouseEnter = (e) => {
		setQuiltBlock({ hovering: true });
	};
	const handleMouseLeave = (e) => {
		setQuiltBlock({ hovering: false });
	};
	const handleDragStart = (e) => {
		setQuiltBlock({ dragging: true });
	};
	const handleDragEnd = (e) => {
		setQuiltBlock({ dragging: false });
	};

	return (
		<Box
			key={quiltBlock.id}
			id={`wrapper-${quiltBlock.id}`}
			sx={{
				display: "grid",
				gridTemplateColumns: "33% 33% 33%",
				cursor: quiltBlock.dragging
					? "grabbing"
					: quiltBlock.hovering
					? "grab"
					: "pointer",
				position: "relative",
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			draggable="true"
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			{[0, 1, 2].map((i) =>
				[0, 1, 2].map((j) => (
					<Box
						key={j * 3 + i}
						sx={{
							...quiltBlock.styles,
							backgroundColor: quiltBlock.colors[j * 3 + i],
							top: quiltBlock.x + quiltBlock.w * i,
							left: quiltBlock.y + quiltBlock.h * j,
						}}
					></Box>
				))
			)}
		</Box>
	);
}
