import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer/Footer";

function Layout() {
	return (
		<>
			<div className="d-flex flex-column min-vh-100">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</>
	);
}

export default Layout;
