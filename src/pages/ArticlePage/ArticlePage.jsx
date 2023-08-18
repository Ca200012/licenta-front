import { useLocation, useNavigate } from "react-router-dom";
import classes from "./ArticlePage.module.css";
import axiosClient from "../../axios-client";

import {
	Container,
	Row,
	Col,
	Carousel,
	Button,
	Accordion,
} from "react-bootstrap";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ArticlePage() {
	const query = useQuery();
	//const location = useLocation();
	const encodedId = query.get("id");
	const decodedId = atob(encodedId);

	const [articleData, setArticleData] = useState([]);

	useEffect(() => {
		getArticleData(decodedId);
	}, []);

	const isDisabledS = !(
		articleData.size_0 === "S" ||
		articleData.size_1 === "S" ||
		articleData.size_2 === "S" ||
		articleData.size_3 === "S" ||
		articleData.size_4 === "S"
	);

	const isDisabledM = !(
		articleData.size_0 === "M" ||
		articleData.size_1 === "M" ||
		articleData.size_2 === "M" ||
		articleData.size_3 === "M" ||
		articleData.size_4 === "M"
	);

	const isDisabledL = !(
		articleData.size_0 === "L" ||
		articleData.size_1 === "L" ||
		articleData.size_2 === "L" ||
		articleData.size_3 === "L" ||
		articleData.size_4 === "L"
	);

	const isDisabledXL = !(
		articleData.size_0 === "XL" ||
		articleData.size_1 === "XL" ||
		articleData.size_2 === "XL" ||
		articleData.size_3 === "XL" ||
		articleData.size_4 === "XL"
	);

	const isDisabledXXL = !(
		articleData.size_0 === "XXL" ||
		articleData.size_1 === "XXL" ||
		articleData.size_2 === "XXL" ||
		articleData.size_3 === "XXL" ||
		articleData.size_4 === "XXL"
	);

	const getArticleData = async (id) => {
		try {
			const response = await axiosClient.get("/articledata/" + id);
			const data = response.data.data;
			setArticleData(data[0]);
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

	useEffect(() => {
		console.log(articleData);
	}, [articleData]);

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
					<h1 className="py-3 text-center">{articleData.display_name}</h1>
				</Col>
			</Row>
			<Row className="w-100 mx-0 bg-light py-3 px-5 ">
				<Col xl={6} lg={6} md={6} sm={12} xs={12} className="py-3">
					<Carousel variant="dark" className="">
						<Carousel.Item>
							<img className="d-block w-100" src={articleData.default_image} />
						</Carousel.Item>
						{articleData.first_image && (
							<Carousel.Item>
								<img className="d-block w-100" src={articleData.first_image} />
							</Carousel.Item>
						)}
						{/* {articleData.second_image && (
							<Carousel.Item>
								<img className="d-block w-100" src={articleData.second_image} />
							</Carousel.Item>
						)} */}
						{articleData.third_image && (
							<Carousel.Item>
								<img className="d-block w-100" src={articleData.third_image} />
							</Carousel.Item>
						)}
					</Carousel>
				</Col>
				<Col xl={6} lg={6} md={6} sm={12} xs={12} className="py-4">
					<h4 className="">{articleData.display_name}</h4>
					<h6 className="text-muted">{articleData.brand_name}</h6>
					<h6 className="text-muted">{articleData.colour}</h6>
					<h5 className="py-4">{articleData.price} lei</h5>
					<h6>Sizes</h6>
					<Button
						variant="outline-dark"
						className="me-2"
						disabled={isDisabledS}
						title="Add size S to cart"
					>
						S
					</Button>
					<Button
						variant="outline-dark"
						className="me-2"
						disabled={isDisabledM}
						title="Add size M to cart"
					>
						M
					</Button>
					<Button
						variant="outline-dark"
						className="me-2"
						disabled={isDisabledL}
						title="Add size L to cart"
					>
						L
					</Button>
					<Button
						variant="outline-dark"
						className="me-2"
						disabled={isDisabledXL}
						title="Add size XL to cart"
					>
						XL
					</Button>
					<Button
						variant="outline-dark"
						className="me-2"
						disabled={isDisabledXXL}
						title="Add size XXL to cart"
					>
						XXL
					</Button>
					<Button variant="outline-dark" title="Add to cart">
						<FontAwesomeIcon icon={faCartShopping} />
					</Button>

					<Accordion defaultActiveKey="0" className="py-5">
						<Accordion.Item eventKey="1">
							<Accordion.Header>Description</Accordion.Header>
							<Accordion.Body>
								<h6
									dangerouslySetInnerHTML={{ __html: articleData.description }}
								></h6>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>Shipping and payment</Accordion.Header>
							<Accordion.Body>
								<h6
									dangerouslySetInnerHTML={{ __html: articleData.description }}
								></h6>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3">
							<Accordion.Header>Size guide</Accordion.Header>
							<Accordion.Body>
								<h6
									dangerouslySetInnerHTML={{ __html: articleData.description }}
								></h6>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
}

export default ArticlePage;
