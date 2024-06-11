import React from "react";
import Tree from "../components/family-tree/Tree";
import Colors from "../components/colors/Colors";
import ViewFamilyMap from "../components/family-tree/family-member/ViewFamilyMap";
import Quilt from "../components/quilt/Quilt";
import Quilt2 from "../components/quilt2/Quilt2";
import Home from "./Home";

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
		path: "/quilt",
		element: <Quilt />,
		name: "Quilt",
	},
	{
		path: "/quilt2",
		element: <Quilt2 />,
		name: "Quilt2",
	},
];
export default routes;
