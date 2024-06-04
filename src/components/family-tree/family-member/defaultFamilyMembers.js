import FamilyMember from "./FamilyMember";
import FamilyGroup from "./FamilyGroup";

// consts
const fam1X = 100,
	fam2X = 300,
	fam3X = 500,
	fam4X = 700,
	gen1Y = 50,
	gen2Y = 150,
	gen3Y = 250,
	member = 50;

export default function loadDefault(famFac) {
	// ////
	// grandparents

	// person 1 (grandparent)
	const a1 = new FamilyMember(fam3X - member, gen1Y, "M", "B", "MB");
	famFac.addMember(a1);

	// person 2 (grandparent)
	const a2 = new FamilyMember(fam3X + member, gen1Y, "W", "B", "WB");
	famFac.addMember(a2);

	// ////
	// fam 1

	// person 3 (parent)
	const b1 = new FamilyMember(fam1X, gen2Y, "E", "K", "EK");
	famFac.addMember(b1);

	// person 4 (child)
	const b2 = new FamilyMember(fam1X - member, gen3Y, "B", "K", "BK");
	famFac.addMember(b2);

	// person 5 (child)
	const b3 = new FamilyMember(fam1X + member, gen3Y, "K", "K", "KK");
	famFac.addMember(b3);

	// relationships (sibling group + parent)
	const fgb1 = new FamilyGroup();
	fgb1.addParent(b1);
	fgb1.addChild(b2);
	fgb1.addChild(b3);
	famFac.addRelationship(fgb1);

	// ////
	// fam 2

	// person 6 (parent)
	const c1 = new FamilyMember(fam2X, gen2Y, "A", "A", "AA");
	famFac.addMember(c1);

	// person 7 (child)
	const c2 = new FamilyMember(fam2X, gen3Y, "A", "B", "AB");
	famFac.addMember(c2);

	// relationships (child-parent)
	const fgc1 = new FamilyGroup();
	fgc1.addParent(c1);
	fgc1.addChild(c2);
	famFac.addRelationship(fgc1);

	// ////
	// fam 3

	// person 8 (parent)
	const d1 = new FamilyMember(fam3X - member, gen2Y, "C", "R", "CR");
	famFac.addMember(d1);

	// person 9 (parent partner)
	const d2 = new FamilyMember(fam3X + member, gen2Y, "T", "R", "TR");
	famFac.addMember(d2);

	// person 10 (child)
	const d3 = new FamilyMember(fam3X - member * 2, gen3Y, "A", "R", "AR");
	famFac.addMember(d3);

	// person 11 (child)
	const d4 = new FamilyMember(fam3X, gen3Y, "G", "R", "GR");
	famFac.addMember(d4);

	// person 12 (child)
	const d5 = new FamilyMember(fam3X + member * 2, gen3Y, "N", "R", "NR");
	famFac.addMember(d5);

	// relationships (sibling group + parent group)
	const fgd1 = new FamilyGroup();
	fgd1.addParent(d1);
	fgd1.addParent(d2);
	fgd1.addChild(d3);
	fgd1.addChild(d4);
	fgd1.addChild(d5);
	famFac.addRelationship(fgd1);

	// ////
	// fam 4

	// person 13 (parent)
	const e1 = new FamilyMember(fam4X - member, gen2Y, "B", "B", "BB");
	famFac.addMember(e1);

	// person 14 (parent partner)
	const e2 = new FamilyMember(fam4X + member, gen2Y, "H", "B", "HB");
	famFac.addMember(e2);

	// person 15 (child)
	const e3 = new FamilyMember(fam4X, gen3Y, "P", "B", "PB");
	famFac.addMember(e3);

	// relationships (child-parent relationship)
	const fge1 = new FamilyGroup();
	fge1.addParent(e1);
	fge1.addParent(e2);
	fge1.addChild(e3);
	famFac.addRelationship(fge1);

	// relationship (grandparent + grandparent)
	const fga1 = new FamilyGroup();
	fga1.addParent(a1);
	fga1.addParent(a2);
	fga1.addChild(b1);
	fga1.addChild(c1);
	fga1.addChild(d1);
	fga1.addChild(e1);
	famFac.addRelationship(fga1);

	// ////
	// return
	return {
		members: famFac.getMembers(),
		relationships: famFac.getRelationships(),
	};
}
