import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./home/nav";

function App() {
	const router = createBrowserRouter(routes);
	return <RouterProvider router={router} />;
}

export default App;
