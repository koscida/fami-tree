import { useEffect, useState } from "react";
import Canvas from "./compoents/canvas/Canvas";
import FamilyTree from "./compoents/d3-tree/FamilyTree";
import FamilyMember from "./compoents/family-list/FamilyMember";
import { Box, Button } from "@mui/material";

const initFamily = [
	{
		id: 1,
		firstName: "Jane",
		middleName: "Ann",
		lastName: "Doe",
		gender: "female",
		deceased: true,
		birthPlace: "",
		birthMonth: 1,
		birthDay: 2,
		birthYear: 1928,
		deathPlace: "",
		deathMonth: 3,
		deathDay: 9,
		deathYear: 1999,
		burialPlace: "",
		birthLot: "",
	},
	{
		id: 2,
		firstName: "John",
		middleName: "Paul",
		lastName: "Doe",
		gender: "male",
		deceased: true,
		birthPlace: "",
		birthMonth: 1,
		birthDay: 2,
		birthYear: 1928,
		deathPlace: "",
		deathMonth: 3,
		deathDay: 9,
		deathYear: 1999,
		burialPlace: "",
		birthLot: "",
	},
];
const emptyFamilyMember = {
	firstName: "",
	middleName: "",
	lastName: "",
	gender: "",
	deceased: "",
	birthPlace: "",
	birthMonth: "",
	birthDay: "",
	birthYear: "",
	deathPlace: "",
	deathMonth: "",
	deathDay: "",
	deathYear: "",
	burialPlace: "",
	birthLot: "",
};

function App() {
	const [familyList, setFamilyList] = useState(initFamily);
	const [isAdding, setIsAdding] = useState(false);
	const [isOpen, setIsOpen] = useState(-1);
	const [canvas, setCanvas] = useState({
		width: 100,
		height: 100,
	});

	// on load
	useEffect(() => {
		const padding = 20;
		const newCanvas = {
			width: window.innerWidth * 0.7 - padding,
			height: window.innerHeight - padding,
		};
		setCanvas(newCanvas);
	}, []);

	// handlers
	const handleNewSave = (newMember) => {
		setIsAdding(false);
		setFamilyList([...familyList, { ...newMember, id: familyList.length }]);
	};
	const handleItemSave = (editedMember) => {
		setIsOpen(-1);
		setFamilyList([
			...familyList.map((f) =>
				f.id === editedMember.id ? editedMember : f
			),
		]);
	};
	const handleNewCancel = () => {
		setIsAdding(false);
	};
	const handleItemCancel = () => {
		setIsOpen(-1);
	};
	const handleNewOpen = () => {
		setIsAdding(true);
		setIsOpen(-1);
	};
	const handleItemOpen = (i) => {
		setIsAdding(false);
		setIsOpen(i);
	};

	// render
	return (
		<div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
			<div>
				<div>
					{familyList.map((member) => {
						return (
							<Box key={member.id}>
								{isOpen === member.id ? (
									<FamilyMember
										data={member}
										handleSave={handleItemSave}
										handleCancel={handleItemCancel}
									/>
								) : (
									<>
										{member.firstName}
										<Button
											onClick={() =>
												handleItemOpen(member.id)
											}
										>
											Edit
										</Button>
									</>
								)}
							</Box>
						);
					})}
				</div>
				<hr />
				<div>
					{isAdding ? (
						<FamilyMember
							data={emptyFamilyMember}
							handleSave={handleNewSave}
							handleCancel={handleNewCancel}
						/>
					) : (
						<>
							<Button onClick={handleNewOpen}>Add New</Button>
						</>
					)}
				</div>
			</div>
			<div>
				<Box
					height={canvas.height + 20 + "px"}
					width={canvas.width + 20 + "px"}
					backgroundColor={"#ddd"}
				>
					{/* <FamilyTree /> */}
					<Canvas family={familyList} canvasSize={canvas} />
				</Box>
			</div>
		</div>
	);
}

export default App;
