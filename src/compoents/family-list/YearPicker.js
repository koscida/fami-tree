import { TextField } from "@mui/material";

export default function YearPicker({ name, value, handleChange }) {
	const isError = false;
	const errorText = "Error";
	return (
		<TextField
			id={`${name}-year`}
			label="Year"
			name={name}
			value={value}
			variant="outlined"
			onChange={handleChange}
			error={isError}
			helperText={isError ? errorText : ""}
		/>
	);
}
