import axiosClient from "../axios-client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";

function AddToCart(props) {
	const { articleId, selectedSize, size, icon, onAdd } = props;

	const [message, setMessage] = useState(null);

	const handleAddToCart = async () => {
		if (!articleId || !selectedSize) {
			console.error("Article ID or selected size is missing.");
			return;
		}

		const payload = {
			id: articleId,
			size: selectedSize,
		};

		try {
			const response = await axiosClient.post("/add", payload);
			const data = response.data.data;
			setMessage(data.message); // Assuming the message is stored under 'message' key in the response
			if (onAdd) onAdd();
		} catch (err) {
			console.error(err);
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					console.error(response.data.errors, "check errors");
				}
			}
		}
	};

	return (
		<Button
			variant="outline-dark"
			title="Add to cart"
			size={size}
			onClick={handleAddToCart}
		>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
}

export default AddToCart;
