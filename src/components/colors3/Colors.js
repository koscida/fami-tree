import { Fragment, useState } from "react";
import "./styles.scss";
import { hexToRGB, rgbToHSL, rgbToHSV } from "../../helpers/conversions";
import AddKeyBtn from "./AddKeyBtn";

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

	// small components

	/* AddKeyBtn in other file */
	const AddColorBtn = ({ rowIdx, colIdx }) => (
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
	const AddColorRow = ({ rowIdx, colIdx }) => (
		<div className="colorRow">
			<div className="colorCell"></div>
			<div className="colorCell">
				<AddColorBtn rowIdx={rowIdx} colIdx={colIdx ?? 0} />
			</div>
		</div>
	);
	const DeleteColor = ({ rowIdx, colIdx }) => (
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

	// components

	const DisplayColorList = () => {
		return colorListKeys.map((rowIdx, i) => {
			const rowKeyIdx = rowIdx + 0.5;
			return (
				<Fragment key={i}>
					{/* Display color row */}
					{Math.round(rowIdx) === rowIdx ? (
						<ColorRow rowIdx={rowIdx} />
					) : (
						<></>
					)}

					{/* Display Add color in-between each color row */}
					{rowIdx < totalRows - 1 ? (
						<ColorRowInBetween
							rowIdx={rowIdx}
							rowKeyIdx={rowKeyIdx}
						/>
					) : (
						<></>
					)}
				</Fragment>
			);
		});
	};

	const ColorRow = ({ rowIdx }) => {
		const colorRow = colorList[rowIdx],
			rowEntries = Object.entries(colorRow),
			totalColumns = Object.keys(colorList[rowIdx]).length;
		return (
			<div className="colorRow">
				{/* Display Add Color at first col */}
				{totalColumns < maxColumns ? (
					<div className="colorCell">
						<AddColorBtn rowIdx={rowIdx} colIdx={0} />
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
									<ColorInBetween
										rowIdx={rowIdx}
										rowKeyIdx={rowKeyIdx}
										colIdx={colIdx}
										colKeyIdx={colKeyIdx}
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
						<AddColorBtn rowIdx={rowIdx} colIdx={totalColumns} />
					</div>
				) : (
					<></>
				)}
			</div>
		);
	};
	const ColorRowInBetween = ({ rowIdx, rowKeyIdx }) => {
		const colorRow =
				colorList[
					Math.min(
						Object.keys(colorList[rowIdx]) <
							Object.keys(colorList[rowIdx + 1])
					)
						? rowIdx
						: rowIdx + 1
				],
			rowKeys = Object.keys(colorRow)
				.map((x) => parseFloat(x))
				.sort((a, b) => a > b);

		return (
			<div className="colorRow">
				{rowKeys.length > 0 ? (
					rowKeys.map((colIdx, i) => {
						colIdx = parseFloat(colIdx);
						const colKeyIdx = colIdx;
						return (
							<>
								<div className="colorCell"></div>
								<div className="colorCell">
									<ColorInBetween
										rowIdx={rowIdx}
										rowKeyIdx={rowKeyIdx}
										colIdx={colIdx}
										colKeyIdx={colKeyIdx}
									/>
								</div>
							</>
						);
					})
				) : (
					<></>
				)}
			</div>
		);
	};

	const ColorInBetween = ({ rowIdx, rowKeyIdx, colIdx, colKeyIdx }) => {
		return (
			<div className="colorCell">
				{keyFrames[rowKeyIdx] && keyFrames[rowKeyIdx][colKeyIdx] ? (
					keyFrameEditing &&
					keyFrameEditing.rowIdx === rowKeyIdx &&
					keyFrameEditing.colIdx === colKeyIdx ? (
						<AddKeyBtn
							value={keyFrames[rowKeyIdx][colKeyIdx]}
							rowIdx={rowKeyIdx}
							colIdx={colKeyIdx}
							handleAddKeyFrame={handleAddKeyFrame}
							handleCancel={handleEditKeyCancel}
						/>
					) : (
						<DisplayColorKeys
							rowStartKeyIdx={rowKeyIdx}
							colStartKeyIdx={colKeyIdx}
							rowEndKeyIdx={
								rowKeyIdx + (rowIdx === rowKeyIdx ? 0 : 1)
							}
							colEndKeyIdx={
								colKeyIdx + (rowIdx === rowKeyIdx ? 1 : 0)
							}
						/>
					)
				) : (
					<>
						<AddKeyBtn
							value={""}
							rowIdx={rowKeyIdx}
							colIdx={colKeyIdx}
							handleAddKeyFrame={handleAddKeyFrame}
						/>

						<AddColorBtn rowIdx={rowKeyIdx} colIdx={colKeyIdx} />
					</>
				)}
				{showIdx ? (
					<div className="idx">
						<br />
						ColorInBetween
						<br />
						rowIdx = {rowIdx}
						<br />
						colIdx = {colIdx}
						<br />
						rowKeyIdx = {rowKeyIdx}
						<br />
						colKeyIdx = {colKeyIdx}
					</div>
				) : (
					<></>
				)}
			</div>
		);
	};
	const DisplayColorKeys = ({
		rowStartKeyIdx,
		colStartKeyIdx,
		rowEndKeyIdx,
		colEndKeyIdx,
	}) => {
		const keyFrame = keyFrames[rowStartKeyIdx][colStartKeyIdx],
			rowStartIdx =
				rowStartKeyIdx -
				(rowStartKeyIdx !== Math.round(rowStartKeyIdx) ? 0.5 : 0),
			colStartIdx =
				colStartKeyIdx - (rowStartKeyIdx === rowEndKeyIdx ? 1 : 0),
			rowEndIdx =
				rowEndKeyIdx -
				(rowEndKeyIdx !== Math.round(rowEndKeyIdx) ? 0.5 : 0),
			colEndIdx =
				colEndKeyIdx - (rowStartKeyIdx === rowEndKeyIdx ? 1 : 0);

		const startColor = colorList[rowStartIdx][colStartIdx],
			endColor = colorList[rowEndIdx][colEndIdx];
		console.log(
			" keyFrame: ",
			keyFrame,
			" rowStartIdx: ",
			rowStartIdx,
			" colStartIdx: ",
			colStartIdx,
			" rowEndIdx: ",
			rowEndIdx,
			" colEndIdx: ",
			colEndIdx,
			" startColor: ",
			startColor,
			" endColor: ",
			endColor
		);

		// if colors
		const isBothColors =
			startColor &&
			startColor.r >= 0 &&
			startColor.g >= 0 &&
			startColor.b >= 0 &&
			endColor &&
			endColor.r >= 0 &&
			endColor.g >= 0 &&
			endColor.b >= 0;
		let diff = { r: 0, g: 0, b: 0 },
			slice = { r: 0, g: 0, b: 0 },
			direction = { r: 0, g: 0, b: 0 };
		if (isBothColors) {
			diff = {
				r: Math.abs(startColor.r - endColor.r),
				g: Math.abs(startColor.g - endColor.g),
				b: Math.abs(startColor.b - endColor.b),
			};
			slice = {
				r: diff.r / (keyFrame + 1),
				g: diff.g / (keyFrame + 1),
				b: diff.b / (keyFrame + 1),
			};
			direction = {
				r: startColor.r < endColor.r ? 1 : -1,
				g: startColor.g < endColor.g ? 1 : -1,
				b: startColor.b < endColor.b ? 1 : -1,
			};
		}

		return (
			<div className="keyFramesCell">
				<div className="keyFrames">
					{[...Array(keyFrame).keys()].map((key) => {
						const color = isBothColors
							? `rgb(${
									startColor.r +
									direction.r * slice.r * (key + 1)
							  }, ${
									startColor.g +
									direction.g * slice.g * (key + 1)
							  }, ${
									startColor.b +
									direction.b * slice.b * (key + 1)
							  })`
							: defaultColor;

						return (
							<div
								key={key}
								className="keyFrame"
								style={{ backgroundColor: color }}
							></div>
						);
					})}
				</div>
				<div>
					{keyFrame}

					<button
						onClick={() =>
							handleAddKeyFrame(
								rowStartKeyIdx,
								colStartKeyIdx,
								keyFrame + 1
							)
						}
					>
						+
					</button>
					<button
						onClick={() =>
							handleAddKeyFrame(
								rowStartKeyIdx,
								colStartKeyIdx,
								keyFrame - 1
							)
						}
					>
						-
					</button>

					<button
						onClick={() =>
							setKeyFrameEditing({
								rowIdx: rowStartKeyIdx,
								colIdx: colStartKeyIdx,
							})
						}
					>
						Edit
					</button>
				</div>
			</div>
		);
	};
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
			<DeleteColor rowIdx={rowIdx} colIdx={colIdx} />
		</div>
	);
	const ColorGrid = ({ cellColor: { color, r, g, b } }) => (
		<div className="colorGrid">
			<div>
				<div>
					<p>Color: </p>
					<p>{color}</p>
				</div>
				{r >= 0 && g >= 0 && b >= 0 ? (
					<div>
						<p>RGB: </p>
						<p>
							({r}, {g}, {b})
						</p>
					</div>
				) : (
					<></>
				)}
			</div>
			{/* <div>
		<div>
			<p>Hue: </p>
			<p>{cellColor.h}</p>
		</div>
		<div>
			<p>Saturation: </p>
			<p>{cellColor.s}</p>
		</div>
		{colorModel === "hsl" ? (
			<div>
				<p>Light: </p>
				<p>{cellColor.l}</p>
			</div>
		) : (
			<div>
				<p>Value: </p>
				<p>{cellColor.v}</p>
			</div>
		)}
		<div
			style={{
				width: "40px",
				height: "40px",
				backgroundColor: `hsl(${
					cellColor.h
				}, ${(cellColor.s / 255) * 100}%, ${
					(cellColor.l / 255) * 100
				}%)`,
			}}
		></div>
	</div> */}
		</div>
	);

	const Options = () => (
		<>
			<div className="inputRow">
				<span>Max Width:</span>
				<input
					type="number"
					value={maxColumns}
					onChange={(e) => setMaxColumns(e.target.value)}
				/>
			</div>

			<div className="inputRow">
				<span>Max Height:</span>
				<input
					type="number"
					value={maxRows}
					onChange={(e) => setMaxRows(e.target.value)}
				/>
			</div>

			<div className="inputRow">
				<span>Color Model:</span>
				<select
					onChange={(e) => setColorModel(e.target.value)}
					value={colorModel}
				>
					{Object.entries(colorModelOptions).map(
						([colorModelOption, colorModelLabel]) => (
							<option
								key={colorModelOption}
								value={colorModelOption}
							>
								{colorModelLabel}
							</option>
						)
					)}
				</select>
			</div>

			<div className="inputRow">
				<span>Default Color:</span>
				<input
					type="color"
					value={defaultColor}
					onChange={(e) => setDefaultColor(e.target.value)}
				/>
			</div>

			<div className="inputRow">
				<span>Show Idx:</span>
				<input
					type="checkbox"
					value={showIdx}
					checked={showIdx}
					onChange={(e) => setShowIdx(!showIdx)}
				/>
			</div>
		</>
	);

	// render
	const colorListKeys = Object.keys(colorList)
		.map((x) => parseFloat(x))
		.sort((a, b) => a > b);
	const totalRows = Object.entries(colorList).length;
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
				{totalRows < maxRows ? (
					<AddColorRow rowIdx={-0.5} colIdx={0} />
				) : (
					<></>
				)}

				{/* Display all color rows */}
				<DisplayColorList />

				{/* Display Add Color at last row */}
				{totalRows > 0 && totalRows < maxRows ? (
					<AddColorRow rowIdx={totalRows} colIdx={0} />
				) : (
					<></>
				)}
			</div>

			<div className="options">
				<Options />
			</div>
		</div>
	);
}
