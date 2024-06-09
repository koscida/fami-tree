import { Button } from "@mui/material";

export default function QuiltOptions({ addBlocks }) {
	const handleAdd9Block = () => {
		addBlocks({ type: "9block" });
	};

	return (
		<>
			<Button onClick={handleAdd9Block}>Add 9-block</Button>
		</>
	);
}
