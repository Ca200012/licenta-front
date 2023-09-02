import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Card, Row, Col, Button, Form, Dropdown } from "react-bootstrap";

import classes from "./Checkout.module.css";
import { useState, useEffect } from "react";

import Loading from "../Loading";
import axiosClient from "../../axios-client";
import CustomAlert from "../CustomAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import {
  faTruck,
  faPhone,
  faEnvelope,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const {
    orderConfirmed,
    checkoutStarted,
    selectedAddress,
    setSelectedAddress,
  } = useStateContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressName, setSelectedAddressName] = useState(null);

  const [alert, setAlert] = useState({
    variant: "primary",
    message: null,
    visible: false,
  });

  if (!checkoutStarted) {
    navigate("/cart");
    return null;
  }

  useEffect(() => {
    document.title = "Checkout";
    getUserData();
    getUserAddresses();
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

  const getUserData = async () => {
    try {
      const response = await axiosClient.get("/user");
      const data = response.data.data;
      setUserData(data);
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

  const getUserAddresses = async () => {
    try {
      const response = await axiosClient.get("/address");
      const data = response.data.data;
      setUserAddresses(data);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
        }
      }
    }
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
      {!isLoading && !orderConfirmed && (
        <>
          <Card className="border rounded-2 mb-2">
            <Card.Body>
              <Card.Title>Personal data</Card.Title>
              <Row className="w-100 m-0">
                <Col xl={10} lg={10} md={10} sm={8} xs={8} className="py-2">
                  <Row>
                    <Col className="p-0">
                      <FontAwesomeIcon icon={faIdCard} className="me-2" />
                      Name: {"  "}
                      {userData.first_name} {"  "} {userData.last_name}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Email: {"  "} {userData.email}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-0">
                      <FontAwesomeIcon icon={faPhone} className="me-2" />
                      Phone number: {"  "} {userData.phone_number}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button
                variant="primary"
                size="xs"
                className={`${classes.grad} mx-0`}
                onClick={() => {
                  navigate("/profile/personal-data");
                }}
              >
                Edit data
              </Button>
            </Card.Body>
          </Card>
          <Card className="border rounded-2 mb-2">
            <Card.Body>
              <Card.Title>Address</Card.Title>
              <Row className="w-100 m-0">
                <Col xl={10} lg={10} md={10} sm={8} xs={8} className="p-0 mt-2">
                  {userAddresses && userAddresses?.length > 0 ? (
                    <Dropdown
                      show={dropdownOpen}
                      className="higherZIndex"
                      onToggle={(isOpen) => setDropdownOpen(isOpen)}
                    >
                      <Dropdown.Toggle
                        variant="outline-dark"
                        id="address-dropdown"
                      >
                        {selectedAddressName || "Please select an address"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {userAddresses?.map((item, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              setSelectedAddress(item.address_id);
                              setSelectedAddressName(item.value);
                            }}
                          >
                            <Form.Check
                              type="radio"
                              name="address"
                              value={item.value}
                              label={item.value}
                              checked={selectedAddressName === item.value}
                              onChange={() => {}}
                              className=" d-flex align-items-center label-parent"
                            />
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      <p>There are no addresses available.</p>
                    </>
                  )}
                  <Button
                    variant="primary"
                    size="xs"
                    className={`${classes.grad} mx-0 mt-3`}
                    onClick={() => {
                      navigate("/profile/personal-data");
                    }}
                  >
                    Add an address
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="border rounded-2 mb-2">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Row className="w-100 m-0">
                <Col xl={10} lg={10} md={10} sm={8} xs={8} className="py-2">
                  <Row>
                    <Col className="p-0">
                      <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
                      Cash on delivery
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="border rounded-2 mb-2">
            <Card.Body>
              <Card.Title>Delivery details</Card.Title>
              <Row className="w-100 m-0">
                <Col xl={10} lg={10} md={10} sm={8} xs={8} className="py-2">
                  <Row>
                    <Col className="p-0">
                      <FontAwesomeIcon icon={faIdCard} className="me-2" />
                      {userData.first_name} {"  "} {userData.last_name}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0">
                      <FontAwesomeIcon icon={faPhone} className="me-2" />
                      {userData.phone_number}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0">
                      {selectedAddress && (
                        <>
                          <FontAwesomeIcon icon={faTruck} className="me-2" />
                          {selectedAddressName}
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default Checkout;
