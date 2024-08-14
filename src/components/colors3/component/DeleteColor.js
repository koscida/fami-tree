export default function DeleteColor({
	rowIdx,
	colIdx,
	handleDeleteColor,
	options: { showIdx },
}) {
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
