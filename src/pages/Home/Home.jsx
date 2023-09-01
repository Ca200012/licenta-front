import React from "react";
import classes from "./Home.module.css";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

function Home() {
	useEffect(() => {
		document.title = "Home page";
	}, []);
	return (
		<Container
			className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
		></Container>
	);
}

export default Home;
