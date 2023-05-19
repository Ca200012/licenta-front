import React from "react";
import classes from "./Home.module.css";
import { useEffect } from "react";

function Home() {
	useEffect(() => {
		document.title = "Pagina de home";
	}, []);
	return (
		<div className={classes.text_center}>
			<h1>Welcome to the Home Page</h1>
			<p>This is the home page of our React app.</p>
		</div>
	);
}

export default Home;
