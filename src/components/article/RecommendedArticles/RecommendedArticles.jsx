import { useState, useEffect } from "react";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";

import classes from "./RecommendedArticles.module.css";

function RecommendedArticles({ onLoadingStatusChange }) {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		getRecommendations();
	}, []);

	const getRecommendations = async () => {
		try {
			const response = await axiosClient.get("/recommendations");
			setRecommendations(response.data.data);
			return response.data;
		} catch (err) {
			console.log(err);
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
				}
			}
		} finally {
			setIsLoading(false);
			if (onLoadingStatusChange) {
				// Check if function is passed as prop
				onLoadingStatusChange(false); // Notify parent component that loading is done
			}
		}
	};

	const navigateToArticlePage = (id) => {
		const encodedId = btoa(id.toString());
		navigate(`/articlepage?id=${encodedId}`);
	};

	return (
		<>
			{recommendations.length > 0 && !isLoading && (
				<>
					<Row className="w-100 p-3 pt-5 bg-light">
						<h4>You might be interested in:</h4>
					</Row>
					<Row className="w-100 px-3 bg-light d-flex justify-content-center">
						<Carousel variant="dark" interval={null}>
							<Carousel.Item>
								<Row className="justify-content-around">
									{recommendations.slice(0, 4).map((item, index) => (
										<Col key={index} xs={12} md={3} lg={3} xl={3}>
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
														onClick={() =>
															navigateToArticlePage(item.article_id)
														}
													>
														{item.display_name}
													</Card.Title>
													<Card.Subtitle className="mb-2 text-muted">
														{item.brand_name}
													</Card.Subtitle>
													<Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
														<Col className="px-0">
															<Card.Text>{item.price} RON</Card.Text>
														</Col>
													</Row>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Carousel.Item>
							<Carousel.Item>
								<Row className="justify-content-around">
									{recommendations.slice(4, 8).map((item, index) => (
										<Col key={index} xs={12} md={3} lg={3} xl={3}>
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
														onClick={() =>
															navigateToArticlePage(item.article_id)
														}
													>
														{item.display_name}
													</Card.Title>
													<Card.Subtitle className="mb-2 text-muted">
														{item.brand_name}
													</Card.Subtitle>
													<Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
														<Col className="px-0">
															<Card.Text>{item.price} RON</Card.Text>
														</Col>
													</Row>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Carousel.Item>
							<Carousel.Item>
								<Row className="justify-content-start">
									{recommendations.slice(8, 10).map((item, index) => (
										<Col key={index} xs={12} md={3} lg={3} xl={3}>
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
														onClick={() =>
															navigateToArticlePage(item.article_id)
														}
													>
														{item.display_name}
													</Card.Title>
													<Card.Subtitle className="mb-2 text-muted">
														{item.brand_name}
													</Card.Subtitle>
													<Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
														<Col className="px-0">
															<Card.Text>{item.price} RON</Card.Text>
														</Col>
													</Row>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Carousel.Item>
						</Carousel>
					</Row>
				</>
			)}
		</>
	);
}

export default RecommendedArticles;
