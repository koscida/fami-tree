import { Button } from "@mui/material";

export default function AddFamilyMember({ mode, setMode }) {
	const handleSetAdd = (e) => {
		const {
			target: { name },
		} = e;
		setMode({ ...mode, adding: name });
	};

	return (
		<>
			<Button onClick={handleSetAdd} name={"parent"}>
				Add Parent
			</Button>
			<Button onClick={handleSetAdd} name={"sibling"}>
				Add Sibling
			</Button>
			<Button onClick={handleSetAdd} name={"partner"}>
				Add Partner
			</Button>
			<Button onClick={handleSetAdd} name={"child"}>
				Add Child
			</Button>
		</>
	);
}
