import { Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useMatch, useNavigate, Link } from "react-router-dom";

import Loading from "../Loading";

function Orders() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		getOrders();
	}, []);

	const getOrders = async () => {
		try {
			const response = await axiosClient.get("/orders");
			const data = response.data.data;
			setOrders(data);
			return data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	const navigateToOrderPage = (id) => {
		navigate(`/orderpage?id=${id}`);
	};

	useEffect(() => {
		console.log(orders);
	}, [orders]);

	return (
		<>
			<Row className="w-100 m-0">
				<Col className="py-3 text-center">
					<h3>Your orders</h3>
				</Col>
			</Row>
			{isLoading && <Loading />}
			{!isLoading && orders && (
				<Row className="w-100 m-0">
					<Col xl={12} lg={12} md={12} sm={12} xs={12} className="mt-3">
						{orders?.map((item, index) => {
							return (
								<Link
									key={index}
									to={`/profile/orderpage?id=${item.order_id}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Card
										key={index}
										className="border rounded-2 mb-3"
										onClick={() => {
											navigateToOrderPage(item.order_id);
										}}
									>
										<Row className="w-100 m-0">
											<Col className="py-1">
												<Row className="d-flex flex-row">
													<Col
														xl={6}
														lg={6}
														md={12}
														sm={12}
														xs={12}
														className="fw-bold"
													>
														Order{"  "}
														{item.order_id}
													</Col>
													<Col
														xl={6}
														lg={6}
														md={12}
														sm={12}
														xs={12}
														className="d-flex justify-content-end"
													>
														{item.order_date}
													</Col>
												</Row>
											</Col>
										</Row>
										<Row className="w-100 m-0">
											<Col className="pb-1">
												<Row className="d-flex">
													<Col>
														Status:{"  "}
														{item.status}
													</Col>
													<Col className="d-flex justify-content-end align-items-center">
														Price: {"  "}
														{item.price} RON
													</Col>
												</Row>
											</Col>
										</Row>
										<Row>
											<Col>
												<Row>
													{item.article_images?.map((img, imgIndex) => (
														<Col xl={2} lg={2} md={2} sm={2} xs={2}>
															<img
																key={imgIndex}
																className="w-100 h-100 rounded"
																src={img}
																alt={`Article ${imgIndex}`}
															/>
														</Col>
													))}
												</Row>
											</Col>
										</Row>
									</Card>
								</Link>
							);
						})}
					</Col>
				</Row>
			)}
		</>
	);
}

export default Orders;
