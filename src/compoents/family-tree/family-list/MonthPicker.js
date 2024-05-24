import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function MonthPicker({ name, value, handleChange }) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return (
		<FormControl>
			<InputLabel id={`${name}-month-select`}>Month</InputLabel>
			<Select
				labelId={`${name}-month-select-label`}
				id={`${name}-month-select`}
				value={value ? months[value - 1] : ""}
				label="Month"
				name={name}
				onChange={handleChange}
			>
				{months.map((month, i) => (
					<MenuItem key={i} value={i + 1}>
						{month}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
