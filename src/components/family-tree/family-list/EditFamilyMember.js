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
import AddFamilyMember from "./AddFamilyMember";
import AddParent from "./add/AddParent";
import AddSibling from "./add/AddSibling";
import AddPartner from "./add/AddPartner";
import AddChild from "./add/AddChild";

export default function EditFamilyMember({
	member,
	handleSave,
	handleCancel,
	mode,
	setMode,
}) {
	const [dataTemp, setDataTemp] = useState(member);

	const isNew = member.id ? false : true;

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

	const handleSetCancel = () => setMode({ ...mode, adding: null });

	// styles
	const rowStyles = { display: "flex", gap: "0.5rem", padding: "0.5rem" };

	// render
	return (
		<Box>
			{/* NAME */}

			<Box sx={rowStyles}>
				<h2>{isNew ? <></> : member.fullName}</h2>
			</Box>

			{/* ADD FAMILY MEMBER */}

			{isNew ? (
				<></>
			) : (
				<Box sx={rowStyles}>
					{mode.adding === "parent" ? (
						<AddParent />
					) : mode.adding === "sibling" ? (
						<AddSibling />
					) : mode.adding === "partner" ? (
						<AddPartner />
					) : mode.adding === "child" ? (
						<AddChild />
					) : (
						<AddFamilyMember mode={mode} setMode={setMode} />
					)}
					{mode.adding ? (
						<Button onClick={handleSetCancel}>Cancel</Button>
					) : (
						<></>
					)}
				</Box>
			)}

			{/* ALL ALIVE FIELDS */}

			<Box sx={rowStyles}>
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
				<TextField
					id="abbr"
					label="Abbr"
					variant="outlined"
					value={dataTemp.abbr}
					name={"abbr"}
					onChange={handleNameValueChange}
				/>
			</Box>

			<Box sx={rowStyles}>
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
			<Box sx={rowStyles}>
				<TextField
					id="birth-place"
					label="Birth Place"
					variant="outlined"
					name="birthPlace"
					value={dataTemp.birthPlace}
					onChange={handleNameValueChange}
				/>
			</Box>
			{/* Birth Date */}
			<Box sx={rowStyles}>
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

			{/* ALL DECEASED FIELDS */}
			{dataTemp.deceased ? (
				<>
					{/* Death */}
					<Box sx={rowStyles}>
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
					<Box sx={rowStyles}>
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
					<Box sx={rowStyles}>
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

			{/* SAVE */}
			<Box>
				<Button onClick={handleOnSave}>Save</Button>
				<Button onClick={handleCancel}>Cancel</Button>
			</Box>
		</Box>
	);
}
