import { useColorContext } from "../ColorContext";

export default function DeleteColor({ rowIdx, colIdx }) {
	const { handleDeleteColor, showIdx } = useColorContext();
	return (
		<div className="buttonRow">
			<button onClick={() => handleDeleteColor(rowIdx, colIdx)}>
				Delete
			</button>
			{showIdx ? (
				<div className="idx">
					<br />
					rowIdx = {rowIdx}
					<br />
					colIdx = {colIdx}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
