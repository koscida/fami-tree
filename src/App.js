import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Tree from "./components/family-tree/Tree";
import Colors from "./components/colors/Colors";
import ViewFamilyMap from "./components/family-tree/family-member/ViewFamilyMap";
import Quilt from "./components/quilt/Quilt";
import Quilt2 from "./components/quilt2/Quilt2";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Tree />,
		},
		{
			path: "/family-map",
			element: <ViewFamilyMap />,
		},
		{
			path: "/colors",
			element: <Colors />,
		},
		{
			path: "/quilt",
			element: <Quilt />,
		},
		{
			path: "/quilt2",
			element: <Quilt2 />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
