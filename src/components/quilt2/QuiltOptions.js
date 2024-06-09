import { Button } from "@mui/material";

export default function QuiltOptions({ addBlocks }) {
	const handleAddBlock = (e) => {
		addBlocks({ type: e.target.value });
	};

	return (
		<>
			<Button onClick={handleAddBlock} value="9block">
				Add 9-block
			</Button>
		</>
	);
}
