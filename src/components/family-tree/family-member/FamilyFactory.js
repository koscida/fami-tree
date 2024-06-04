export default class FamilyFactory {
	constructor() {
		this.members = [];
		this.relationships = [];
	}

	getMembers() {
		return this.members;
	}
	getRelationships() {
		return this.relationships;
	}

	addMember(member) {
		const newId = this.members.length;
		member.id = newId;
		this.members.push(member);
	}
	addRelationship(relationship) {
		this.relationships.push(relationship);
	}
}
