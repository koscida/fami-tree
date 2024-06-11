import { Box, Button, Slider } from "@mui/material";
import { useState } from "react";

export default function QuiltOptions({ options, setOptions, addBlocks }) {
	// const [newColor, setNewColor] = useState({ adding: false, newOption: {} });
	const handleAddBlock = (e) => {
		addBlocks({ type: e.target.value });
	};

	const handleCellChange = (e) => {
		setOptions({ ...options, cellSize: e.target.value });
	};
	const handleNewColor = () => {
		setOptions({
			...options,
			colorWay: [...options.colorWay, "#00000"],
		});
	};
	const handleUpdateColor = (e) => {
		const {
			target: { name, value },
		} = e;
		let colorWay = options.colorWay;
		colorWay[name] = value;
		setOptions({
			...options,
			colorWay,
		});
	};
	const handleReverseColors = (e) => {
		const {
			target: { name, value },
		} = e;
	};

	const colorBlock = (color) => (
		<span
			style={{
				display: "inline-block",
				width: "30px",
				height: "15px",
				backgroundColor: color,
			}}
		></span>
	);
	const flexRowStyles = {
		display: "flex",
		flexDirection: "row",
		gap: "10px",
		flexWrap: "wrap",
	};

	return (
		<>
			<Box>
				{/* Project Colors */}
				<Box>
					<p>
						<b>Project Colors</b>
					</p>
					<Box style={flexRowStyles}>
						{options.colorWay.map((color, i) => (
							<Box key={i}>
								<label htmlFor={`colorPicker-${i}`}>
									Color {i + 1}
								</label>
								<br />
								<input
									type="color"
									id={`colorPicker-${i}`}
									name={i}
									value={color}
									onChange={handleUpdateColor}
								/>
							</Box>
						))}
						<Box>
							<label htmlFor="newColorWay"></label>
							<br />
							<Button
								id="newColorWay"
								variant="outlined"
								onClick={handleNewColor}
							>
								New Color
							</Button>
						</Box>
					</Box>
				</Box>

				{/* Cel Size */}
				<Box>
					<p>
						<b>Cell Size</b>
					</p>

					<Slider
						aria-label="cell size"
						value={options.cellSize}
						defaultValue={20}
						step={5}
						marks
						min={10}
						max={50}
						valueLabelDisplay="on"
						onChange={handleCellChange}
					/>
				</Box>
			</Box>
			<hr />
			<Box>
				<Box>
					<Box
						sx={{
							...flexRowStyles,
							justifyContent: "space-between",
						}}
					>
						<b>9-Block</b>
						<Button
							onClick={handleAddBlock}
							value="9block"
							variant="outlined"
						>
							Add 9-block
						</Button>
					</Box>
					<Box sx={flexRowStyles}>
						<p>
							Color 1: <br />
							{colorBlock(options.colorWay[0])}
						</p>
						<p>
							Color 2: <br />
							{colorBlock(options.colorWay[1])}
						</p>
					</Box>
					<Button
						variant="outlined"
						onClick={handleReverseColors}
						name="9block"
					>
						Reverse colors
					</Button>
				</Box>
				<hr />
			</Box>
		</>
	);
}
