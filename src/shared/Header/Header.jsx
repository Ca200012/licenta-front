import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import classes from "./Header.module.css";

function Header() {
	const { token, setUser, setToken } = useStateContext();

	const onLogout = (ev) => {
		ev.preventDefault();

		axiosClient.post("/logout").then(() => {
			setUser({});
			setToken(null);
		});
	};
	return (
		<>
			<Navbar bg="light" variant="light" className="px-0">
				<Container fluid className="p-0 m-0">
					{" "}
					{/* Apply fluid prop to the Container */}
					<Row className="w-100 d-flex justify-content-between">
						<Col className="d-flex justify-content-start ps-4">
							<Navbar.Brand href="/">
								<img
									alt=""
									src="/logo_licenta2.png"
									fluid="true"
									width="70"
									height="60"
									/* className="d-inline-block align-top" */
								/>{" "}
							</Navbar.Brand>
							<Nav className="mx-3 d-flex align-items-center justify-content-center">
								<Nav.Link href="#" className="mx-3 fw-bold">
									Femeie
								</Nav.Link>
								<Nav.Link href="#" className="mx-3 fw-bold">
									Barbat
								</Nav.Link>
								<Nav.Link href="#" className="mx-3 fw-bold">
									<FontAwesomeIcon icon={faSun} beat fade className="me-1" />
									Colectia de vara
								</Nav.Link>
								<Nav.Link href="#" className="mx-3 fw-bold">
									<FontAwesomeIcon icon={faFire} bounce className="me-1" />
									Promotii de sezon
								</Nav.Link>
							</Nav>
						</Col>
						<Col className="d-flex align-items-center justify-content-end pe-0">
							<Nav>
								<NavDropdown
									title={<FontAwesomeIcon icon={faUser} />}
									id="navbarDropdown"
									renderMenuOnMount={true}
								>
									{token && (
										<>
											<NavDropdown.Item href="/profile">
												Profil
											</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="#">Comenzi</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="/" onClick={onLogout}>
												Deconectare
											</NavDropdown.Item>
										</>
									)}
									{!token && (
										<>
											<NavDropdown.Item href="/login">
												Autentificare
											</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="/register">
												Nu aveti cont? Inregistrati-va
											</NavDropdown.Item>
										</>
									)}
								</NavDropdown>
								<Nav.Link eventKey={2} href="#" className="mx-2 fw-bold">
									<FontAwesomeIcon icon={faCartShopping} />
								</Nav.Link>
							</Nav>
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Cautare produse"
									className="me-2"
									aria-label="Search"
								/>
								<Button variant="light">
									<FontAwesomeIcon icon={faMagnifyingGlass} />
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
