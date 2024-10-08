import React from "react";
import Tree from "../components/family-tree/Tree";
import Colors from "../components/colors/Colors";
import Colors2 from "../components/colors2/Colors";
import Colors3 from "../components/colors3/Colors";
import ViewFamilyMap from "../components/family-tree/family-member/ViewFamilyMap";
import Quilt from "../components/quilt/Quilt";
import Quilt2 from "../components/quilt2/Quilt2";
import Flow from "../components/flow/Flow";
import Home from "./Home";
import Oly from "../components/oly/Oly";

const routes = [
	{
		path: "/",
		element: <Home />,
		name: "Home",
	},
	{
		path: "/tree",
		element: <Tree />,
		name: "Tree",
	},
	{
		path: "/tree-map",
		element: <ViewFamilyMap />,
		name: "Tree Map",
	},
	{
		path: "/colors",
		element: <Colors />,
		name: "Colors",
	},
	{
		path: "/colors2",
		element: <Colors2 />,
		name: "Colors2",
	},
	{
		path: "/colors3",
		element: <Colors3 />,
		name: "Colors3",
	},
	{
		path: "/quilt",
		element: <Quilt />,
		name: "Quilt",
	},
	{
		path: "/quilt2",
		element: <Quilt2 />,
		name: "Quilt2",
	},
	{
		path: "/flow",
		element: <Flow />,
		name: "Flow",
	},
	{
		path: "/oly",
		element: <Oly />,
		name: "Flow",
	},
];
export default routes;
