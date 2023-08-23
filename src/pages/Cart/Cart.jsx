import classes from "./Cart.module.css";
import axiosClient from "../../axios-client";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus, faTruck } from "@fortawesome/free-solid-svg-icons";

import AddToCart from "../../Cart/AddToCart";
import RemoveFromCart from "../../Cart/RemoveFromCart";

function Cart() {
	const [articles, setArticles] = useState([]);
	const [orderPrice, setOrderPrice] = useState(null);

	useEffect(() => {
		getArticlesFromCart();
	}, []);

	const refreshCart = () => {
		getArticlesFromCart();
	};

	const getArticlesFromCart = async () => {
		try {
			const response = await axiosClient.get("/cartarticles");
			const data = response.data.data;
			setArticles(data.articles);
			setOrderPrice(data.total_order_price);
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
					<h1 className="py-3 text-center">Your cart</h1>
				</Col>
			</Row>
			<Row className="w-100 mx-0 bg-light py-3 px-5">
				<Col xl={8} lg={8} md={8} sm={12} xs={12}>
					{articles.map((item, index) => (
						<Card className="mt-3">
							<Row className="w-100 m-0">
								<Col xl={2} lg={2} md={2} sm={4} xs={4} className="p-0">
									<img className="w-100 h-100" src={item.default_image} />
								</Col>
								<Col xl={10} lg={10} md={10} sm={8} xs={8} className="py-2">
									<Row className="d-flex">
										<Col
											xl={10}
											lg={10}
											md={10}
											sm={10}
											xs={10}
											className="fw-bold"
										>
											{item.display_name}
										</Col>
										<Col
											xl={2}
											lg={2}
											md={2}
											sm={2}
											xs={2}
											className="d-flex justify-content-end align-items-center"
										>
											<RemoveFromCart
												articleId={item.id}
												size={"md"}
												icon={faTrashCan}
												onRemove={refreshCart}
											/>
										</Col>
									</Row>
									{/* <Row>
										<Col>{item.price} lei</Col>
									</Row> */}
									<Row>
										<Col>
											Colour: {"  "}
											{item.colour}
										</Col>
									</Row>
									<Row>
										<Col>
											Size: {"  "}
											{item.selected_size}
										</Col>
									</Row>
									<Row>
										<Col>
											<>
												Quantity: {"  "}
												<RemoveFromCart
													articleId={item.id}
													size={"sm"}
													icon={faMinus}
													onRemove={refreshCart}
												/>
												{"  "}
												{item.quantity}
												{"  "}
												<AddToCart
													articleId={item.article_id}
													selectedSize={item.selected_size}
													size={"sm"}
													icon={faPlus}
													onAdd={refreshCart}
												/>
											</>
										</Col>
									</Row>
									<Row>
										<Col>
											Total price: {"  "}
											{item.total_price} lei
										</Col>
									</Row>
								</Col>
							</Row>
						</Card>
					))}
				</Col>

				<Col
					xl={4}
					lg={4}
					md={4}
					sm={12}
					xs={12}
					className="py-2 mt-3 border rounded-2"
				>
					<Row>
						<Col>Total article price:</Col>
						<Col className="text-end">{orderPrice} lei</Col>
					</Row>

					<Row>
						<Col>Delivery:</Col>
						<Col className="text-end">
							{orderPrice > 300 ? <p>FREE</p> : <p>15.99 lei</p>}
						</Col>
					</Row>

					<Row>
						<Col>
							<h6>Total order price:</h6>
						</Col>
						<Col className="text-end">
							{orderPrice > 300 ? (
								<h6>{orderPrice} lei</h6>
							) : (
								<p>{orderPrice + 15.99} lei</p>
							)}
						</Col>
					</Row>
					<Row>
						<Col>
							<Button
								variant="primary"
								size="xs"
								className={`${classes.grad} mx-0 w-100`}
							>
								Continue checkout
							</Button>
						</Col>
					</Row>
					<Row>
						<Col className="d-flex align-items-center">
							<FontAwesomeIcon icon={faTruck} className="my-3 me-2" />
							<p className="m-0">Free delivery on orders over 300 lei.</p>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Cart;
