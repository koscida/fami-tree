import AddColorBtn from "./AddColorBtn";

export default function AddColorRow({ rowIdx, colIdx }) {
	return (
		<div className="colorRow">
			<div className="colorCell"></div>
			<div className="colorCell">
				<AddColorBtn rowIdx={rowIdx} colIdx={colIdx ?? 0} />
			</div>
		</div>
	);
}
