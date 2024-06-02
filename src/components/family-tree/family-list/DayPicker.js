import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DayPicker({ name, value, handleChange }) {
	return (
		<FormControl>
			<InputLabel id={`${name}-day-select`}>Day</InputLabel>
			<Select
				labelId={`${name}-day-select-label`}
				id={`${name}-day-select`}
				value={value}
				label="Age"
				name={name}
				onChange={handleChange}
			>
				{[...Array(31).keys()].map((month, i) => (
					<MenuItem key={i} value={i + 1}>
						{month + 1}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
