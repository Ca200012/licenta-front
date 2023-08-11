import classes from "./Articles.module.css";

import axiosClient from "../../axios-client";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

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

	useEffect(() => {
		getArticles();
	}, [location]);

	const getArticles = async () => {
		console.log("called");
		// setAreArticlesLoading(true);

		try {
			let url = "/article";
			url += gender ? "/" + gender : "";
			url += category ? "/" + category : "";
			url += subCategory ? "/" + subCategory : "";
			url += articleType ? "/" + articleType : "";

			const response = await axiosClient.get(url);
			const data = response.data.data;
			console.log("Data from API: ", data);
			// setAreArticlesLoading(false);
			setArticles(data);
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

	return (
		<Container
			className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 pt-5 bg-light`}
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

			<Row xs={1} md={3} lg={3} xl={4} className="w-100 m-0">
				{Array.from({ length: 6 }).map((_, idx) => (
					<Col key={idx}>
						<Card className="my-3">
							<Card.Img variant="top" src="logo_licenta2.png" />
							<Card.Body>
								<Row className="w-100 mx-0 px-0 d-flex justify-content-between">
									<Col className="d-flex align-content-center justify-content-between px-0">
										<Card.Title>Article name</Card.Title>
										<Button variant="light">
											<FontAwesomeIcon icon={faCartShopping} />
										</Button>
									</Col>
								</Row>
								<Card.Text>Article price</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Articles;
