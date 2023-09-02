import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useForm } from "react-hook-form";

import { Row, Col, Form, Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Placeholder from "react-bootstrap/Placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faIdCard,
  faEnvelope,
  faPhone,
  faCalendarDay,
  faHouse,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../../pages/Login/Login.module.css";
import main_classes from "./PersonalData.module.css";
import Loading from "../Loading";
import CustomAlert from "../CustomAlert";

function PersonalData() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [showDataForm, setShowDataForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [counties, setCounties] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [city, setCity] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [alert, setAlert] = useState({
    variant: "primary",
    message: null,
    visible: false,
  });

  let searchTimeout = null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData();
    processArticlesIfAvailableLs();
  }, []);

  const processArticlesIfAvailableLs = async () => {
    const existingArticles = localStorage.getItem("articles");
    let articlesArray = [];

    if (existingArticles) {
      articlesArray = JSON.parse(existingArticles);
    }

    if (articlesArray.length) {
      try {
        const response = await axiosClient.post("/store-articles-from-ls", {
          articles: articlesArray,
        });
        const data = response.data.data;
        localStorage.removeItem("articles");
        console.log(data);
        return;
      } catch (err) {
        const response = err.response;
        if (response && response.status !== 200) {
          if (response.data.errors) {
            console.log(response.data.errors);
          }
        }
      }
    }
  };

  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [alert.visible]);

  const getData = async () => {
    setIsLoading(true);

    try {
      const [userData, addresses] = await Promise.all([
        getUserData(),
        getUserAddresses(),
      ]);

      setUserData(userData);
      setAddresses(addresses);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axiosClient.get("/user");
      const data = response.data.data;
      if (data.date_of_birth) {
        data.date_of_birth = await formatDate(data.date_of_birth);
      }
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        const error = response.data.message;
        setAlert({
          variant: "danger",
          message: error,
          visible: true,
        });
      }
    }
  };

  const getUserAddresses = async () => {
    try {
      const response = await axiosClient.get("/address");
      const data = response.data.data;
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        const error = response.data.message;
        setAlert({
          variant: "danger",
          message: error,
          visible: true,
        });
      }
    }
  };

  const resetDataForm = () => {
    setShowDataForm(!showDataForm);
    getUserData();
  };

  const resetAddressForm = () => {
    setShowAddressForm(!showAddressForm);
    getUserAddresses();
  };

  useEffect(() => {
    const loadCountiesData = async () => {
      const result = await getCounties();
      setCounties(result);
    };
    loadCountiesData();
  }, []);

  //luam judetele cu get
  const getCounties = async () => {
    try {
      const response = await axiosClient.get("/counties");
      const countiesData = response.data.data;
      // setCounties(countiesData);
      return countiesData;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        const error = response.data.message;
        setAlert({
          variant: "danger",
          message: error,
          visible: true,
        });
      }
    }
  };

  useEffect(() => {
    if (searchText.length >= 2) {
      if (searchTimeout) clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        getCities(searchText).then((cities) => {
          setOptions(cities);
        });
      }, 200);
    }
  }, [searchText, selectedCounty]);

  const getCities = async (search) => {
    const payload = {
      county_id: parseInt(selectedCounty),
      search: search,
    };

    return axiosClient
      .post("/cities", payload)
      .then(async ({ data }) => {
        return data.data;
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status == 422) {
          const error = response.data.message;
          setAlert({
            variant: "danger",
            message: error,
            visible: true,
          });
        }

        return [];
      });
  };

  const setCityFn = (selected) => {
    if (selected && selected.length) {
      const selectedCity = selected[0]; // Get the first item in the selected array
      // Now you can access selectedCity.name and selectedCity.city_id

      // Assuming city is a state variable where you want to store the city_id
      setCity(selectedCity.city_id);
    } else {
      // Clear city if no option is selected
      setCity(null);
    }
  };

  async function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }

    if (day.length < 2) {
      day = "0" + day;
    }

    return await [year, month, day].join("-");
  }

  const onSubmitData = (form_data) => {
    const payload = {
      first_name: form_data.firstName,
      last_name: form_data.lastName,
      email: form_data.email,
      phone_number: form_data.phoneNumber,
      date_of_birth: form_data.dateOfBirth,
    };
    axiosClient
      .put("/user", payload)
      .then(async ({ data }) => {
        // Fetch the updated user data
        const updatedData = await getUserData();
        setUserData(updatedData);
        setShowDataForm(!showDataForm);
        setAlert({
          variant: "success",
          message: "Data successfully updated!",
          visible: true,
        });
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status == 422) {
          const error = response.data.message;
          setAlert({
            variant: "danger",
            message: error,
            visible: true,
          });
        }
      });
  };

  const onSubmitAddress = (form_data) => {
    const payload = {
      county_id: parseInt(form_data.county_id),
      city_id: city,
      street: form_data.street,
      street_number: form_data.streetNumber,
      building: form_data.building,
      entrance: form_data.entrance,
      apartment: form_data.apartment,
      postal_code: form_data.postalCode,
    };
    axiosClient
      .post("/address", payload)
      .then(async ({ data }) => {
        const addresses = await getUserAddresses();
        setAddresses(addresses);
        setShowAddressForm(!showAddressForm);

        setAlert({
          variant: "success",
          message: "Address successfully added!",
          visible: true,
        });
        resetAddressForm();
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status == 422) {
          const error = response.data.message;
          setAlert({
            variant: "danger",
            message: error,
            visible: true,
          });
        }
      });
  };

  const deleteAddress = async (id) => {
    try {
      const response = await axiosClient.delete(`/address/${id}`);
      setAlert({
        variant: "success",
        message: "Address successfully deleted!",
        visible: true,
      });

      getData();
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        const error = response.data.message;
        setAlert({
          variant: "danger",
          message: error,
          visible: true,
        });
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
      {!showDataForm && !showAddressForm && (
        <>
          <Row className="w-100 m-0">
            <Col className="py-3 text-center">
              <h3>Personal data</h3>
            </Col>
          </Row>
          {isLoading && <Loading />}
          {!isLoading && (
            <>
              <Row className="w-100 m-0">
                <Col className="py-2">
                  <h5 className="ms-5">Details</h5>
                </Col>
              </Row>
              <Row className="w-100 m-0">
                <Col>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faIdCard} className="me-2" />
                      {`First name: ${userData?.last_name}`}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faIdCard} className="me-2" />
                      {`Last name: ${userData?.first_name}`}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      {`Email: ${userData?.email}`}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faPhone} className="me-2" />
                      {`Phone number: ${userData?.phone_number}`}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faCalendarDay} className="me-2" />
                      Date of birth:{" "}
                      {userData?.date_of_birth != null
                        ? userData?.date_of_birth
                        : "-"}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="primary"
                    size="xs"
                    className={`${classes.grad} my-3`}
                    onClick={() => setShowDataForm(!showDataForm)}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
              <Row className="w-100 m-0">
                <Col className="py-2">
                  <h5 className="ms-5">Addresses</h5>
                </Col>
              </Row>
              <Row className="w-100 m-0">
                <Col className="px-3">
                  <ListGroup variant="flush">
                    {addresses?.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex flex-row align-items-center justify-content-between"
                      >
                        {isLoading ? (
                          <Placeholder as="span" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        ) : (
                          <>
                            <div>
                              <FontAwesomeIcon
                                icon={faHouse}
                                className="me-2"
                              />
                              {`Adress ${index + 1}: `}
                              {item.value}
                            </div>
                            <div>
                              <FontAwesomeIcon
                                icon={faTrash}
                                role="button"
                                onClick={() => deleteAddress(item.address_id)}
                              />
                            </div>
                          </>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
              <Row className="w-100 m-0">
                <Col>
                  <ListGroup variant="flush"></ListGroup>
                  <Button
                    variant="primary"
                    size="xs"
                    className={`${classes.grad} my-3`}
                    onClick={() => {
                      setShowAddressForm(!showAddressForm);
                    }}
                  >
                    Add an address
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
      {showDataForm && (
        <>
          <Row className="p-2 w-100 m-0 d-flex flex-column">
            <Col size={12}>
              <Button
                variant="primary"
                type="button"
                size="md"
                className={`${classes.grad} ${main_classes.w_fit_content} m-0 mt-3`}
                onClick={resetDataForm}
              >
                Back
              </Button>
            </Col>

            <Col className="p-2 text-center" size={12}>
              <h3>Edit personal data</h3>
            </Col>
          </Row>
          <Row className="p-2 w-100 m-0">
            <Col className="">
              <Form onSubmit={handleSubmit(onSubmitData)}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="firstName" className="mb-3">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        defaultValue={userData?.first_name}
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && (
                        <Form.Text className="text-danger">
                          The first name field is required
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName" className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        defaultValue={userData?.last_name}
                        {...register("lastName", { required: true })}
                      />
                      {errors.lastName && (
                        <Form.Text className="text-danger">
                          The last name field is required
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    defaultValue={userData?.email}
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <Form.Text className="text-danger">
                      Email address field is required
                    </Form.Text>
                  )}
                  {errors.email?.type === "pattern" && (
                    <Form.Text className="text-danger">
                      Email is invalid
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    defaultValue={userData?.phone_number}
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                  />
                  {errors.phoneNumber?.type === "required" && (
                    <Form.Text className="text-danger">
                      Phone number field is required
                    </Form.Text>
                  )}
                  {errors.phoneNumber?.type === "pattern" && (
                    <Form.Text className="text-danger">
                      Phone number is invalid
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="dateOfBirth" className="mb-3">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={userData?.date_of_birth}
                    {...register("dateOfBirth")}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className={`${classes.grad} w-100 m-0 mb-3`}
                >
                  Update data
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
      {showAddressForm && (
        <>
          <Row className="p-2 w-100 m-0 d-flex flex-column">
            <Col size={12}>
              <Button
                variant="primary"
                type="button"
                size="md"
                className={`${classes.grad} ${main_classes.w_fit_content} m-0 mt-3`}
                onClick={resetAddressForm}
              >
                Back
              </Button>
            </Col>

            <Col className="p-2 text-center" size={12}>
              <h3>Add an address</h3>
            </Col>
          </Row>
          <Row className="p-2 w-100 m-0">
            <Col className="">
              <Form onSubmit={handleSubmit(onSubmitAddress)}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="county_id" className="mb-3">
                      <Form.Label>
                        County <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        {...register("county_id", { required: true })}
                        defaultValue={-1}
                        onChange={(e) => {
                          setSelectedCounty(e.target.value);

                          setSearchText("");
                          setOptions([]);
                          setCity(null);
                        }}
                      >
                        <option key={-1} value={-1}>
                          -- Choose a county --
                        </option>
                        {counties?.map((county) => (
                          <option
                            key={county?.county_id}
                            value={county?.county_id}
                          >
                            {county?.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.county && (
                        <Form.Text className="text-danger">
                          The county field is required
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="search" className="mb-3">
                      <Form.Label>
                        City <span className="text-danger">*</span>
                      </Form.Label>
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="name"
                        onChange={setCityFn}
                        options={options}
                        placeholder="Choose a city...."
                        onInputChange={(text) => setSearchText(text)}
                        emptyLabel="No match for your search"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="street" className="mb-3">
                      <Form.Label>
                        Street <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        // defaultValue={userData?.last_name}
                        placeholder="Enter the street"
                        {...register("street", { required: true })}
                      />
                      {errors.street && (
                        <Form.Text className="text-danger">
                          The street field is required
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="streetNumber" className="mb-3">
                      <Form.Label>
                        Street number <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        // defaultValue={userData?.first_name}
                        placeholder="Enter the street number"
                        {...register("streetNumber", { required: true })}
                      />
                      {errors.streetNumber && (
                        <Form.Text className="text-danger">
                          Street number field is required
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="building" className="mb-3">
                      <Form.Label>Building</Form.Label>
                      <Form.Control
                        type="text"
                        // defaultValue={userData?.last_name}
                        placeholder="Enter the building"
                        {...register("building")}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="entrance" className="mb-3">
                      <Form.Label>Entrance</Form.Label>
                      <Form.Control
                        type="text"
                        // defaultValue={userData?.first_name}
                        placeholder="Enter the entrance"
                        {...register("entrance")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="apartment" className="mb-3">
                      <Form.Label>Apartment</Form.Label>
                      <Form.Control
                        type="text"
                        // defaultValue={userData?.first_name}
                        placeholder="Enter the apartment"
                        {...register("apartment")}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="postalCode" className="mb-3">
                      <Form.Label>
                        Postal code <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        // defaultValue={userData?.first_name}
                        placeholder="Enter the postal code"
                        {...register("postalCode", { required: true })}
                      />
                      {errors.postalCode && (
                        <Form.Text className="text-danger">
                          Postal code field is required
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className={`${classes.grad} w-100 m-0 mb-3`}
                >
                  Add
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default PersonalData;
