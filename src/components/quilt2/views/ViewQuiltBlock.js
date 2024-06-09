import { Box } from "@mui/material";

export default function ViewQuiltBlock({ quiltBlock }) {
	return (
		<Box
			key={quiltBlock.id}
			sx={{
				...quiltBlock.styles,
				top: quiltBlock.x,
				left: quiltBlock.y,
			}}
		></Box>
	);
}
