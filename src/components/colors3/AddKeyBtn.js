import { useState } from "react";

export default function AddKeyBtn({ rowIdx, colIdx, handleAddKeyFrame }) {
	const [keyFrameEdit, setKeyFrameEdit] = useState("");

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
					Add Key Frame
				</button>
			</div>
		</div>
	);
}
