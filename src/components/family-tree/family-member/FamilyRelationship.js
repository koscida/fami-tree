class FamilyRelationship {
	// relationshipType
	//	1 = parent
	//	2 = partner
	constructor(memberA, memberB) {
		this.memberA = memberA;
		this.memberB = memberB;
	}
}

class PartnerRelationship extends FamilyRelationship {
	// parent
	constructor(partnerA, partnerB) {
		super();
		this.memberA = partnerA;
		this.memberB = partnerB;
	}
}

class ParentSingleRelationship {
	// single parent
	constructor(child, parent) {
		this.memberA = child;
		this.memberB = parent;
	}
}

class ParentPartnerRelationship {
	// partner parent
	constructor(child, relationship) {
		this.memberA = child;
		this.relationship = relationship;
	}
}
class SiblingGroupRelationship {
	// sibling
	constructor() {
		this.siblingGroup = [];
	}
	addSibling(sibling) {
		this.siblingGroup.push(sibling);
	}
}
class SiblingParentSingleRelationship {
	// sibling single parent
	constructor(siblingGroup, parent) {
		this.siblingGroup = siblingGroup;
		this.parent = parent;
	}
}
class SiblingParentPartnerRelationship {
	// sibling partner parent
	constructor(siblingGroup, relationship) {
		this.siblingGroup = siblingGroup;
		this.relationship = relationship;
	}
}

export {
	FamilyRelationship,
	PartnerRelationship,
	ParentSingleRelationship,
	ParentPartnerRelationship,
	SiblingGroupRelationship,
	SiblingParentSingleRelationship,
	SiblingParentPartnerRelationship,
};
