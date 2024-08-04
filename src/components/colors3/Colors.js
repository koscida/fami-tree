import { Fragment, useState } from "react";
import "./styles.scss";
import { hexToRGB, rgbToHSL, rgbToHSV } from "../../helpers/conversions";
import AddKeyBtn from "./AddKeyBtn";

const colorModelOptions = { hsl: "HSL", hsv: "HSV" };

export default function Colors() {
	const [colorList, setColorList] = useState({});
	const [keyFrames, setKeyFrames] = useState({});
	// options
	const [maxColumns, setMaxColumns] = useState(10);
	const [maxRows, setMaxRows] = useState(10);
	const [colorModel, setColorModel] = useState("hsl");
	const [defaultColor, setDefaultColor] = useState("#000");
	const [showIdx, setShowIdx] = useState(false);

	// helpers
	const generateNewCell = () => ({ isMarked: true, color: defaultColor });

	// handlers

	const handleAddColorRow = (rowIdx) => {
		// check if can add to row
		const totalRows = Object.keys(colorList).length;
		if (totalRows < maxRows) {
			let newColorList = {};
			// check if first row
			if (totalRows === 0) {
				newColorList = { 0: { 0: generateNewCell() } };
			} else {
				// copy
				newColorList = { ...colorList };
				// move down
				for (var i = rowIdx; i < totalRows; i++) {
					newColorList[i + 1] = colorList[i];
				}
				// add
				newColorList[rowIdx] = { 0: generateNewCell() };
			}
			//set
			setColorList(newColorList);
		}
	};
	const handleAddColorColumn = (rowIdx, colIdx) => {
		// check if can add to row
		const totalColumns = Object.keys(colorList[rowIdx]).length;
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
			setColorList({ ...colorList, [rowIdx]: newColorListRow });
		}
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
		setKeyFrames({
			...keyFrames,
			[rowIdx]: {
				...keyFrames[rowIdx],
				[colIdx]: value,
			},
		});
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
	const AddColorBtn = ({ rowIdx }) => (
		<div className="buttonRow">
			<button onClick={() => handleAddColorRow(rowIdx)}>Add Color</button>
			{showIdx ? (
				<>
					<br />
					rowIdx = {rowIdx}
					<br />
				</>
			) : (
				<></>
			)}
		</div>
	);
	const AddColorRow = ({ rowIdx }) => (
		<div className="colorRow">
			<div className="colorCell">
				<AddColorBtn rowIdx={rowIdx} />
			</div>
		</div>
	);
	const AddColorCol = ({ rowIdx, colIdx }) => (
		<div className="buttonRow">
			<button onClick={() => handleAddColorColumn(rowIdx, colIdx)}>
				Add Color
			</button>
			{showIdx ? (
				<>
					<br />
					rowIdx = {rowIdx}
					<br />
					colIdx = {colIdx}
				</>
			) : (
				<></>
			)}
		</div>
	);
	const DeleteColor = ({ rowIdx, colIdx }) => (
		<div className="buttonRow">
			<button onClick={() => handleDeleteColor(rowIdx, colIdx)}>
				Delete
			</button>
			{showIdx ? (
				<>
					<br />
					rowIdx = {rowIdx}
					<br />
					colIdx = {colIdx}
				</>
			) : (
				<></>
			)}
		</div>
	);

	// components

	const DisplayColorList = () => {
		return colorListKeys.map((rowIdx, i) => {
			const colorRow = colorList[rowIdx],
				rowKeyIdx = rowIdx + 0.5,
				colIdx = 0;
			return (
				<Fragment key={i}>
					{/* Display color row */}
					{Math.round(rowIdx) === rowIdx ? (
						<ColorRow rowIdx={rowIdx} colorRow={colorRow} />
					) : (
						<></>
					)}

					{/* Display Add color in-between each color row */}
					{keyFrames[rowKeyIdx] && keyFrames[rowKeyIdx][0] ? (
						<DisplayColorKeys
							rowStartKeyIdx={rowKeyIdx}
							colStartKeyIdx={colIdx}
							rowEndKeyIdx={rowKeyIdx + 1}
							colEndKeyIdx={colIdx}
						/>
					) : rowIdx < totalRows - 1 ? (
						<div className="colorRow">
							<div className="colorCell">
								<AddKeyBtn
									rowIdx={rowKeyIdx}
									colIdx={colIdx}
									handleAddKeyFrame={handleAddKeyFrame}
								/>
								{showIdx ? (
									<>
										rowIdx = {rowKeyIdx}
										<br />
										colIdx = {colIdx}
									</>
								) : (
									<></>
								)}
								<AddColorBtn rowIdx={rowIdx} />
							</div>
						</div>
					) : (
						<></>
					)}
				</Fragment>
			);
		});
	};

	const ColorRow = ({ rowIdx, colorRow }) => {
		const rowEntries = Object.entries(colorRow);
		const totalColumns = Object.keys(colorList[rowIdx]).length;
		return (
			<div className="colorRow">
				{/* Display Add Color at first col */}
				{totalColumns < maxColumns ? (
					<div className="colorCell">
						<AddColorCol rowIdx={rowIdx} colIdx={0} />
					</div>
				) : (
					<></>
				)}

				{/* Display colors */}
				{rowEntries.length > 0 ? (
					rowEntries.map(([colIdx, cellColor], i) => {
						colIdx = parseFloat(colIdx);
						return (
							<Fragment key={colIdx}>
								{/* Display color input */}
								<div className="colorCell">
									{cellColor.isMarked ? (
										<input
											type="color"
											value={
												cellColor
													? cellColor.color
													: null
											}
											onChange={(e) =>
												handleColorChange(
													e.target.value,
													rowIdx,
													colIdx
												)
											}
										/>
									) : (
										<div
											style={{
												height: "32px",
												width: "64px",
												backgroundColor:
													cellColor.color,
											}}
										></div>
									)}
									<ColorGrid cellColor={cellColor} />
									<DeleteColor
										rowIdx={rowIdx}
										colIdx={colIdx}
									/>
								</div>

								{/* Display add colors in-between inputs */}
								{keyFrames[rowIdx] &&
								keyFrames[rowIdx][colIdx] ? (
									<div className="colorCell">
										{keyFrames[rowIdx][0]}
									</div>
								) : i < totalColumns - 1 ? (
									<div className="colorCell">
										<AddKeyBtn
											rowIdx={rowIdx}
											colIdx={colIdx}
											handleAddKeyFrame={
												handleAddKeyFrame
											}
										/>
										<AddColorCol
											rowIdx={rowIdx}
											colIdx={colIdx}
										/>
									</div>
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
						<AddColorCol rowIdx={rowIdx} colIdx={totalColumns} />
					</div>
				) : (
					<></>
				)}
			</div>
		);
	};

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

	const DisplayColorKeys = ({
		rowStartKeyIdx,
		colStartKeyIdx,
		rowEndKeyIdx,
		colEndKeyIdx,
	}) => {
		const keyFrame = keyFrames[rowStartKeyIdx][colStartKeyIdx],
			rowStartIdx = rowStartKeyIdx - 0.5,
			colStartIdx = colStartKeyIdx,
			rowEndIdx = rowEndKeyIdx - 0.5,
			colEndIdx = colEndKeyIdx,
			startColor = colorList[rowStartIdx][colStartIdx],
			endColor = colorList[rowEndIdx][colEndIdx];

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
		let diffR = 0,
			diffG = 0,
			diffB = 0,
			sliceR = 0,
			sliceG = 0,
			sliceB = 0,
			directionR = 0,
			directionG = 0,
			directionB = 0;
		if (isBothColors) {
			diffR = Math.abs(startColor.r - endColor.r);
			diffG = Math.abs(startColor.g - endColor.g);
			diffB = Math.abs(startColor.b - endColor.b);
			sliceR = diffR / keyFrame;
			sliceG = diffG / keyFrame;
			sliceB = diffB / keyFrame;
			directionR = startColor.r < endColor.r ? 1 : -1;
			directionG = startColor.g < endColor.g ? 1 : -1;
			directionB = startColor.b < endColor.b ? 1 : -1;
		}

		return (
			<div className="colorRow">
				<div className="colorCell">
					<div className="keyFrames">
						{[...Array(keyFrame).keys()].map((key) => {
							const color = isBothColors
								? `rgb(${
										startColor.r + directionR * sliceR * key
								  }, ${
										startColor.g + directionG * sliceG * key
								  }, ${
										startColor.b + directionB * sliceB * key
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
				</div>
			</div>
		);
	};

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
			<div>
				{/* Display Add Color at row 0 */}
				{totalRows < maxRows ? <AddColorRow rowIdx={0} /> : <></>}

				{/* Display all color rows */}
				<DisplayColorList />

				{/* Display Add Color at last row */}
				{totalRows > 0 && totalRows < maxRows ? (
					<AddColorRow rowIdx={totalRows} />
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
