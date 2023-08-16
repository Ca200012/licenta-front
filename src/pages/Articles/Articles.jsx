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
} from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Articles() {
	const location = useLocation();
	const query = useQuery();
	const gender = query.get("gender");
	const category = query.get("category");
	const subCategory = query.get("subcategory");
	const articleType = query.get("articletype");

	const [articles, setArticles] = useState([]);
	const [colours, setColours] = useState([]);
	const [brands, setBrands] = useState([]);
	const [seasons, setSeasons] = useState([]);
	const [usages, setUsages] = useState([]);

	useEffect(() => {
		getArticles();
		getColours();
		getBrands();
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

	const getArticles = async () => {
		console.log("called");
		// setAreArticlesLoading(true);

		try {
			let url = "/article";
			url += gender ? "/" + gender : "";
			url += category ? "/" + category : "";
			url += subCategory ? "/" + subCategory : "";
			url += articleType ? "/" + articleType : "";
			const currentQuery = new URLSearchParams(window.location.search);
			const sortType = currentQuery.get("sort");
			//console.log(sortType);
			if (sortType) {
				url += `?sort=${sortType}`;
			}

			const response = await axiosClient.get(url);
			const data = response.data.data;
			console.log("Articole din baza de date: ", data);
			// setAreArticlesLoading(false);
			setArticles(data);
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

	const getColours = async () => {
		try {
			const response = await axiosClient.get("/colours");
			const data = response.data.data;
			console.log("Data from API: ", data);
			setColours(data);
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

	const getBrands = async () => {
		try {
			const response = await axiosClient.get("/brands");
			const data = response.data.data;
			console.log("Data from API: ", data);
			setBrands(data);
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

	return (
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
				<Col className="" xl={12} lg={12} md={12} sm={12} xs={12}>
					<DropdownButton title="Sort by" variant="light">
						<Dropdown.Item value="asc" onClick={handleSortChange}>
							Lowest to highest price
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item value="desc" onClick={handleSortChange}>
							Highest to lowest price
						</Dropdown.Item>
					</DropdownButton>
					<DropdownButton title="Colour" variant="light">
						{colours.map((item, index) => (
							<Dropdown.Item key={index}>{item.colour}</Dropdown.Item>
						))}
					</DropdownButton>
					<DropdownButton title="Brand" variant="light">
						{brands.map((item, index) => (
							<Dropdown.Item key={index}>{item.brand_name}</Dropdown.Item>
						))}
					</DropdownButton>
				</Col>
			</Row>

			<Row xs={1} md={3} lg={3} xl={4} className="w-100 m-0 bg-light">
				{articles.map((item, index) => (
					<Col key={index} id={index}>
						<Card className="my-3">
							<Card.Img
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
							/>
							<Card.Body>
								<Card.Title>{item.display_name}</Card.Title>
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
	);
}

export default Articles;
