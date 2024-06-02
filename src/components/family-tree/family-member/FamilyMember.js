import { canvasDrawDot } from "../canvas/functions";

export default class FamilyMember {
	constructor(id, x, y, firstName, lastName, abbr) {
		this.id = id;
		this.x = x;
		this.y = y;

		this.firstName = firstName;
		this.middleName = "";
		this.lastName = lastName;
		this.abbr = abbr;
		this.gender = "";
		this.deceased = "";
		this.birthPlace = "";
		this.birthMonth = "";
		this.birthDay = "";
		this.birthYear = "";
		this.deathPlace = "";
		this.deathMonth = "";
		this.deathDay = "";
		this.deathYear = "";
		this.burialPlace = "";
		this.birthLot = "";
	}

	// methods
	drawMember(ctx, offSet = null) {
		canvasDrawDot(
			ctx,
			this.x + (offSet ? offSet.x : 0),
			this.y + (offSet ? offSet.y : 0),
			this.abbr
		);
	}
}
