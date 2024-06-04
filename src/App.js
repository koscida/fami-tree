import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Tree from "./components/family-tree/Tree";
import Colors from "./components/colors/Colors";
import ViewFamilyMap from "./components/family-tree/family-member/ViewFamilyMap";

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
	]);
	return <RouterProvider router={router} />;
}

export default App;
