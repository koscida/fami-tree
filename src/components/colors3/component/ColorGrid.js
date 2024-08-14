export default function ColorGrid({ cellColor: { color, r, g, b } }) {
	return (
		<div className="colorGrid">
			<div>
				<div>
					<p>Color: </p>
					<p>{color}</p>
				</div>
				{r >= 0 && g >= 0 && b >= 0 ? (
					<div>
						<p>RGB: </p>
						<p>
							({r}, {g}, {b})
						</p>
					</div>
				) : (
					<></>
				)}
			</div>
			{/* <div>
		<div>
			<p>Hue: </p>
			<p>{cellColor.h}</p>
		</div>
		<div>
			<p>Saturation: </p>
			<p>{cellColor.s}</p>
		</div>
		{colorModel === "hsl" ? (
			<div>
				<p>Light: </p>
				<p>{cellColor.l}</p>
			</div>
		) : (
			<div>
				<p>Value: </p>
				<p>{cellColor.v}</p>
			</div>
		)}
		<div
			style={{
				width: "40px",
				height: "40px",
				backgroundColor: `hsl(${
					cellColor.h
				}, ${(cellColor.s / 255) * 100}%, ${
					(cellColor.l / 255) * 100
				}%)`,
			}}
		></div>
	</div> */}
		</div>
	);
}
