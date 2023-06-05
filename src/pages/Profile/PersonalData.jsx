import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import classes from "../Login/Login.module.css";
import main_classes from "./PersonalData.module.css";
import axiosClient from "../../axios-client";
import { ListGroup, Alert } from "react-bootstrap";

import Placeholder from "react-bootstrap/Placeholder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faIdCard,
	faEnvelope,
	faPhone,
	faCalendarDay,
	faHouse,
} from "@fortawesome/free-solid-svg-icons";

function PersonalData() {
	const [isLoading, setIsLoading] = useState(true);
	const [backendErrors, setBackendErrors] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [userData, setUserData] = useState(null);

	const [showDataForm, setShowDataForm] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		const loadData = async () => {
			const result = await getUserData();
			setUserData(result);
			setIsLoading(false);
		};

		loadData();
	}, []);

	useEffect(() => {
		if (backendErrors) {
			setShowAlert(true);
		}
	}, [backendErrors]);

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
				if (response.data.errors) {
					console.log(response.data.errors, "check errors");
					setBackendErrors(response.data.errors);
				}
			}
		}
	};

	const resetForm = () => {
		setShowDataForm(!showDataForm);
		getUserData();
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
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status == 422) {
					setBackendErrors(response.data.errors);
				}
			});
	};

	const onSubmitAddress = (form_data) => {
		const payload = {
			county: form_data.county,
			city: form_data.city,
			street: form_data.street,
			street_number: form_data.streetNumber,
			building: form_data.building,
			entrance: form_data.entrance,
			apartment: form_data.apartment,
			postal_code: form_data.postal_code,
		};
		axiosClient
			//de modificat
			.put("/user", payload)
			.then(async ({ data }) => {
				// Fetch the updated user data
				const updatedData = await getUserData();
				setUserData(updatedData);
				setShowAddressForm(!showAddressForm);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status == 422) {
					setBackendErrors(response.data.errors);
				}
			});
	};

	return (
		<>
			{showAlert && (
				<Alert
					variant="danger"
					dismissible
					onClose={() => {
						setShowAlert(false);
						setBackendErrors(null);
					}}
					className="m-3 text-center"
				>
					{Object.values(backendErrors).map((error, index) => (
						<p className="m-0" key={index}>
							{error}
						</p>
					))}
				</Alert>
			)}

			{!showDataForm && !showAddressForm && (
				<>
					<Row className="w-100 m-0">
						<Col className="py-3 text-center">
							<h3>Date personale</h3>
						</Col>
					</Row>
					<Row className="w-100 m-0">
						<Col className="py-2">
							<h5 className="ms-5">Detalii</h5>
						</Col>
					</Row>
					<Row className="w-100 m-0">
						<Col>
							<ListGroup variant="flush">
								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faIdCard} className="me-2" />
											{`Nume: ${userData?.last_name}`}
										</>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faIdCard} className="me-2" />
											{`Prenume: ${userData?.first_name}`}
										</>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faEnvelope} className="me-2" />
											{`Email: ${userData?.email}`}
										</>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faPhone} className="me-2" />
											{`Telefon: ${userData?.phone_number}`}
										</>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faCalendarDay} className="me-2" />
											{`Data nasterii: ${userData?.date_of_birth}`}
										</>
									)}
								</ListGroup.Item>
							</ListGroup>
							<Button
								variant="primary"
								size="xs"
								className={`${classes.grad} my-3`}
								onClick={() => setShowDataForm(!showDataForm)}
							>
								Editare
								{/* <FontAwesomeIcon icon={faPenToSquare} /> */}
							</Button>
						</Col>
					</Row>
					<Row className="w-100 m-0">
						<Col className="py-2">
							<h5 className="ms-5">Adrese</h5>
						</Col>
					</Row>
					<Row className="w-100 m-0">
						<Col>
							<ListGroup variant="flush">
								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faHouse} className="me-2" />
											{`Judet: ${userData?.last_name}`}
										</>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faIdCard} className="me-2" />
											{`Prenume: ${userData?.first_name}`}
										</>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faEnvelope} className="me-2" />
											{`Email: ${userData?.email}`}
										</>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faPhone} className="me-2" />
											{`Telefon: ${userData?.phone_number}`}
										</>
									)}
								</ListGroup.Item>
								<ListGroup.Item>
									{isLoading && (
										<Placeholder as="span" animation="glow">
											<Placeholder xs={12} />
										</Placeholder>
									)}
									{!isLoading && (
										<>
											<FontAwesomeIcon icon={faCalendarDay} className="me-2" />
											{`Data nasterii: ${userData?.date_of_birth}`}
										</>
									)}
								</ListGroup.Item>
							</ListGroup>
							<Button
								variant="primary"
								size="xs"
								className={`${classes.grad} my-3`}
								onClick={() => setShowAddressForm(!showAddressForm)}
							>
								Editare
								{/* <FontAwesomeIcon icon={faPenToSquare} /> */}
							</Button>
						</Col>
					</Row>
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
								onClick={resetForm}
							>
								Inapoi
							</Button>
						</Col>

						<Col className="p-2 text-center" size={12}>
							<h3>Editare date personale</h3>
						</Col>
					</Row>
					<Row className="p-2 w-100 m-0">
						<Col className="">
							<Form onSubmit={handleSubmit(onSubmitData)}>
								<Row>
									<Col md={6}>
										<Form.Group controlId="lastName" className="mb-3">
											<Form.Label>Nume</Form.Label>
											<Form.Control
												type="text"
												defaultValue={userData?.last_name}
												placeholder="Introduceti numele"
												{...register("lastName", { required: true })}
											/>
											{errors.lastName && (
												<Form.Text className="text-danger">
													Numele este obligatoriu.
												</Form.Text>
											)}
										</Form.Group>
									</Col>
									<Col md={6}>
										<Form.Group controlId="firstName" className="mb-3">
											<Form.Label>Prenume</Form.Label>
											<Form.Control
												type="text"
												defaultValue={userData?.first_name}
												placeholder="Introduceti prenumele"
												{...register("firstName", { required: true })}
											/>
											{errors.firstName && (
												<Form.Text className="text-danger">
													Prenumele este obligatoriu.
												</Form.Text>
											)}
										</Form.Group>
									</Col>
								</Row>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										defaultValue={userData?.email}
										placeholder="Introduceti adresa de email"
										{...register("email", {
											required: true,
											pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
										})}
									/>
									{errors.email?.type === "required" && (
										<Form.Text className="text-danger">
											Adresa de email este obligatorie.
										</Form.Text>
									)}
									{errors.email?.type === "pattern" && (
										<Form.Text className="text-danger">
											Adresa de email este invalida.
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group controlId="phoneNumber" className="mb-3">
									<Form.Label>Numar de telefon</Form.Label>
									<Form.Control
										type="tel"
										defaultValue={userData?.phone_number}
										placeholder="Introduceti numarul de telefon"
										{...register("phoneNumber", {
											required: true,
											pattern: /^[0-9]{10}$/,
										})}
									/>
									{errors.phoneNumber?.type === "required" && (
										<Form.Text className="text-danger">
											Numarul de telefon este obligatoriu.
										</Form.Text>
									)}
									{errors.phoneNumber?.type === "pattern" && (
										<Form.Text className="text-danger">
											Numarul de telefon introdus este invalid.
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group controlId="dateOfBirth" className="mb-3">
									<Form.Label>Data nasterii</Form.Label>
									<Form.Control
										type="date"
										defaultValue={userData?.date_of_birth}
										placeholder="Introduceti data nasterii"
									/>
								</Form.Group>

								<Button
									variant="primary"
									type="submit"
									size="md"
									className={`${classes.grad} w-100 m-0 mb-3`}
								>
									Actualizare date
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
