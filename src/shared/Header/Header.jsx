import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

import {
	Col,
	Row,
	Container,
	Navbar,
	Nav,
	Form,
	NavDropdown,
	Button,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFire,
	faUser,
	faCartShopping,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
	const navigate = useNavigate();
	const { token, setUser, setToken } = useStateContext();
	const [hoveredDropdown, setHoveredDropdown] = useState(null);
	const [closeTimeout, setCloseTimeout] = useState(null);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);

	const handleMouseEnter = (id) => {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			setCloseTimeout(null);
		}
		setHoveredDropdown(id);
	};

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => {
			setHoveredDropdown(null);
		}, 600); // 300 milliseconds delay before closing the dropdown
		setCloseTimeout(timeout);
	};

	const onLogout = (ev) => {
		ev.preventDefault();
		axiosClient.post("/logout").then(() => {
			setUser({});
			setToken(null);
			navigate("/login");
		});
	};

	const getCategories = async (id) => {
		if (!id) {
			return;
		}

		try {
			const response = await axiosClient.get("/category/" + id);
			const data = response.data.data;
			console.log("Data from API: ", data);
			setCategories(data);
			return data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
					//setBackendErrors(response.data.errors);
				}
			}
		}
	};

	const getSubcategories = async (id) => {
		if (!id) {
			return;
		}

		try {
			const response = await axiosClient.get("/subcategory/" + id);
			const data = response.data.data;
			console.log("Data from API: ", data);
			setSubCategories(data);
			return data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
					//setBackendErrors(response.data.errors);
				}
			}
		}
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
								<NavDropdown
									title="Women"
									id="1"
									renderMenuOnMount={true}
									className="mx-3 fw-bold"
									show={hoveredDropdown === "1"}
									// onMouseOver={(e) => {
									// 	handleMouseEnter("1");
									// 	getCategories(e.target.id);
									// }}
									// onMouseOut={handleMouseLeave}
									// onClick={() => navigate("/profile/personal-data")}
								>
									{categories?.map((item, index) => (
										<NavDropdown
											id={item.category_id}
											renderMenuOnMount={true}
											key={index}
											title={item.name}
											// onMouseOver={(e) => {
											// 	handleMouseEnter(item.category_id);
											// 	getSubcategories(item.category_id);
											// }}
											// onMouseOut={handleMouseLeave}
											// onClick={() => navigate("/profile/orders")}
										>
											{subCategories.map((subCategory, subIndex) => (
												<NavDropdown.Item key={subIndex} href="#">
													{subCategory.name}
												</NavDropdown.Item>
											))}
										</NavDropdown>
									))}
								</NavDropdown>

								<NavDropdown
									title="Men"
									id="2"
									renderMenuOnMount={true}
									className="mx-3 fw-bold"
									onClick={(e) => getCategories(e.target.id)}
								></NavDropdown>
								<NavDropdown
									title="Unisex"
									id="3"
									renderMenuOnMount={true}
									className="mx-3 fw-bold"
									onClick={(e) => getCategories(e.target.id)}
								></NavDropdown>
								<Nav.Link href="#" className="mx-3 fw-bold">
									<FontAwesomeIcon icon={faFire} bounce className="me-1" />
									Sales
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
												Profile
											</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="/profile/orders">
												Orders
											</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="/" onClick={onLogout}>
												Logout
											</NavDropdown.Item>
										</>
									)}
									{!token && (
										<>
											<NavDropdown.Item href="/login">Login</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="/register">
												Don't have an account? Sign up here
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
									placeholder="Search"
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
