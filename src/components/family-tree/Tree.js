import { useEffect, useState } from "react";
import Canvas from "./canvas/Canvas";
import FamilyTree from "./d3-tree/FamilyTree";
import EditFamilyMember from "./family-list/EditFamilyMember";
import { Box, Button } from "@mui/material";
import FamilyFactory from "./family-member/FamilyFactory";
import loadDefault from "./family-member/defaultFamilyMembers";
import AddParent from "./family-list/add/AddParent";
import AddSibling from "./family-list/add/AddSibling";
import AddPartner from "./family-list/add/AddPartner";
import AddChild from "./family-list/add/AddChild";
import FamilyList from "./family-list/FamilyList";

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
	const [familyGroups, setFamilyGroups] = useState(relationships);
	const [mode, setMode] = useState({
		adding: null,
	});
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
		setMode({ ...mode, adding: null });
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
		setMode({ ...mode, adding: null });
	};
	const handleItemCancel = () => {
		setSelectedId(-1);
	};
	const handleNewOpen = () => {
		setMode({ ...mode, adding: "member" });
		setSelectedId(-1);
	};
	const handleItemOpen = (i) => {
		setMode({ ...mode, adding: null });
		setSelectedId(i);
	};

	// ////
	//
	// AddFamilyMember
	//
	/*
add:
(child perspective, add up, add side)
	parent
		I. 0 parents, 0 siblings
			(A) create familyGroup, add parent
		II. 1+ parent, 0 siblings
			(B) add parent to familyGroup
		III. 1 parent, 1+ siblings
			i. all full-siblings
				(B) add parent to familyGroup
			ii. some half-siblings
				a. select siblings
					(C) create new familyGroup, add parent, add sibling(s)
			iii. no half-siblings
				(D) create new familyGroup, add parent
		IV. 2 parents
			(E) error
	sibling
		I. 0 parents, 0 siblings
			(A) create new familyGroup, add stub parent, add sibling
		II. 1 parent, 0+ siblings
			(B) add sibling to familyGroup
		III. 2 parents, 0+ siblings
			i. full sibling
				(B) add sibling to familyGroup
			ii. half sibling
				a. select which parent shared
					(C) create new familyGroup, add sibling, add shared parent

(parent perspective, add side, add down)
	partner
		I. 0 partner, 0 children
			(A) create new familyGroup, add partner
		II. 0 partner, 1+children
			i. parent of all children
				(B) add partner to familyGroup
			ii. parent of some children
				a. select children
					(A) create new familyGroup, add partner, add shared children
			iii. parent of no children
				(A) create new familyGroup, add partner
		III. 1 partner, 0 children
			(A) create new familyGroup, add partner
		IV. 1 partner, 0_ children
			(C) error
	child
		I. 0 partner, 0 children
			(A) create new familyGroup, add child
		II. 0 partner, 1+ children
			(B) add child to familyGroup
		II. 1 partner, 0+ children
			(B) add child to familyGroup
		III. 1+ partner, 0+ children
			i. child share partner
				a. select partner
					(B) add child to familyGroup
			ii. no partner
				(A) create new familyGroup, add child 
*/

	// helper with member

	let selectedMember = null;
	if (selectedId) {
		selectedMember = familyList.filter((mem) => mem.id === selectedId)[0];

		const selectedRelationships = familyGroups.filter(
			(rel) => rel.findMember(selectedMember) ?? null
		);
		console.log("selectedRelationships: ", selectedRelationships);
	}

	// render
	return (
		<div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
			<div>
				<div
					style={{ overflow: "scroll", height: canvas.height + "px" }}
				>
					{mode.adding === "member" ? (
						<EditFamilyMember
							member={emptyFamilyMember}
							handleSave={handleNewSave}
							handleCancel={handleNewCancel}
						/>
					) : selectedId && selectedId > 0 ? (
						mode.adding === null ? (
							<EditFamilyMember
								member={selectedMember}
								handleSave={handleItemSave}
								handleCancel={handleItemCancel}
								mode={mode}
								setMode={setMode}
							/>
						) : (
							<div>
								{mode.adding === "parent" ? (
									<AddParent />
								) : mode.adding === "sibling" ? (
									<AddSibling />
								) : mode.adding === "partner" ? (
									<AddPartner />
								) : mode.adding === "child" ? (
									<AddChild />
								) : (
									<></>
								)}
								<Button onClick={handleNewCancel}>
									Cancel
								</Button>
							</div>
						)
					) : (
						<FamilyList
							familyList={familyList}
							handleItemOpen={handleItemOpen}
							handleNewOpen={handleNewOpen}
						/>
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
