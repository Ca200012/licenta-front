import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Profile/Orders";
import PersonalData from "./pages/Profile/PersonalData";
import Returns from "./pages/Profile/Returns";
import ContactUs from "./pages/Profile/ContactUs";
import Articles from "./pages/Articles/Articles";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import Cart from "./pages/Cart/Cart";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/profile",
				element: <Profile />,
				children: [
					{
						path: "/profile/personal-data",
						element: <PersonalData />,
					},
					{
						path: "/profile/orders",
						element: <Orders />,
					},
					{
						path: "/profile/returns",
						element: <Returns />,
					},
					{
						path: "/profile/contact-us",
						element: <ContactUs />,
					},
				],
			},
			{
				path: "/articles",
				element: <Articles />,
			},
			{
				path: "/articlepage",
				element: <ArticlePage />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
		],
	},
]);

export default router;
