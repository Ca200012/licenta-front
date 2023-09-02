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
import CustomAlert from "../../components/CustomAlert";

function Cart() {
  const match = useMatch("/cart");
  const navigate = useNavigate();

  const { token } = useStateContext();

  const {
    setCheckoutStarted,
    orderConfirmed,
    setOrderConfirmed,
    selectedAddress,
  } = useStateContext();

  const [alert, setAlert] = useState({
    variant: "primary",
    message: null,
    visible: false,
  });

  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderPrice, setOrderPrice] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    document.title = "Cart";
    getArticlesFromCart();
  }, []);

  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [alert.visible]);

  const handleAdd = () => {
    getArticlesFromCart();
    setAlert({
      variant: "success",
      message: "Item successfully added to cart!",
      visible: true,
    });
  };

  const handleRemove = () => {
    getArticlesFromCart();
    setAlert({
      variant: "success",
      message: "Item successfully removed from cart!",
      visible: true,
    });
  };

  const handleNotAdd = (err) => {
    setAlert({
      variant: "danger",
      message: err,
      visible: true,
    });
  };

  const handleNotRemove = (err) => {
    setAlert({
      variant: "danger",
      message: err,
      visible: true,
    });
  };

  const displayAddressError = () => {
    setAlert({
      variant: "danger",
      message: "Please select an address first!",
      visible: true,
    });
  };

  const markStartedCheckout = async () => {
    setCheckoutStarted(true);
  };

  const getArticlesFromCart = async () => {
    if (token) {
      await getArticlesFromDb();
    } else {
      await getArticlesFromLs();
    }
  };

  const getArticlesFromDb = async () => {
    try {
      const response = await axiosClient.post("/cartarticles", {});
      const data = await response.data.data;
      setArticles(data.articles);
      setOrderPrice(data.total_cart_price);
      setCheckoutStarted(data.is_checkout_started ? true : false);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
        }
      }
    } finally {
      setIsLoaded(true);
    }
  };

  const getArticlesFromLs = async () => {
    const existingArticles = localStorage.getItem("articles");

    let articlesArray = [];

    if (existingArticles) {
      articlesArray = JSON.parse(existingArticles);
    } else {
      setArticles([]);
      setIsLoaded(true);
      return;
    }

    try {
      const response = await axiosClient.post("/cartarticles", {
        articles: articlesArray,
      });
      const data = await response.data.data;

      setArticles(data.articles);
      setCheckoutStarted(data.is_checkout_started ? true : false);

      if (data.total_cart_price == 0) {
        let total_price = 0;
        data.articles.forEach((item) => {
          total_price += item.price;
        });
        setOrderPrice(total_price);
      }
      return;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
        }
      }
    } finally {
      setIsLoaded(true);
    }
  };

  const handleOrderConfirmation = async () => {
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
      setOrderConfirmed(true);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          setOrderConfirmed(false);
        }
      }
    } finally {
      setIsLoaded(true);
    }
  };

  return (
    <Container
      className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
    >
      {alert.visible && (
        <CustomAlert
          variant={alert.variant}
          message={alert.message}
          onClose={() =>
            setAlert((prevAlert) => ({ ...prevAlert, visible: false }))
          }
        />
      )}
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
                                articleId={String(item.article_id)}
                                selectedSize={item.selected_size}
                                size={"md"}
                                icon={faTrashCan}
                                onRemove={handleRemove}
                                onNotRemove={handleNotRemove}
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
                                  articleId={String(item.article_id)}
                                  selectedSize={item.selected_size}
                                  size={"sm"}
                                  icon={faMinus}
                                  onRemove={handleRemove}
                                  onNotRemove={handleNotRemove}
                                />
                                {"  "}
                                <span className="mx-1">{item.quantity}</span>
                                {"  "}
                                <AddToCart
                                  articleId={String(item.article_id)}
                                  selectedSize={item.selected_size}
                                  size={"sm"}
                                  icon={faPlus}
                                  onAdd={handleAdd}
                                  onNotAdd={handleNotAdd}
                                />
                              </>
                            </Col>

                            {item.stock_message !== "" && (
                              <Col
                                xs={12}
                                className="text-justify text-danger fw-bold my-3"
                              >
                                {item.stock_message}
                              </Col>
                            )}
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
                      {orderPrice > 300 ? "FREE" : "15.99 RON"}
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
                        <div>{orderPrice + 15.99} RON</div>
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
                          if (token) {
                            if (match) {
                              markStartedCheckout();
                              navigate("/cart/checkout");
                            } else {
                              if (selectedAddress == null) {
                                displayAddressError();
                              } else {
                                handleOrderConfirmation();
                              }
                            }
                          } else {
                            navigate("/register");
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
                      <div className="m-0">
                        Free delivery on orders over 300 RON.
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
          </>
        )}

        {!articles.length && isLoaded && (
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
