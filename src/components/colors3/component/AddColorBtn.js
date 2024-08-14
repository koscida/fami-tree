import { useColorContext } from "../ColorContext";

export default function AddColorBtn({ rowIdx, colIdx }) {
	const { handleAddColor, showIdx } = useColorContext();

	return (
		<div className="buttonRow">
			<button onClick={() => handleAddColor(rowIdx, colIdx)}>
				Add Color
			</button>
			{showIdx ? (
				<div className="idx">
					<br />
					rowIdx = {rowIdx}
					<br />
					colIdx = {colIdx}
					<br />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
