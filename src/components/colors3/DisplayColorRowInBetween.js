import { Fragment } from "react";
import CellColorInBetween from "./component/CellColorInBetween";

export default function DisplayColorRowInBetween({
	rowIdx,
	rowKeyIdx,
	colorList,
	keyFrames,
	keyFrameEditing,
	handleAddColor,
	handleColorChange,
	handleDeleteColor,
	handleAddKeyFrame,
	handleEditKeyCancel,
	setKeyFrameEditing,
	options,
}) {
	const colorRow =
		colorList[
			Object.keys(colorList[rowIdx]).length <
			Object.keys(colorList[rowIdx + 1]).length
				? rowIdx
				: rowIdx + 1
		];
	const rowKeys = Object.keys(colorRow)
		.map((x) => parseFloat(x))
		.sort((a, b) => a > b);

	return (
		<div className="colorRow">
			{rowKeys.length > 0 ? (
				rowKeys.map((colIdx, i) => {
					colIdx = parseFloat(colIdx);
					const colKeyIdx = colIdx;
					return (
						<Fragment key={i}>
							<div className="colorCell"></div>
							<div className="colorCell">
								<CellColorInBetween
									rowIdx={rowIdx}
									rowKeyIdx={rowKeyIdx}
									colIdx={colIdx}
									colKeyIdx={colKeyIdx}
									colorList={colorList}
									keyFrames={keyFrames}
									keyFrameEditing={keyFrameEditing}
									handleAddColor={handleAddColor}
									handleAddKeyFrame={handleAddKeyFrame}
									handleEditKeyCancel={handleEditKeyCancel}
									setKeyFrameEditing={setKeyFrameEditing}
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
