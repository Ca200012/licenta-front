import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../../axios-client";

import Loading from "../Loading";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function OrderPage() {
	const query = useQuery();
	const order_id = query.get("id");

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getOrderData(order_id);
	}, []);

	const getOrderData = async (id) => {
		try {
			const response = await axiosClient.get("/orderdata/" + id);
			const data = response.data.data;
			setOrderDetails(data);
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

	return (
		<>
			<Row className="w-100 m-0">
				<Col className="py-3 text-center">
					<h3>Order details</h3>
				</Col>
			</Row>
			{isLoading && <Loading />}
			{!isLoading && <div>order details</div>}
		</>
	);
}

export default OrderPage;
