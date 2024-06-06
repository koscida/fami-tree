import { canvasDrawLine } from "../canvas/functions";

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

	// methods
	//
	drawLine = (ctx, offSet, x1, y1, x2, y2) => {
		canvasDrawLine(
			ctx,
			x1 + offSet.x,
			y1 + offSet.y,
			x2 + offSet.x,
			y2 + offSet.y
		);
	};
	drawLineToPerson = (ctx, offSet, personA, personB) => {
		this.drawLine(ctx, offSet, personA.x, personA.y, personB.x, personB.y);
	};
	drawLineToChildrenWithPartner_old = (
		ctx,
		offSet,
		person,
		partner,
		children
	) => {
		this.drawLineToChildren(
			ctx,
			offSet,
			{ x: (person.x + partner.x) / 2, y: person.y },
			children
		);
	};
	drawLineToChildren = (ctx, offSet, parents, children) => {
		const mid =
			parents.length === 2
				? { x: (parents[0].x + parents[1].x) / 2, y: parents[0].y }
				: parents[0];

		const child1 = children[0];
		if (children.length > 1) {
			// more than 1 child, raise the bar
			const midBarY = child1.y - 50;

			// line straight down from parents
			this.drawLine(ctx, offSet, mid.x, mid.y, mid.x, midBarY);

			// bar across
			this.drawLine(
				ctx,
				offSet,
				child1.x,
				midBarY,
				children[children.length - 1].x,
				midBarY
			);

			// lines down to each child
			children.forEach((child) => {
				this.drawLine(ctx, offSet, child.x, midBarY, child.x, child.y);
			});
		} else {
			// single child, draw line straight down
			this.drawLine(ctx, offSet, mid.x, mid.y, mid.x, child1.y);
		}
	};
	//
	drawFamilyGroup(ctx, offSet = null) {
		const parents = this.parentGroup,
			children = this.childGroup;

		// draw line from parent-to-parent
		if (parents) {
			parents.forEach((parent, i) => {
				if (i > 0)
					this.drawLineToPerson(ctx, offSet, parents[i - 1], parent);
			});
		} else {
			// draw simple parent if sibling group
			if (children && children.length > 1) {
				// TODO: draw stub parent
			}
		}

		// draw sibling groups
		if (children && children.length > 0 && parents) {
			this.drawLineToChildren(ctx, offSet, parents, children);
		}
	}
}
