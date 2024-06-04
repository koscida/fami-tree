export default class FamilyGroup {
	constructor() {
		this.parentGroup = [];
		this.childGroup = [];
	}
	addParent(parent) {
		this.parentGroup.push(parent);
	}
	addChild(child) {
		this.childGroup.push(child);
	}
}
