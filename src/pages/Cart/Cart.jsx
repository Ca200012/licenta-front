import { useEffect, useState } from "react";
import { useNavigate, useMatch, Outlet } from "react-router-dom";
import axiosClient from "../../axios-client";

import AddToCart from "../../components/cart/AddToCart";
import RemoveFromCart from "../../components/cart/RemoveFromCart";
import Loading from "../../components/Loading";

import { Container, Row, Card, Col, Button } from "react-bootstrap";
import classes from "./Cart.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus, faTruck } from "@fortawesome/free-solid-svg-icons";

import { useStateContext } from "../../contexts/ContextProvider";

function Cart() {
  const match = useMatch("/cart");

  const navigate = useNavigate();
  const {
    setCheckoutStarted,
    orderConfirmed,
    setOrderConfirmed,
    selectedAddress,
  } = useStateContext();

  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderPrice, setOrderPrice] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    document.title = "Cart";
    getArticlesFromCart();
  }, []);

  const refreshCart = () => {
    getArticlesFromCart();
  };

  const markStartedCheckout = async () => {
    setCheckoutStarted(true);
  };

  const getArticlesFromCart = async () => {
    try {
      const response = await axiosClient.get("/cartarticles");
      const data = response.data.data;
      setArticles(data.articles);
      setOrderPrice(data.total_cart_price);
      setCheckoutStarted(data.is_checkout_started ? true : false);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          console.log(response.data.errors, "check errors");
        }
      }
    } finally {
      setIsLoaded(true);
      //console.log(isLoaded, articles);
    }
  };

  const handleOrderConfirmation = async () => {
    console.log("Order confirmed");

    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const orderId = parseInt(`1001${randomNumber}`);
    setOrderId(orderId);
    setOrderConfirmed(true);

    const payload = {
      address_id: selectedAddress,
      order_id: orderId,
    };

    try {
      const response = await axiosClient.post("/addorder", payload);
      const data = response.data.data;
      setMessage(data);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          console.log(response.data.errors, "check errors");
        }
      }
    } finally {
      setIsLoaded(true);
    }

    navigate("/cart");
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
      <Row className="w-100 mx-0 bg-light py-3 px-3">
        {!isLoaded && <Loading />}

        {articles?.length > 0 && isLoaded && !orderConfirmed && (
          <>
            <Col
              xl={8}
              lg={8}
              md={12}
              sm={12}
              xs={12}
              className="mt-3 h-fit-content"
              style={{ order: window.innerWidth <= 992 ? 2 : 1 }}
            >
              {match ? (
                <>
                  {articles?.map((item, index) => (
                    <Card key={index} className="border rounded-2 mb-3">
                      <Row className="w-100 m-0">
                        <Col xl={2} lg={2} md={2} sm={4} xs={4} className="p-0">
                          <img
                            className="w-100 h-100 rounded"
                            src={item.default_image}
                          />
                        </Col>
                        <Col
                          xl={10}
                          lg={10}
                          md={10}
                          sm={8}
                          xs={8}
                          className="py-2"
                        >
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
                                articleId={item.article_id}
                                selectedSize={item.selected_size}
                                size={"md"}
                                icon={faTrashCan}
                                onRemove={refreshCart}
                              />
                            </Col>
                          </Row>

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
                                  articleId={item.article_id}
                                  selectedSize={item.selected_size}
                                  size={"sm"}
                                  icon={faMinus}
                                  onRemove={refreshCart}
                                />
                                {"  "}
                                <span className="mx-1">{item.quantity}</span>
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
                              {item.price} RON
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </>
              ) : (
                <Outlet />
              )}
            </Col>
            {!orderConfirmed && (
              <Col
                xl={4}
                lg={4}
                md={12}
                sm={12}
                xs={12}
                className="mt-3 h-fit-content"
                style={{ order: window.innerWidth <= 992 ? 1 : 2 }}
              >
                <div className="border rounded-2 p-3 bg-white">
                  <Row>
                    <Col>Total article price:</Col>
                    <Col className="text-end">{orderPrice} RON</Col>
                  </Row>

                  <Row>
                    <Col>Delivery:</Col>
                    <Col className="text-end">
                      {orderPrice > 300 ? <p>FREE</p> : <p>15.99 RON</p>}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <h6>Total order price:</h6>
                    </Col>
                    <Col className="text-end">
                      {orderPrice > 300 ? (
                        <h6>{orderPrice} RON</h6>
                      ) : (
                        <p>{orderPrice + 15.99} RON</p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        size="xs"
                        className={`${classes.grad} mx-0 w-100`}
                        onClick={() => {
                          if (match) {
                            markStartedCheckout();
                            navigate("/cart/checkout");
                          } else if (!match && selectedAddress != null) {
                            handleOrderConfirmation();
                          }
                        }}
                        disabled={articles?.length === 0}
                      >
                        {match ? "Continue checkout" : "Send order"}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faTruck} className="my-3 me-2" />
                      <p className="m-0">
                        Free delivery on orders over 300 RON.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
          </>
        )}

        {!articles && isLoaded && (
          <Col className="d-flex justify-content-center">
            <img
              alt="no_items"
              src="/no_items_in_cart_2.jpg"
              fluid="true"
              width={500}
              className="border rounded mw-100"
            />
          </Col>
        )}
        {orderConfirmed && isLoaded && (
          <Col className="d-flex justify-content-center my-3">
            <Row>
              <Col>
                <h2>Thank you for your order!</h2>
                <h4 className="text-center my-3">
                  Your order number is {orderId}
                </h4>
                <Button
                  onClick={() => {
                    navigate("/profile/orders");
                  }}
                  className={`${classes.grad} mx-0 w-100`}
                >
                  Go to your orders
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Cart;
