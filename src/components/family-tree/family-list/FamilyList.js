import { Box, Button } from "@mui/material";

export default function FamilyList({
	familyList,
	handleItemOpen,
	handleNewOpen,
}) {
	return (
		<>
			<div>
				{familyList.map((member) => {
					return (
						<Box key={member.id}>
							{member.fullName}
							<Button onClick={() => handleItemOpen(member.id)}>
								Edit
							</Button>
						</Box>
					);
				})}
			</div>
			<hr />
			<div>
				<Button onClick={handleNewOpen}>Add New</Button>
			</div>
		</>
	);
}
