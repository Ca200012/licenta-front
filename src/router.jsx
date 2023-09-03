import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

import Orders from "./components/profile/Orders";
import ContactUs from "./components/profile/ContactUs";
import PersonalData from "./components/profile/PersonalData";

import Articles from "./pages/Articles/Articles";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import OrderPage from "./components/profile/OrderPage";

import Cart from "./pages/Cart/Cart";
import Checkout from "./components/cart/Checkout";

import ProtectedCheckoutRoute from "./guards/ProtectedCheckoutRoute";
import SizeGuidePage from "./pages/SizeGuidePage/SizeGuidePage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage/ReturnPolicyPage";
import PaymentAndShippingInfoPage from "./pages/PaymentAndShippingInfoPage/PaymentAndShippingInfoPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import FAQ from "./pages/FAQ/FAQ";
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
        path: "/password-reset",
        element: <PasswordReset />,
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
      {
        path: "/contactus",
        element: <ContactUsPage />,
      },
      {
        path: "/sizeguidepage",
        element: <SizeGuidePage />,
      },
      {
        path: "/returnpolicy",
        element: <ReturnPolicyPage />,
      },
      {
        path: "/paymentandshippinginfo",
        element: <PaymentAndShippingInfoPage />,
      },
      {
        path: "/aboutus",
        element: <AboutUsPage />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
    ],
  },
]);

export default router;
