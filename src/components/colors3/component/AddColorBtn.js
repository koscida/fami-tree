export default function AddColorBtn({
	rowIdx,
	colIdx,
	handleAddColor,
	options: { showIdx },
}) {
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
