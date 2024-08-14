import { Fragment } from "react";
import AddColorBtn from "./component/AddColorBtn";
import AddKeyBtn from "./component/AddKeyBtn";
import DeleteColor from "./component/DeleteColor";
import ColorGrid from "./component/ColorGrid";
import CellColorInBetween from "./component/CellColorInBetween";

export default function DisplayColorRow({
	rowIdx,
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
	const { maxColumns, showIdx, defaultColor } = options;
	const colorRow = colorList[rowIdx],
		rowEntries = Object.entries(colorRow),
		totalColumns = Object.keys(colorList[rowIdx]).length;

	const ColorDetail = ({ cellColor, rowIdx, colIdx }) => (
		<div className="colorCell">
			{cellColor.isMarked ? (
				<input
					type="color"
					value={cellColor ? cellColor.color : null}
					onChange={(e) =>
						handleColorChange(e.target.value, rowIdx, colIdx)
					}
				/>
			) : (
				<div
					style={{
						height: "32px",
						width: "64px",
						backgroundColor: cellColor.color,
					}}
				></div>
			)}
			<ColorGrid cellColor={cellColor} />

			<DeleteColor
				rowIdx={rowIdx}
				colIdx={colIdx}
				handleDeleteColor={handleDeleteColor}
				options={options}
			/>
		</div>
	);

	return (
		<div className="colorRow">
			{/* Display Add Color at first col */}
			{totalColumns < maxColumns ? (
				<div className="colorCell">
					<AddColorBtn
						rowIdx={rowIdx}
						colIdx={0}
						handleAddColor={handleAddColor}
						options={options}
					/>
				</div>
			) : (
				<></>
			)}

			{/* Display colors */}
			{rowEntries.length > 0 ? (
				rowEntries.map(([colIdx, cellColor], i) => {
					colIdx = parseFloat(colIdx);
					const colKeyIdx = colIdx + 1;
					const rowKeyIdx = rowIdx;
					return (
						<Fragment key={colIdx}>
							{/* Display color detail (select) */}
							<ColorDetail
								cellColor={cellColor}
								rowIdx={rowIdx}
								colIdx={colIdx}
							/>

							{/* Display add colors in-between inputs */}
							{i < totalColumns - 1 ? (
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
							) : (
								<></>
							)}
						</Fragment>
					);
				})
			) : (
				<></>
			)}

			{/* Display Add Color at last col */}
			{totalColumns > 0 && totalColumns < maxColumns ? (
				<div className="colorCell">
					<AddColorBtn
						rowIdx={rowIdx}
						colIdx={totalColumns}
						handleAddColor={handleAddColor}
						options={options}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
