import "./styles.scss";
import DisplayOptions from "./DisplayOptions";
import { ColorProvider } from "./ColorContext";
import DisplayColors from "./DisplayColors";

export default function Colors() {
	// render

	return (
		<ColorProvider>
			<div className="colors3">
				<div className="colors">
					<DisplayColors />
				</div>

				<div className="options">
					<DisplayOptions />
				</div>
			</div>
		</ColorProvider>
	);
}
