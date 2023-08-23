import classes from "./Articles.module.css";

import axiosClient from "../../axios-client";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Dropdown,
	DropdownButton,
	Form,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faArrowUp,
	faSliders,
	faCheck,
	faClose,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Articles() {
	const navigate = useNavigate();
	const location = useLocation();
	const query = useQuery();
	const gender = query.get("gender");
	const category = query.get("category");
	const subCategory = query.get("subcategory");
	const articleType = query.get("articletype");

	const [articles, setArticles] = useState([]);
	const [filters, setFilters] = useState([]);
	const [formData, setFormData] = useState({});
	const [filtersDropdownIsOpen, setFiltersDropdownIsOpen] = useState(false);

	useEffect(() => {
		getArticles();
	}, [location]);

	const handleSortChange = (e) => {
		const sortType = e.currentTarget.getAttribute("value");
		// Update the URL with the sorting parameter
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set("sort", sortType);
		window.history.pushState({}, "", currentUrl.toString());

		// Call the function to get articles with sorting
		getArticles();
	};

	const navigateToArticlePage = (id) => {
		const encodedId = btoa(id.toString());
		navigate(`/articlepage?id=${encodedId}`);
	};

	const handleCheckboxChange = (filterTitle, value, isChecked) => {
		let updatedFormData = { ...formData };

		if (isChecked) {
			if (!updatedFormData[filterTitle]) {
				updatedFormData[filterTitle] = [];
			}
			updatedFormData[filterTitle].push(value);
		} else {
			updatedFormData[filterTitle] = updatedFormData[filterTitle].filter(
				(item) => item !== value
			);
		}

		setFormData(updatedFormData);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		getArticles();
	};

	const scrollTop = () => {
		console.log("scrolling");
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	const getArticles = async (currentFilters = formData) => {
		console.log("called");
		// setAreArticlesLoading(true);
		let verif = 0;
		console.log(formData);
		try {
			let url = "/article";
			url += gender ? "/" + gender : "";
			url += category ? "/" + category : "";
			url += subCategory ? "/" + subCategory : "";
			url += articleType ? "/" + articleType : "";
			const currentQuery = new URLSearchParams(window.location.search);
			const sortType = currentQuery.get("sort");
			console.log(sortType);
			if (sortType) {
				if (!verif) {
					url += `?sort=${sortType}`;
					verif = 1;
				} else {
					url += `&sort=${sortType}`;
				}
			}

			if (currentFilters["Brand"]) {
				currentFilters["Brand"].map((item, index) => {
					if (!verif) {
						url += `?brand${index}=${item}`;
						verif = 1;
					} else {
						url += `&brand${index}=${item}`;
					}
				});
			}

			if (currentFilters["Colour"]) {
				currentFilters["Colour"].map((item, index) => {
					if (!verif) {
						url += `?colour${index}=${item}`;
						verif = 1;
					} else {
						url += `&colour${index}=${item}`;
					}
				});
			}

			if (currentFilters["Usage"]) {
				currentFilters["Usage"].map((item, index) => {
					if (!verif) {
						url += `?usage${index}=${item}`;
						verif = 1;
					} else {
						url += `&usage${index}=${item}`;
					}
				});
			}

			if (currentFilters["Season"]) {
				currentFilters["Season"].map((item, index) => {
					if (!verif) {
						url += `?season${index}=${item}`;
						verif = 1;
					} else {
						url += `&season${index}=${item}`;
					}
				});
			}

			if (currentFilters["Pattern"]) {
				currentFilters["Pattern"].map((item, index) => {
					if (!verif) {
						url += `?pattern${index}=${item}`;
						verif = 1;
					} else {
						url += `&pattern${index}=${item}`;
					}
				});
			}

			console.log(url);
			const response = await axiosClient.get(url);
			const data = response.data.data;
			console.log("Articole din baza de date: ", data.articles);
			console.log(typeof data.filters);

			// setAreArticlesLoading(false);
			setArticles(data.articles);
			setFilters(data.filters);
			//console.log("Articole: ", articles);
			return data;
		} catch (err) {
			console.log(err);
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
				}
			}
		}
	};

	const resetFilters = () => {
		setFormData({});
		getArticles({});
		setFiltersDropdownIsOpen(false);
	};

	return (
		<>
			<Button
				variant="light"
				className="position-fixed"
				style={{ bottom: "10px", right: "10px" }}
				onClick={() => scrollTop()}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</Button>
			<Container
				className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 pt-5`}
			>
				<Row className="w-100 mx-0">
					<Col
						className={`${classes.header} p-0`}
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={12}
					>
						{/* schimbat dinamic in functie de ce categorie/subcategorie/articletype e ales */}
						<h1 className="py-3 text-center">
							{articleType
								? articleType
								: subCategory
								? subCategory
								: category
								? category
								: gender}
						</h1>
					</Col>
				</Row>

				<Row className="w-100 mx-0 py-3 bg-light">
					<Col className="d-flex" xl={12} lg={12} md={12} sm={12} xs={12}>
						<DropdownButton title="Sort by" variant="light">
							<Dropdown.Item value="asc" onClick={handleSortChange}>
								Lowest to highest price
							</Dropdown.Item>
							<Dropdown.Divider></Dropdown.Divider>
							<Dropdown.Item value="desc" onClick={handleSortChange}>
								Highest to lowest price
							</Dropdown.Item>
						</DropdownButton>

						<Dropdown
							className="mx-2"
							show={filtersDropdownIsOpen}
							onToggle={(isOpen) => setFiltersDropdownIsOpen(isOpen)}
						>
							<Dropdown.Toggle variant="light">
								Filters{"  "}
								{/* <FontAwesomeIcon icon={faSliders} /> */}
							</Dropdown.Toggle>

							<Dropdown.Menu className="px-2">
								<Form onSubmit={handleFormSubmit} className="w-100">
									<Row className="d-flex flex-xl-nowrap flex-lg-nowrap flex-md-nowrap align-items-center justify-content-sm-center justify-content-xs-center">
										{filters.map((filter, index) => (
											<Col className="d-flex justify-content-sm-center justify-content-xs-center">
												<Dropdown key={index}>
													<Dropdown.Toggle variant="light">
														{filter.title}
													</Dropdown.Toggle>

													<Dropdown.Menu
														className={classes.scrollable_dropdown}
													>
														{filter.values.map((subItem, subIndex) => (
															<Form.Check
																type="checkbox"
																id={`${filter.title}-${subIndex}`}
																key={subIndex}
																className="mx-2 d-flex align-items-center label-parent"
																label={
																	<div className="d-flex align-items-center justify-content-between">
																		<span className="mx-2">{subItem}</span>
																		{filter.title === "Colour" && (
																			<span
																				className="ms-3 border"
																				style={{
																					background: subItem,
																					width: 15,
																					height: 15,
																				}}
																			></span>
																		)}
																	</div>
																}
																checked={
																	formData[filter.title] &&
																	formData[filter.title].includes(subItem)
																}
																onChange={(e) =>
																	handleCheckboxChange(
																		filter.title,
																		subItem,
																		e.target.checked
																	)
																}
															/>
														))}
													</Dropdown.Menu>
												</Dropdown>
											</Col>
										))}
										<Col className="d-flex justify-content-sm-center justify-content-xs-center">
											<Button
												variant="outline-success"
												type="submit"
												size="md"
												onClick={() => setFiltersDropdownIsOpen(false)}
											>
												Filter
											</Button>
										</Col>

										<Col className="d-flex justify-content-sm-center justify-content-xs-center">
											<Button
												variant="outline-danger"
												type="button"
												size="md"
												onClick={() => resetFilters()}
											>
												Reset
											</Button>
										</Col>
									</Row>
								</Form>
							</Dropdown.Menu>
						</Dropdown>
					</Col>
				</Row>

				<Row xs={1} md={3} lg={3} xl={4} className="w-100 m-0 bg-light">
					{articles.map((item, index) => (
						<Col key={index} id={index}>
							<Card className="my-3">
								<Card.Img
									role="button"
									variant="top"
									className={classes.card_img}
									src={
										item.default_image
											? item.default_image
											: item.first_image
											? item.first_image
											: item.second_image
											? item.second_image
											: item.third_image
											? item.third_image
											: "no_image_available.jpg"
									}
									onClick={() => navigateToArticlePage(item.article_id)}
								/>
								<Card.Body>
									<Card.Title
										role="button"
										onClick={() => navigateToArticlePage(item.article_id)}
									>
										{item.display_name}
									</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">
										{item.brand_name}
									</Card.Subtitle>
									<Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
										<Col className="px-0">
											<Card.Text>{item.price} lei</Card.Text>
										</Col>
										<Col className="d-flex justify-content-end px-0">
											<Button variant="light">
												<FontAwesomeIcon icon={faCartShopping} />
											</Button>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
}

export default Articles;
