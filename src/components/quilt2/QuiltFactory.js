import Quilt9Block from "./obj/Quilt9Block";
import QuiltBlock from "./obj/QuiltBlock";

export default class QuiltFactory {
	static createNewBlock(type) {
		return type === "9block" ? new Quilt9Block(type) : new QuiltBlock(type);
	}
}
