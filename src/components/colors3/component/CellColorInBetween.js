import AddColorBtn from "./AddColorBtn";
import AddKeyBtn from "./AddKeyBtn";

export default function CellColorInBetween({
	rowIdx,
	rowKeyIdx,
	colIdx,
	colKeyIdx,
	colorList,
	keyFrames,
	keyFrameEditing,
	handleAddColor,
	handleAddKeyFrame,
	handleEditKeyCancel,
	setKeyFrameEditing,
	options,
}) {
	const { showIdx, defaultColor } = options;

	const ColorKeys = ({
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
					<ColorKeys
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

					<AddColorBtn
						rowIdx={rowKeyIdx}
						colIdx={colKeyIdx}
						handleAddColor={handleAddColor}
						options={options}
					/>
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
}
