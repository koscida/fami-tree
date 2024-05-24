import React from "react";
import Tree from "react-d3-tree";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.

// interface RawNodeDatum {
// 	name: string;
// 	attributes?: Record<string, string | number | boolean>;
// 	children?: RawNodeDatum[];
// }

const orgChart = {
	name: "CEO",
	children: [
		{
			name: "Manager",
			attributes: {
				department: "Production",
			},
			children: [
				{
					name: "Foreman",
					attributes: {
						department: "Fabrication",
					},
					children: [
						{
							name: "Worker",
						},
					],
				},
				{
					name: "Foreman",
					attributes: {
						department: "Assembly",
					},
					children: [
						{
							name: "Worker",
						},
					],
				},
			],
		},
	],
};

export default function FamilyTree() {
	return (
		// `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
		<div
			id="pageContainer"
			style={{
				position: "fixed",
				display: "flex",
				flexDirection: "row",
				height: "100%",
				width: "100%",
			}}
		>
			<div id="treeWrapper" style={{ height: "100%", width: "100%" }}>
				<div
					id="treeWrapperContainer"
					style={{
						width: "100%",
						height: "100%",
						border: "1px solid #ddd",
					}}
				>
					<Tree data={orgChart} orientation={"vertical"} />
				</div>
			</div>
		</div>
	);
}
