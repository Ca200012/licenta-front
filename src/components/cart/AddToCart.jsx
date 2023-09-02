import axiosClient from "../../axios-client";
import { Button } from "react-bootstrap";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";

function AddToCart(props) {
  const { articleId, selectedSize, size, icon, onAdd, onNotAdd } = props;

  const { token } = useStateContext();

  const handleAddToCart = async () => {
    if (token) {
      dbAddToCart();
    } else {
      lsAddToCart();
    }
  };

  const dbAddToCart = async () => {
    if (!articleId || !selectedSize) {
      if (onNotAdd) onNotAdd("Please select a size first!");
      return;
    }

    const payload = {
      id: articleId,
      size: selectedSize,
    };

    try {
      const response = await axiosClient.post("/add", payload);
      const data = response.data.data;
      if (onAdd) onAdd();
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          if (onNotAdd) onNotAdd(response.data.errors.message[0]);
        }
      }
    }
  };

  const checkIfCanPurchase = async (id, size, quantity) => {
    const payload = {
      id: id,
      size: size,
      quantity: quantity,
    };

    try {
      const response = await axiosClient.post("/can-purchase", payload);
      const data = response.data.data;
      return true;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          return false;
        }
      }
    }
  };

  const lsAddToCart = async () => {
    const existingArticles = localStorage.getItem("articles");
    let articlesArray = [];

    if (existingArticles) {
      articlesArray = JSON.parse(existingArticles);
    }

    const existingArticleIndex = articlesArray.findIndex(
      (article) => article.id === articleId && article.size === selectedSize
    );

    if (existingArticleIndex > -1) {
      let answer = await checkIfCanPurchase(
        articlesArray[existingArticleIndex].id,
        articlesArray[existingArticleIndex].size,
        articlesArray[existingArticleIndex].quantity
      );

      if (answer) {
        articlesArray[existingArticleIndex].quantity += 1;
      } else {
        if (onNotAdd) onNotAdd("Can't purchase more articles with this size!");
        return;
      }
    } else {
      const newArticle = {
        id: articleId,
        size: selectedSize,
        quantity: 1,
      };
      articlesArray.push(newArticle);
    }

    localStorage.setItem("articles", JSON.stringify(articlesArray));
    if (onAdd) onAdd();
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
