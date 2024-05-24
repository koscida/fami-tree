import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Tree from "./compoents/family-tree/Tree";
import Colors from "./compoents/colors/Colors";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Tree />,
		},
		{
			path: "/colors",
			element: <Colors />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
