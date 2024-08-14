import { useColorContext } from "./ColorContext";

import DisplayAddColorRow from "./DisplayAddColorRow";
import DisplayColorList from "./DisplayColorList";

export default function DisplayColors() {
	const { colorList, maxRows } = useColorContext();

	const totalRows = Object.entries(colorList).length;
	const canAddRow = totalRows < maxRows;

	return (
		<>
			{/* Display Add Color at row 0 */}
			{canAddRow ? <DisplayAddColorRow rowIdx={-0.5} /> : <></>}

			{/* Display all color rows */}
			<DisplayColorList />

			{/* Display Add Color at last row */}
			{canAddRow && totalRows > 0 ? (
				<DisplayAddColorRow rowIdx={totalRows} />
			) : (
				<></>
			)}
		</>
	);
}
