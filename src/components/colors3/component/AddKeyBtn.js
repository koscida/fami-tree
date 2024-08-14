import { useState } from "react";

export default function AddKeyBtn({
	value,
	rowIdx,
	colIdx,
	handleAddKeyFrame,
	handleCancel,
}) {
	const [keyFrameEdit, setKeyFrameEdit] = useState(value);

	return (
		<div className="buttonRow inputRow">
			<div className="inputField">
				<input
					type="number"
					value={keyFrameEdit}
					onChange={(e) => setKeyFrameEdit(e.target.value)}
				/>
			</div>
			<div className="inputSubmit">
				<button
					onClick={() =>
						handleAddKeyFrame(
							rowIdx,
							colIdx,
							parseInt(keyFrameEdit)
						)
					}
				>
					Save
				</button>
				{value > 0 ? (
					<button onClick={handleCancel}>Cancel</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
