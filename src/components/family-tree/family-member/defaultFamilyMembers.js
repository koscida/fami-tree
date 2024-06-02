import FamilyMember from "./FamilyMember";
import {
	ParentPartnerRelationship,
	ParentSingleRelationship,
	PartnerRelationship,
	SiblingGroupRelationship,
	SiblingParentSingleRelationship,
	SiblingParentPartnerRelationship,
} from "./FamilyRelationship";

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
	const a1 = new FamilyMember(1, fam3X - member, gen1Y, "", "", "MB");
	famFac.addMember(a1);

	// person 2 (grandparent)
	const a2 = new FamilyMember(2, fam3X + member, gen1Y, "", "", "WB");
	famFac.addMember(a2);
	// relationship (grandparent-grandparent)
	const ra1 = new PartnerRelationship(a1, a2);
	famFac.addRelationship(ra1);

	// ////
	// fam 1

	// person 3 (parent)
	const b1 = new FamilyMember(3, fam1X, gen2Y, "", "", "EK");
	famFac.addMember(b1);

	// person 4 (child)
	const b2 = new FamilyMember(4, fam1X - member, gen3Y, "", "", "BK");
	famFac.addMember(b2);

	// person 5 (child)
	const b3 = new FamilyMember(5, fam1X + member, gen3Y, "", "", "KK");
	famFac.addMember(b3);
	// relationships (sibling group)
	const bs1 = new SiblingGroupRelationship();
	bs1.addSibling(b2);
	bs1.addSibling(b3);
	famFac.addRelationship(bs1);
	// relationships (sibling group-parent)
	famFac.addRelationship(new SiblingParentSingleRelationship(bs1, b1));

	// ////
	// fam 2

	// person 6 (parent)
	const c1 = new FamilyMember(6, fam2X, gen2Y, "", "", "AA");
	famFac.addMember(c1);

	// person 7 (child)
	const c2 = new FamilyMember(7, fam2X, gen3Y, "", "", "AB");
	famFac.addMember(c2);
	// relationships (child-parent)
	famFac.addRelationship(new ParentSingleRelationship(c2, c1));

	// ////
	// fam 3

	// person 8 (parent)
	const d1 = new FamilyMember(8, fam3X - member, gen2Y, "", "", "CR");
	famFac.addMember(d1);

	// person 9 (parent partner)
	const d2 = new FamilyMember(9, fam3X + member, gen2Y, "", "", "TR");
	famFac.addMember(d2);
	// relationships (parent-parent)
	const rd1 = new PartnerRelationship(d1, d2);
	famFac.addRelationship(rd1);

	// person 10 (child)
	const d3 = new FamilyMember(10, fam3X - member * 2, gen3Y, "", "", "AR");
	famFac.addMember(d3);

	// person 11 (child)
	const d4 = new FamilyMember(11, fam3X, gen3Y, "", "", "GR");
	famFac.addMember(d4);

	// person 12 (child)
	const d5 = new FamilyMember(12, fam3X + member * 2, gen3Y, "", "", "NR");
	famFac.addMember(d5);
	// relationships (sibling group)
	const ds1 = new SiblingGroupRelationship();
	ds1.addSibling(d3);
	ds1.addSibling(d4);
	ds1.addSibling(d5);
	famFac.addRelationship(ds1);
	// relationships (sibling group-parent)
	famFac.addRelationship(new SiblingParentPartnerRelationship(ds1, rd1));

	// ////
	// fam 4

	// person 13 (parent)
	const e1 = new FamilyMember(13, fam4X - member, gen2Y, "", "", "BB");
	famFac.addMember(e1);
	// relationships (sibling group)
	const as1 = new SiblingGroupRelationship();
	as1.addSibling(b1);
	as1.addSibling(c1);
	as1.addSibling(d1);
	as1.addSibling(e1);
	famFac.addRelationship(as1);
	// relationships (sibling group-grandparent)
	famFac.addRelationship(new SiblingParentPartnerRelationship(as1, ra1));

	// person 14 (parent partner)
	const e2 = new FamilyMember(14, fam4X + member, gen2Y, "", "", "HB");
	famFac.addMember(e2);
	// relationships (parent-parent)
	const re1 = new PartnerRelationship(e1, e2);
	famFac.addRelationship(re1);

	// person 15 (child)
	const e3 = new FamilyMember(15, fam4X, gen3Y, "", "", "PB");
	famFac.addMember(e3);
	// relationships (child-parent relationship)
	famFac.addRelationship(new ParentPartnerRelationship(e3, re1));

	// ////
	// return
	return {
		members: famFac.getMembers(),
		relationships: famFac.getRelationships(),
	};
}
