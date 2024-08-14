import AddColorBtn from "./AddColorBtn";

export default function AddColorRow({
	rowIdx,
	colIdx,
	handleAddColor,
	options,
}) {
	return (
		<div className="colorRow">
			<div className="colorCell"></div>
			<div className="colorCell">
				<AddColorBtn
					rowIdx={rowIdx}
					colIdx={colIdx ?? 0}
					handleAddColor={handleAddColor}
					options={options}
				/>
			</div>
		</div>
	);
}
