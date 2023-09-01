import axiosClient from "../../axios-client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function RemoveFromCart(props) {
	const { articleId, selectedSize, size, icon, onRemove } = props;

	const [message, setMessage] = useState(null);

	const handleRemoveFromCart = async () => {
		if (!articleId || !selectedSize) {
			console.error("Article ID or selected size is missing.");
			return;
		}

		const payload = {
			id: articleId,
			size: selectedSize,
			delete_all: icon == faTrashCan ? true : false,
		};

		try {
			const response = await axiosClient.post("/remove", payload);
			const data = response.data.data;
			setMessage(data.message); // Assuming the message is stored under 'message' key in the response
			if (onRemove) onRemove();
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
			title="Remove from cart"
			size={size}
			onClick={handleRemoveFromCart}
		>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
}

export default RemoveFromCart;
