import { Fragment } from "react";
import AddColorBtn from "./component/AddColorBtn";

export default function DisplayAddColorRow({
	rowIdx,
	colorList,
	handleAddColor,
	options,
}) {
	const rowColorIdx =
		rowIdx + (Math.ceil(rowIdx) !== Math.floor(rowIdx) ? 0.5 : -1);
	console.log(
		"--DisplayAddColorRow--",
		" rowIdx: ",
		rowIdx,
		" rowColorIdx: ",
		rowColorIdx
	);
	const colorRow = colorList[rowColorIdx] ?? { 0: {} },
		rowKeys = Object.keys(colorRow)
			.map((x) => parseFloat(x))
			.sort((a, b) => a > b);
	console.log(" colorRow: ", colorRow, " rowKeys: ", rowKeys);

	return (
		<div className="colorRow">
			{rowKeys.length > 0 ? (
				rowKeys.map((colIdx, i) => {
					colIdx = parseFloat(colIdx);
					return (
						<Fragment key={i}>
							<div className="colorCell"></div>
							<div className="colorCell">
								<AddColorBtn
									rowIdx={rowIdx}
									colIdx={colIdx}
									handleAddColor={handleAddColor}
									options={options}
								/>
							</div>
						</Fragment>
					);
				})
			) : (
				<></>
			)}
		</div>
	);
}
