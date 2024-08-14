import { useColorContext } from "./ColorContext";

export default function DisplayOptions() {
	const {
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
	} = useColorContext();

	return (
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
}
