import { Fragment } from "react";
import AddColorBtn from "./component/AddColorBtn";
import AddKeyBtn from "./component/AddKeyBtn";
import DeleteColor from "./component/DeleteColor";
import DisplayColorRow from "./DisplayColorRow";
import DisplayColorRowInBetween from "./DisplayColorRowInBetween";

export default function DisplayColorList({
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
	const { showIdx, maxColumns } = options;
	const colorListKeys = Object.keys(colorList)
		.map((x) => parseFloat(x))
		.sort((a, b) => a > b);
	const totalRows = Object.entries(colorList).length;

	// 	// components

	return colorListKeys.map((rowIdx, i) => {
		const rowKeyIdx = rowIdx + 0.5;
		return (
			<Fragment key={i}>
				{/* Display color row */}
				{Math.round(rowIdx) === rowIdx ? (
					<DisplayColorRow
						rowIdx={rowIdx}
						colorList={colorList}
						keyFrames={keyFrames}
						keyFrameEditing={keyFrameEditing}
						handleAddColor={handleAddColor}
						handleColorChange={handleColorChange}
						handleDeleteColor={handleDeleteColor}
						handleAddKeyFrame={handleAddKeyFrame}
						handleEditKeyCancel={handleEditKeyCancel}
						setKeyFrameEditing={setKeyFrameEditing}
						options={options}
					/>
				) : (
					<></>
				)}

				{/* Display Add color in-between each color row */}
				{rowIdx < totalRows - 1 ? (
					<DisplayColorRowInBetween
						rowIdx={rowIdx}
						rowKeyIdx={rowKeyIdx}
						colorList={colorList}
						keyFrames={keyFrames}
						keyFrameEditing={keyFrameEditing}
						handleAddColor={handleAddColor}
						handleColorChange={handleColorChange}
						handleDeleteColor={handleDeleteColor}
						handleAddKeyFrame={handleAddKeyFrame}
						handleEditKeyCancel={handleEditKeyCancel}
						setKeyFrameEditing={setKeyFrameEditing}
						options={options}
					/>
				) : (
					<></>
				)}
			</Fragment>
		);
	});
}
