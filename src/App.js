import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Tree from "./components/family-tree/Tree";
import Colors from "./components/colors/Colors";
import FamilyMap from "./components/family-tree/family-member/FamilyMap";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Tree />,
		},
		{
			path: "/family-map",
			element: <FamilyMap />,
		},
		{
			path: "/colors",
			element: <Colors />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
