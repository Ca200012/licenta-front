import { Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axiosClient from "../../axios-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faEnvelope,
  faPhone,
  faCalendarDay,
  faHourglassStart,
  faTruck,
  faMoneyBill,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

import Loading from "../Loading";
import CustomAlert from "../../components/CustomAlert";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function OrderPage() {
  const query = useQuery();
  const order_id = query.get("id");
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);

  const [alert, setAlert] = useState({
    variant: "primary",
    message: null,
    visible: false,
  });

  useEffect(() => {
    // Push the current state and URL into the history stack.
    window.history.pushState(null, document.title, window.location.href);

    const handleBackEvent = (event) => {
      // Prevent the default back action
      event.preventDefault();
      // Push it again to prevent going back in history
      window.history.pushState(null, document.title, window.location.href);
    };

    // Listen to popstate event, triggered by pressing the back button
    window.addEventListener("popstate", handleBackEvent);

    return () => {
      // Cleanup, remove the event listener when the component unmounts
      window.removeEventListener("popstate", handleBackEvent);
    };
  }, []);

  useEffect(() => {
    getOrderData(order_id);
  }, [order_id]);

  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [alert.visible]);

  const getOrderData = async (id) => {
    try {
      const response = await axiosClient.get("/orderdata/" + id);
      const data = response.data;
      setOrderDetails(data);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const response = await axiosClient.get("/cancel/" + id);
      const data = response.data;
      setAlert({
        variant: "success",
        message: "You order has been successfully cancelled!",
        visible: true,
      });
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          const error = response.data.errors.message[0];
          setAlert({
            variant: "danger",
            message: error,
            visible: true,
          });
        }
      }
    }
  };

  const handleOrderCancel = async (id) => {
    setIsLoading(true);
    const cancelResponse = await cancelOrder(id);
    if (cancelResponse) {
      const updatedOrderDetails = await getOrderData(id);
      if (updatedOrderDetails) {
        setIsLoading(false);
      }
    }
  };

  const navigateToArticlePage = (id) => {
    const encodedId = btoa(id.toString());
    navigate(`/articlepage?id=${encodedId}`);
  };

  return (
    <>
      {alert.visible && (
        <CustomAlert
          variant={alert.variant}
          message={alert.message}
          onClose={() =>
            setAlert((prevAlert) => ({ ...prevAlert, visible: false }))
          }
        />
      )}
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Row className="w-100 m-0">
            <Col className="py-3 text-center">
              <h3>Order {orderDetails.order_id} details</h3>
            </Col>
          </Row>
          <Row className="w-100 m-0">
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FontAwesomeIcon icon={faHourglassStart} className="me-2" />
                  {`Status: ${orderDetails.status}`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faCalendarDay} className="me-2" />
                  {`Date: ${orderDetails.order_date}`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
                  {`Price: ${orderDetails.order_price} RON`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" />
                  {`Payment method: Cash on delivery`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faIdCard} className="me-2" />
                  {`Your name: ${orderDetails.user_first_name} ${orderDetails.user_last_name}`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  {`Your email: ${orderDetails.user_email}`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  {`Your phone number: ${orderDetails.user_phone_number}`}
                </ListGroup.Item>

                <ListGroup.Item>
                  <FontAwesomeIcon icon={faTruck} className="me-2" />
                  {`Delivery address: ${orderDetails.delivery_address}`}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="w-100 m-0">
            <Col className="py-2">
              <h5 className="ms-5">Order items</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              {orderDetails.articles?.map((item, index) => (
                <Card key={index} className="border rounded-2 mb-3 mx-3">
                  <Row className="w-100 m-0">
                    <Col xl={2} lg={2} md={2} sm={4} xs={4} className="p-0">
                      <img
                        className="w-100 h-100 rounded"
                        role="button"
                        src={item.default_image}
                        onClick={() => navigateToArticlePage(item.article_id)}
                      />
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
                            <span className="mx-1">{item.quantity}</span>
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
            </Col>
          </Row>
          {orderDetails.status == "Pending" && (
            <Row>
              <Col>
                <Button
                  variant="outline-danger"
                  className="mx-3 mb-3"
                  onClick={() => {
                    handleOrderCancel(orderDetails.order_id);
                  }}
                >
                  Cancel order
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
}

export default OrderPage;
