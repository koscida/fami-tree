import { useEffect, useState } from "react";
import Canvas from "./canvas/Canvas";
import FamilyTree from "./d3-tree/FamilyTree";
import EditFamilyMember from "./family-list/EditFamilyMember";
import { Box, Button } from "@mui/material";
import FamilyFactory from "./family-member/FamilyFactory";
import loadDefault from "./family-member/defaultFamilyMembers";

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

function Tree() {
	let famFac = new FamilyFactory();
	let { members, relationships } = loadDefault(famFac);

	const [familyList, setFamilyList] = useState(members);
	const [isAdding, setIsAdding] = useState(false);
	// const [isOpenId, setIsOpenId] = useState(-1);
	const [canvas, setCanvas] = useState({
		width: 100,
		height: 100,
		padding: 20,
	});
	const [selectedId, setSelectedId] = useState(null);

	// on load
	useEffect(() => {
		const newCanvas = {
			width: window.innerWidth * 0.7 - canvas.padding,
			height: window.innerHeight - canvas.padding,
		};
		setCanvas(newCanvas);
	}, []);

	// handlers
	const handleNewSave = (newMember) => {
		setIsAdding(false);
		setFamilyList([...familyList, { ...newMember, id: familyList.length }]);
	};
	const handleItemSave = (editedMember) => {
		setSelectedId(-1);
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
		setSelectedId(-1);
	};
	const handleNewOpen = () => {
		setIsAdding(true);
		setSelectedId(-1);
	};
	const handleItemOpen = (i) => {
		setIsAdding(false);
		setSelectedId(i);
	};

	// render
	return (
		<div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
			<div>
				<div
					style={{ overflow: "scroll", height: canvas.height + "px" }}
				>
					{selectedId ? (
						<div>
							<EditFamilyMember
								data={
									familyList.filter(
										(mem) => mem.id === selectedId
									)[0]
								}
								handleSave={handleItemSave}
								handleCancel={handleItemCancel}
							/>
						</div>
					) : (
						<div>
							<div>
								{familyList.map((member) => {
									return (
										<Box key={member.id}>
											{selectedId === member.id ? (
												<EditFamilyMember
													data={member}
													handleSave={handleItemSave}
													handleCancel={
														handleItemCancel
													}
												/>
											) : (
												<>
													{member.fullName}
													<Button
														onClick={() =>
															handleItemOpen(
																member.id
															)
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
									<EditFamilyMember
										data={emptyFamilyMember}
										handleSave={handleNewSave}
										handleCancel={handleNewCancel}
									/>
								) : (
									<>
										<Button onClick={handleNewOpen}>
											Add New
										</Button>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			<div>
				<Box
					height={canvas.height + canvas.padding + "px"}
					width={canvas.width + canvas.padding + "px"}
					backgroundColor={"#ddd"}
				>
					{/* <FamilyTree /> */}
					<Canvas
						familyList={familyList}
						setFamilyList={setFamilyList}
						relationships={relationships}
						canvasSize={canvas}
						selectedId={selectedId}
						setSelectedId={setSelectedId}
					/>
				</Box>
			</div>
		</div>
	);
}

export default Tree;
