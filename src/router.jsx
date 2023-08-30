import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

import Orders from "./components/profile/Orders";
import ContactUs from "./components/profile/ContactUs";
import PersonalData from "./components/profile/PersonalData";
import Returns from "./components/profile/Returns";

import Articles from "./pages/Articles/Articles";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import OrderPage from "./components/profile/OrderPage";

import Cart from "./pages/Cart/Cart";
import Checkout from "./components/cart/Checkout";

import ProtectedCheckoutRoute from "./guards/ProtectedCheckoutRoute";

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
						path: "/profile/orderpage",
						element: <OrderPage />,
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
				children: [
					{
						path: "checkout",
						element: (
							<ProtectedCheckoutRoute>
								<Checkout />
							</ProtectedCheckoutRoute>
						),
					},
				],
			},
		],
	},
]);

export default router;
