import { Fragment, useState } from "react";
import "./styles.scss";
import { hexToRGB, rgbToHSL, rgbToHSV } from "../../helpers/conversions";

const colorModelOptions = { hsl: "HSL", hsv: "HSV" };

export default function Colors() {
	const [colorList, setColorList] = useState({});
	const [keyFrames, setKeyFrames] = useState({});
	const [keyFramesEdit, setKeyFramesEdit] = useState({});
	// options
	const [maxColumns, setMaxColumns] = useState(10);
	const [maxRows, setMaxRows] = useState(10);
	const [colorModel, setColorModel] = useState("hsl");
	const [defaultColor, setDefaultColor] = useState("#000");

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

	const handleAddKeyFrame = (rowIdx, colIdx) => {
		setKeyFrames({
			...keyFrames,
			[rowIdx]: {
				...keyFrames[rowIdx],
				[colIdx]: keyFramesEdit[rowIdx][colIdx],
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

	const AddColorRow = ({ rowIdx }) => (
		<div className="buttonRow">
			<button onClick={() => handleAddColorRow(rowIdx)}>Add Color</button>
		</div>
	);
	const AddColorCol = ({ rowIdx, colIdx }) => (
		<div className="buttonRow">
			<button onClick={() => handleAddColorColumn(rowIdx, colIdx)}>
				Add Color
			</button>
		</div>
	);
	const AddKey = ({ rowIdx, colIdx }) => (
		<div className="buttonRow inputRow">
			<div className="inputField">
				<input
					type="number"
					value={
						keyFramesEdit[rowIdx]
							? keyFramesEdit[rowIdx][colIdx]
							: ""
					}
					onChange={(e) =>
						setKeyFramesEdit({
							...keyFramesEdit,
							[rowIdx]: {
								...keyFramesEdit[rowIdx],
								[colIdx]: e.target.value,
							},
						})
					}
				/>
			</div>
			<div className="inputSubmit">
				<button onClick={() => handleAddKeyFrame(rowIdx, colIdx)}>
					Add Key Frame
				</button>
			</div>
		</div>
	);
	const DeleteColor = ({ rowIdx, colIdx }) => (
		<div className="buttonRow">
			<button onClick={() => handleDeleteColor(rowIdx, colIdx)}>
				Delete
			</button>
		</div>
	);

	// components

	const ColorRow = ({ rowIdx, colorRow }) => {
		const rowEntries = Object.entries(colorRow);
		const totalColumns = Object.keys(colorList[rowIdx]).length;
		return (
			<div className="colorRow">
				{rowEntries.length > 0 ? (
					rowEntries.map(([colIdx, cellColor], i) => {
						colIdx = parseInt(colIdx);
						return (
							<Fragment key={colIdx}>
								<div className="colorCell">
									{i > 0 ? (
										<AddKey
											rowIdx={rowIdx}
											colIdx={colIdx}
										/>
									) : (
										<></>
									)}
									<AddColorCol
										rowIdx={rowIdx}
										colIdx={colIdx}
									/>
								</div>

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
							</Fragment>
						);
					})
				) : (
					<></>
				)}

				{totalColumns < maxColumns ? (
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
		</>
	);

	// render
	const colorListEntries = Object.entries(colorList);
	console.log(
		" colorList: ",
		colorList,
		" keyFrames: ",
		keyFrames,
		" keyFramesEdit: ",
		keyFramesEdit,
		" colorListEntries: ",
		colorListEntries
	);

	return (
		<div className="colors3">
			<div>
				{colorListEntries.length < maxRows ? (
					<div className="colorRow">
						<div className="colorCell">
							<AddColorRow rowIdx={0} />
						</div>
					</div>
				) : (
					<></>
				)}
				{colorListEntries.map(([rowIdx, colorRow], i) => {
					rowIdx = parseInt(rowIdx);
					return (
						<Fragment key={i}>
							<ColorRow rowIdx={rowIdx} colorRow={colorRow} />

							<div className="colorRow">
								<div className="colorCell">
									{i < colorListEntries.length - 1 ? (
										<AddKey
											rowIdx={colorRow[0]}
											colIdx={0}
										/>
									) : (
										<></>
									)}

									<AddColorRow rowIdx={rowIdx + 1} />
								</div>
							</div>
						</Fragment>
					);
				})}
			</div>

			<div className="options">
				<Options />
			</div>
		</div>
	);
}
