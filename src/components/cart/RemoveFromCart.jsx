import axiosClient from "../../axios-client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";

function RemoveFromCart(props) {
  const { articleId, selectedSize, size, icon, onRemove, onNotRemove } = props;
  const { token } = useStateContext();

  const handleRemoveFromCart = async () => {
    if (token) {
      await dbRemoveFromCart();
    } else {
      await lsRemoveFromCart();
    }
  };

  const dbRemoveFromCart = async () => {
    if (!articleId || !selectedSize) {
      if (onNotRemove) onNotRemove("Could not remove item from cart!");
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

      if (onRemove) onRemove();
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          if (onNotRemove) onNotRemove(response.data.errors.message[0]);
        }
      }
    }
  };

  const lsRemoveFromCart = () => {
    const existingArticles = localStorage.getItem("articles");
    let articlesArray = [];

    if (existingArticles) {
      articlesArray = JSON.parse(existingArticles);
    }

    const existingArticleIndex = articlesArray.findIndex(
      (article) => article.id === articleId && article.size === selectedSize
    );

    if (existingArticleIndex > -1) {
      if (
        icon == faTrashCan ||
        articlesArray[existingArticleIndex].quantity <= 1
      ) {
        articlesArray.splice(existingArticleIndex, 1);
      } else {
        articlesArray[existingArticleIndex].quantity -= 1;
      }

      localStorage.setItem("articles", JSON.stringify(articlesArray));
      if (onRemove) onRemove();
    } else {
      if (onNotRemove) onNotRemove("Could not remove item from cart!");
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
