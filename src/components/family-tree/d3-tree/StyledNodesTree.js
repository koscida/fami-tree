/* custom-tree.css */

// .node__root > circle {
// 	fill: red;
//   }

//   .node__branch > circle {
// 	fill: yellow;
//   }

//   .node__leaf > circle {
// 	fill: green;
// 	/* Let's also make the radius of leaf nodes larger */
// 	r: 40;
//   }

import React from "react";
import Tree from "react-d3-tree";
import "./custom-tree.css";

// ...

export default function StyledNodesTree({ data }) {
	return (
		<div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
			<Tree
				data={data}
				rootNodeClassName="node__root"
				branchNodeClassName="node__branch"
				leafNodeClassName="node__leaf"
			/>
		</div>
	);
}

// Styling Links

// Tree provides the pathClassFunc property to pass additional classNames to every link to be rendered.

// Each link calls pathClassFunc with its own TreeLinkDatum and the tree's current orientation. Tree expects pathClassFunc to return a className string.

function StyledLinksTree({ data }) {
	const getDynamicPathClass = ({ source, target }, orientation) => {
		if (!target.children) {
			// Target node has no children -> this link leads to a leaf node.
			return "link__to-leaf";
		}

		// Style it as a link connecting two branch nodes by default.
		return "link__to-branch";
	};

	return (
		<Tree
			data={data}
			// Statically apply same className(s) to all links
			pathClassFunc={() => "custom-link"}
			// Want to apply multiple static classes? `Array.join` is your friend :)
			//pathClassFunc={() => ["custom-link", "extra-custom-link"].join(" ")}
			// Dynamically determine which `className` to pass based on the link's properties.
			//pathClassFunc={getDynamicPathClass}
		/>
	);

	/*

Event Handlers

Tree exposes the following event handler callbacks by default:

    onLinkClick
    onLinkMouseOut
    onLinkMouseOver
    onNodeClick
    onNodeMouseOut
    onNodeMouseOver

    Note: Nodes are expanded/collapsed whenever onNodeClick fires. To prevent this, set the collapsible prop to false.
    onNodeClick will still fire, but it will not change the target node's expanded/collapsed state.



	*/
}

function CustomPathFuncTree({ data }) {
	const straightPathFunc = (linkDatum, orientation) => {
		const { source, target } = linkDatum;
		return orientation === "horizontal"
			? `M${source.y},${source.x}L${target.y},${target.x}`
			: `M${source.x},${source.y}L${target.x},${target.y}`;
	};

	return (
		<Tree
			data={data}
			// Passing `straight` function as a custom `PathFunction`.
			pathFunc={straightPathFunc}
		/>
	);
}
