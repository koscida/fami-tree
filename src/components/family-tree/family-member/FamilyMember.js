export default class FamilyMember {
	constructor(x, y, firstName, lastName, abbr) {
		this.id = 0;
		this.x = x;
		this.y = y;

		this._firstName = firstName;
		this._middleName = "";
		this._lastName = lastName;
		this._fullName = this.getFullName();
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

	set firstName(newFirstName) {
		this._firstName = newFirstName;
		this._fullName = this.getFullName();
	}
	set middleName(newMiddleName) {
		this._middleName = newMiddleName;
		this._fullName = this.getFullName();
	}
	set lastName(newLastName) {
		this._lastName = newLastName;
		this._fullName = this.getFullName();
	}
	set fullName(x) {
		this._fullName = this.getFullName();
	}
	get firstName() {
		return this._firstName;
	}
	get middleName() {
		return this._middleName;
	}
	get lastName() {
		return this._lastName;
	}
	get fullName() {
		return this._fullName;
	}

	getFullName() {
		return `${this._firstName} ${this._middleName} ${this._lastName}`;
	}

	// methods
	drawMember(ctx, offSet = null, selected = false) {
		const x = this.x + offSet.x;
		const y = this.y + offSet.y;
		const width = 20;
		const border = 1;
		const outlineWidth = width + 2 * border;

		// circle
		// ctx.arc(x, y, radius, startAngle, endAngle, [counterclockwise])
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.arc(x, y, width, 0, 2 * Math.PI);
		ctx.fill();

		// circle outline
		if (selected) {
			ctx.beginPath();
			ctx.arc(x, y, outlineWidth, 0, 2 * Math.PI);
			ctx.strokeStyle = "red";
			ctx.stroke();
		}

		// name
		// ctx.fillText(text, x, y, [maxwidth])
		ctx.fillStyle = "#ffffff";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillText(this.abbr, x, y);
	}

	drawMemberSelected(ctx, offSet = null) {
		this.drawMember(ctx, offSet, true);
	}
}
