import { Button } from "@mui/material";

export default function AddFamilyMember({ addingFamily, setAddingFamily }) {
	const { isAdding } = addingFamily;

	const handleSetAdd = (e) => {
		const {
			target: { name },
		} = e;
		setAddingFamily({ ...addingFamily, isAdding: name });
	};
	const handleSetCancel = () =>
		setAddingFamily({ ...addingFamily, isAdding: null });

	return (
		<>
			{isAdding ? (
				<>
					{" "}
					Adding{" "}
					{isAdding === "parent" ? (
						<>Parent</>
					) : isAdding === "sibling" ? (
						<>Sibling</>
					) : (
						<>Child</>
					)}
					<Button onClick={handleSetCancel}>Cancel</Button>
				</>
			) : (
				<>
					<Button onClick={handleSetAdd} name={"parent"}>
						Add Parent
					</Button>
					<Button onClick={handleSetAdd} name={"sibling"}>
						Add Sibling
					</Button>
					<Button onClick={handleSetAdd} name={"child"}>
						Add Child
					</Button>
				</>
			)}
		</>
	);
}