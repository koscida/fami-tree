import { Fragment, useState } from "react";
import "./styles.scss";
import { hexToRGB, rgbToHSL, rgbToHSV } from "../../helpers/conversions";
import AddKeyBtn from "./component/AddKeyBtn";
import AddColorBtn from "./component/AddColorBtn";
import DisplayAddColorRow from "./DisplayAddColorRow";
import DisplayOptions from "./DisplayOptions";
import DisplayColorList from "./DisplayColorList";

const colorModelOptions = { hsl: "HSL", hsv: "HSV" };

export default function Colors() {
	const [colorList, setColorList] = useState({});
	const [keyFrames, setKeyFrames] = useState({});
	// editing states
	const [keyFrameEditing, setKeyFrameEditing] = useState(null);
	// options
	const [maxColumns, setMaxColumns] = useState(10);
	const [maxRows, setMaxRows] = useState(10);
	const [colorModel, setColorModel] = useState("hsl");
	const [defaultColor, setDefaultColor] = useState("#000");
	const [showIdx, setShowIdx] = useState(true);

	// helpers

	const generateNewCell = () => ({ isMarked: true, color: defaultColor });

	// handlers

	const handleColorChange = (color, rowIdx, colIdx) => {
		const rgb = hexToRGB(color);
		const hsvl = colorModel === "hsv" ? rgbToHSV(rgb) : rgbToHSL(rgb);
		setColorList({
			...colorList,
			[rowIdx]: {
				...colorList[rowIdx],
				[colIdx]: {
					...colorList[rowIdx][colIdx],
					color,
					...rgb,
					...hsvl,
				},
			},
		});
	};

	const handleAddColor = (rowIdx, colIdx) => {
		let newColorList = { ...colorList };
		// get total number of rows
		const totalRows = Object.keys(colorList).length;

		// check if first row
		if (totalRows === 0) {
			// set first row
			newColorList = { 0: { 0: generateNewCell() } };
		}
		// check if less than max number of rows
		else if (totalRows < maxRows) {
			// check if adding additional row
			if (rowIdx >= totalRows) {
				// set extra row
				newColorList = {
					...colorList,
					[rowIdx]: { 0: generateNewCell() },
				};
			}
			// check if adding in-between row
			else if (rowIdx !== Math.round(rowIdx)) {
				// new idx
				const rowAddIdx = rowIdx + 0.5;
				// move down color
				for (var i = rowAddIdx; i < totalRows; i++) {
					newColorList[i + 1] = colorList[i];
				}
				// add
				newColorList[rowAddIdx] = { 0: generateNewCell() };

				// move frames down
				let newKeyFrames = {
					...keyFrames,
				};
				for (var i = rowIdx; i < totalRows; i++) {
					newKeyFrames[i + 1] = keyFrames[i];
				}
				newKeyFrames[rowIdx] = null;
				setKeyFrames(newKeyFrames);
			}
			// else, adding a col
			else {
				// get total number of columns
				const totalColumns = Object.keys(colorList[rowIdx]).length;

				// check if less and max number of cols
				if (totalColumns < maxColumns) {
					// copy
					let newColorListRow = { ...colorList[rowIdx] };
					// move down
					for (var i = colIdx; i < totalColumns; i++) {
						newColorListRow[i + 1] = colorList[rowIdx][i];
					}
					// add
					newColorListRow[colIdx] = generateNewCell();
					// set
					newColorList[rowIdx] = newColorListRow;
				}
			}
		}
		//set
		setColorList(newColorList);
	};
	const handleDeleteColor = (rowIdx, colIdx) => {
		const newRow = {};
		const row = colorList[rowIdx];

		for (var i = 0; i < Object.values(row).length; i++) {
			if (i < colIdx) newRow[i] = row[i];
			else if (i > colIdx) newRow[i - 1] = row[i];
		}
		setColorList({ ...colorList, [rowIdx]: newRow });
	};

	const handleAddKeyFrame = (rowIdx, colIdx, value) => {
		// update the keyframe with new value
		setKeyFrames({
			...keyFrames,
			[rowIdx]: {
				...keyFrames[rowIdx],
				[colIdx]: value,
			},
		});
		// reset editing keyframe
		setKeyFrameEditing(null);
	};
	const handleEditKeyCancel = () => {
		setKeyFrameEditing(null);
	};

	// render

	const totalRows = Object.entries(colorList).length;
	const canAddRow = totalRows < maxRows;
	const options = { maxColumns, maxRows, showIdx, defaultColor };
	// console.log(
	// 	" colorList: ",
	// 	colorList,
	// 	" keyFrames: ",
	// 	keyFrames,
	// 	" colorListKeys: ",
	// 	colorListKeys,
	// 	" totalRows: ",
	// 	totalRows
	// );

	return (
		<div className="colors3">
			<div className="colors">
				{/* Display Add Color at row 0 */}
				{canAddRow ? (
					<DisplayAddColorRow
						rowIdx={-0.5}
						colorList={colorList}
						handleAddColor={handleAddColor}
						options={options}
					/>
				) : (
					<></>
				)}

				{/* Display all color rows */}
				<DisplayColorList
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

				{/* Display Add Color at last row */}
				{canAddRow && totalRows > 0 ? (
					<DisplayAddColorRow
						rowIdx={totalRows}
						colorList={colorList}
						handleAddColor={handleAddColor}
						options={options}
					/>
				) : (
					<></>
				)}
			</div>

			<div className="options">
				<DisplayOptions
					options={{
						maxColumns,
						setMaxColumns,
						maxRows,
						setMaxRows,
						colorModel,
						setColorModel,
						colorModelOptions,
						defaultColor,
						setDefaultColor,
						showIdx,
						setShowIdx,
					}}
				/>
			</div>
		</div>
	);
}
