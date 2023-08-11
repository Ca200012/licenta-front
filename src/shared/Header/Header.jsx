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

	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [articleTypes, setArticleTypes] = useState([]);

	const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
	const [isSubCategoriesLoading, setIsSubCategoriesLoading] = useState(false);
	const [isArticleTypesLoading, setIsArticleTypesLoading] = useState(false);

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
		setIsCategoriesLoading(true);

		try {
			const response = await axiosClient.get("/category/" + id);
			const data = response.data.data;
			console.log("Data from API: ", data);
			setIsCategoriesLoading(false);
			setCategories(data);
			return data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
				}
			}
		}
	};

	const getSubcategories = async (id) => {
		if (!id) {
			return;
		}
		setIsSubCategoriesLoading(true);

		try {
			const response = await axiosClient.get("/subcategory/" + id);
			const data = response.data.data;
			console.log("Data from API: ", data);
			setIsSubCategoriesLoading(false);
			setSubCategories(data);
			return data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
				}
			}
		}
	};

	const getArticleTypes = async (e, id) => {
		if (!id) {
			return;
		}

		setIsArticleTypesLoading(true);

		try {
			const response = await axiosClient.get("/articletype/" + id);
			const data = response.data.data;
			console.log("Data from API: ", data);
			setIsArticleTypesLoading(false);
			setArticleTypes(data);
			return data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
				}
			}
		}
	};

	const navigateToArticlesPage = (
		gender,
		category = null,
		subcategory = null,
		articletype = null
	) => {
		if (!category) navigate(`/articles?gender=${gender}`);
		else if (!subcategory)
			navigate(`/articles?gender=${gender}&category=${category}`);
		else if (!articletype)
			navigate(
				`/articles?gender=${gender}&category=${category}&subCategory=${subcategory}`
			);
		else
			navigate(
				`/articles?gender=${gender}&category=${category}&subCategory=${subcategory}&articletype=${articletype}`
			);
	};

	return (
		<>
			<Navbar bg="light" variant="light" className="px-0">
				<Container fluid className="p-0 m-0">
					{" "}
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
								{/* women */}
								<NavDropdown
									title="Women"
									id="1"
									renderMenuOnMount={true}
									className="mx-3 fw-bold"
									onClick={(e) => getCategories(e.target.id)}
								>
									<NavDropdown.Item
										onClick={() => {
											navigateToArticlesPage("Women");
										}}
									>
										See All
									</NavDropdown.Item>
									{(isCategoriesLoading &&
										!isSubCategoriesLoading &&
										!isArticleTypesLoading) ||
									!categories.length ? (
										<NavDropdown.Item>Loading...</NavDropdown.Item>
									) : (
										categories.map((item, index) => (
											<NavDropdown
												key={index}
												title={item.name}
												drop={"end"}
												onClick={(e) => {
													getSubcategories(item.category_id);
												}}
											>
												<NavDropdown.Item
													onClick={() => {
														navigateToArticlesPage("Women", item.name);
													}}
												>
													See All
												</NavDropdown.Item>
												{(isSubCategoriesLoading &&
													!isCategoriesLoading &&
													!isArticleTypesLoading) ||
												!subCategories.length ? (
													<NavDropdown.Item>Loading...</NavDropdown.Item>
												) : (
													subCategories.map((subCat, subIndex) => (
														<NavDropdown
															key={subIndex}
															title={subCat.name}
															onClick={(e) => {
																e.stopPropagation();
																getArticleTypes(e, subCat.subcategory_id);
															}}
														>
															<NavDropdown.Item
																onClick={() => {
																	navigateToArticlesPage(
																		"Women",
																		item.name,
																		subCat.name,
																		""
																	);
																}}
															>
																See All
															</NavDropdown.Item>
															{(isArticleTypesLoading &&
																!isCategoriesLoading) ||
															!articleTypes.length ? (
																<NavDropdown.Item>Loading...</NavDropdown.Item>
															) : (
																articleTypes.map((artType, artIndex) => (
																	<NavDropdown.Item
																		key={artIndex}
																		title={artType.name}
																		onClick={() => {
																			navigateToArticlesPage(
																				"Women",
																				item.name,
																				subCat.name,
																				artType.name
																			);
																		}}
																	>
																		{artType.name}
																	</NavDropdown.Item>
																))
															)}
														</NavDropdown>
													))
												)}
											</NavDropdown>
										))
									)}
								</NavDropdown>
								{/* men */}
								<NavDropdown
									title="Men"
									id="2"
									renderMenuOnMount={true}
									className="mx-3 fw-bold"
									onClick={(e) => getCategories(e.target.id)}
								>
									<NavDropdown.Item
										onClick={() => {
											navigateToArticlesPage("Men", "", "", "");
										}}
									>
										See All
									</NavDropdown.Item>
									{(isCategoriesLoading &&
										!isSubCategoriesLoading &&
										!isArticleTypesLoading) ||
									!categories.length ? (
										<NavDropdown.Item>Loading...</NavDropdown.Item>
									) : (
										categories.map((item, index) => (
											<NavDropdown
												key={index}
												title={item.name}
												drop={"end"}
												onClick={(e) => {
													getSubcategories(item.category_id);
												}}
											>
												<NavDropdown.Item
													onClick={() => {
														navigateToArticlesPage("Men", item.name, "", "");
													}}
												>
													See All
												</NavDropdown.Item>
												{(isSubCategoriesLoading &&
													!isCategoriesLoading &&
													!isArticleTypesLoading) ||
												!subCategories.length ? (
													<NavDropdown.Item>Loading...</NavDropdown.Item>
												) : (
													subCategories.map((subCat, subIndex) => (
														<NavDropdown
															key={subIndex}
															title={subCat.name}
															onClick={(e) => {
																e.stopPropagation();
																getArticleTypes(e, subCat.subcategory_id);
															}}
														>
															<NavDropdown.Item
																onClick={() => {
																	navigateToArticlesPage(
																		"Men",
																		item.name,
																		subCat.name,
																		""
																	);
																}}
															>
																See All
															</NavDropdown.Item>
															{(isArticleTypesLoading &&
																!isCategoriesLoading) ||
															!articleTypes.length ? (
																<NavDropdown.Item>Loading...</NavDropdown.Item>
															) : (
																articleTypes.map((artType, artIndex) => (
																	<NavDropdown.Item
																		key={artIndex}
																		title={artType.name}
																		onClick={() => {
																			navigateToArticlesPage(
																				"Men",
																				item.name,
																				subCat.name,
																				artType.name
																			);
																		}}
																	>
																		{artType.name}
																	</NavDropdown.Item>
																))
															)}
														</NavDropdown>
													))
												)}
											</NavDropdown>
										))
									)}
								</NavDropdown>
								{/* unisex */}
								<NavDropdown
									title="Unisex"
									id="3"
									renderMenuOnMount={true}
									className="mx-3 fw-bold"
									onClick={(e) => getCategories(e.target.id)}
								>
									<NavDropdown.Item
										onClick={() => {
											navigateToArticlesPage("Unisex", "", "", "");
										}}
									>
										See All
									</NavDropdown.Item>
									{(isCategoriesLoading &&
										!isSubCategoriesLoading &&
										!isArticleTypesLoading) ||
									!categories.length ? (
										<NavDropdown.Item>Loading...</NavDropdown.Item>
									) : (
										categories.map((item, index) => (
											<NavDropdown
												key={index}
												title={item.name}
												drop={"end"}
												onClick={(e) => {
													getSubcategories(item.category_id);
												}}
											>
												<NavDropdown.Item
													onClick={() => {
														navigateToArticlesPage("Unisex", item.name, "", "");
													}}
												>
													See All
												</NavDropdown.Item>
												{(isSubCategoriesLoading &&
													!isCategoriesLoading &&
													!isArticleTypesLoading) ||
												!subCategories.length ? (
													<NavDropdown.Item>Loading...</NavDropdown.Item>
												) : (
													subCategories.map((subCat, subIndex) => (
														<NavDropdown
															key={subIndex}
															title={subCat.name}
															onClick={(e) => {
																e.stopPropagation();
																getArticleTypes(e, subCat.subcategory_id);
															}}
														>
															<NavDropdown.Item
																onClick={() => {
																	navigateToArticlesPage(
																		"Unisex",
																		item.name,
																		subCat.name,
																		""
																	);
																}}
															>
																See All
															</NavDropdown.Item>
															{(isArticleTypesLoading &&
																!isCategoriesLoading) ||
															!articleTypes.length ? (
																<NavDropdown.Item>Loading...</NavDropdown.Item>
															) : (
																articleTypes.map((artType, artIndex) => (
																	<NavDropdown.Item
																		key={artIndex}
																		title={artType.name}
																		onClick={() => {
																			navigateToArticlesPage(
																				"Unisex",
																				item.name,
																				subCat.name,
																				artType.name
																			);
																		}}
																	>
																		{artType.name}
																	</NavDropdown.Item>
																))
															)}
														</NavDropdown>
													))
												)}
											</NavDropdown>
										))
									)}
								</NavDropdown>
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
