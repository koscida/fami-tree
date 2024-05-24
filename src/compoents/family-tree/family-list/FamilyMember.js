import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from "@mui/material";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import DayPicker from "./DayPicker";
import { useState } from "react";

export default function FamilyMember({ data, handleSave, handleCancel }) {
	const [dataTemp, setDataTemp] = useState(data);

	// handlers
	const handleNameValueChange = (e) => {
		const {
			target: { name, value },
		} = e;
		setDataTemp({ ...dataTemp, [name]: value });
	};

	const handleDeceasedChange = (e) => {
		const {
			target: { value },
		} = e;
		console.log(e.target);
		setDataTemp({ ...dataTemp, deceased: value === "deceased" });
	};

	const handleOnSave = () => {
		handleSave(dataTemp);
	};

	// render
	return (
		<Box>
			<Box display={"flex"} gap={"0.5rem"} padding={"0.5rem"}>
				{/* Name */}

				<TextField
					id="first-name"
					label="First Name"
					variant="outlined"
					value={dataTemp.firstName}
					name={"firstName"}
					onChange={handleNameValueChange}
				/>

				<TextField
					id="middle-name"
					label="Middle Name"
					variant="outlined"
					value={dataTemp.middleName}
					name={"middleName"}
					onChange={handleNameValueChange}
				/>
				<TextField
					id="last-name"
					label="Last Name"
					variant="outlined"
					value={dataTemp.lastName}
					name={"lastName"}
					onChange={handleNameValueChange}
				/>
			</Box>

			<Box display={"flex"} gap={"0.5rem"} padding={"0.5rem"}>
				{/* Gender */}
				<Box>
					<FormControl>
						<FormLabel id="gender-radio-buttons-group-label">
							Gender
						</FormLabel>
						<RadioGroup
							aria-labelledby="gender-radio-buttons-group-label"
							defaultValue=""
							name="gender"
							value={dataTemp.gender}
							onChange={handleNameValueChange}
						>
							<FormControlLabel
								value="Female"
								control={<Radio />}
								label="Female"
							/>
							<FormControlLabel
								value="Male"
								control={<Radio />}
								label="Male"
							/>
							<FormControlLabel
								value="Other"
								control={<Radio />}
								label="Other"
							/>
						</RadioGroup>
					</FormControl>
				</Box>

				{/* Living */}
				<Box>
					<FormControl>
						<FormLabel id="living-radio-buttons-group-label">
							Deceased
						</FormLabel>
						<RadioGroup
							aria-labelledby="living-radio-buttons-group-label"
							defaultValue="living"
							name="deceased"
							onClick={handleDeceasedChange}
							value={dataTemp.deceased === "deceased"}
						>
							<FormControlLabel
								value="living"
								control={<Radio />}
								label="Living"
							/>
							<FormControlLabel
								value="deceased"
								control={<Radio />}
								label="Deceased"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
			</Box>

			{/* Birth */}
			<Box gap={"0.5rem"} padding={"0.5rem"}>
				<TextField
					id="birth-place"
					label="Birth Place"
					variant="outlined"
					name="birthPlace"
					value={dataTemp.birthPlace}
					handleChange={handleNameValueChange}
				/>
			</Box>
			{/* Birth Date */}
			<Box display={"flex"} gap={"0.5rem"} padding={"0.5rem"}>
				<MonthPicker
					name={"birthMonth"}
					value={dataTemp.birthMonth}
					handleChange={handleNameValueChange}
				/>
				<DayPicker
					name={"birthDay"}
					value={dataTemp.birthDay}
					handleChange={handleNameValueChange}
				/>
				<YearPicker
					name={"birthYear"}
					value={dataTemp.birthYear}
					handleChange={handleNameValueChange}
				/>
			</Box>

			{dataTemp.deceased ? (
				<>
					{/* Death */}
					<Box padding={"0.5rem"}>
						<TextField
							id="death-place"
							label="Death Place"
							variant="outlined"
							name="deathPlace"
							value={dataTemp.deathPlace}
							onChange={handleNameValueChange}
						/>
					</Box>

					{/* Death Date */}
					<Box display={"flex"} gap={"0.5rem"} padding={"0.5rem"}>
						<MonthPicker
							name={"deathMonth"}
							value={dataTemp.deathMonth}
							handleChange={handleNameValueChange}
						/>
						<DayPicker
							name={"deathDay"}
							value={dataTemp.deathDay}
							handleChange={handleNameValueChange}
						/>
						<YearPicker
							name={"deathYear"}
							value={dataTemp.deathYear}
							handleChange={handleNameValueChange}
						/>
					</Box>

					{/* Burial */}
					<Box display={"flex"} gap={"0.5rem"} padding={"0.5rem"}>
						<TextField
							id="burial-place"
							label="Burial Place"
							variant="outlined"
							name={"burialPlace"}
							value={dataTemp.burialPlace}
							onChange={handleNameValueChange}
						/>
						<TextField
							id="burial-lot"
							label="Burial Lot"
							variant="outlined"
							name={"burialLot"}
							value={dataTemp.burialLot}
							onChange={handleNameValueChange}
						/>
					</Box>
				</>
			) : (
				<></>
			)}

			{/* Save */}
			<Box>
				<Button onClick={handleOnSave}>Save</Button>
				<Button onClick={handleCancel}>Cancel</Button>
			</Box>
		</Box>
	);
}
