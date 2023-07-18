import React from "react";
import { useForm } from "react-hook-form";
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button,
	Alert,
} from "react-bootstrap";
import classes from "./Register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { useState, useEffect } from "react";

function Register() {
	const { token } = useStateContext();

	const [backendErrors, setBackendErrors] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const { setUser, setToken } = useStateContext();

	useEffect(() => {
		document.title = "Register";
	}, []);

	useEffect(() => {
		if (backendErrors) {
			setShowAlert(true);
		}
	}, [backendErrors]);

	//functionalitatea de register
	const onSubmit = (form_data) => {
		//in variabila form_data avem toate valorile din form dupa submit(form_data este trimis de catre handleSubmit)
		const payload = {
			first_name: form_data.firstName,
			last_name: form_data.lastName,
			email: form_data.email,
			phone_number: form_data.phoneNumber,
			date_of_birth: form_data.dateOfBirth,
			password: form_data.password,
			password_confirmation: form_data.confirmPassword,
		};
		axiosClient
			.post("/register", payload)
			//data reprezinta raspunsul primit de la server(din backend)
			.then(({ data }) => {
				console.log(data.data);
				//daca avem raspuns pozitiv stocam in user datele user-ului si in token token ul
				//pagina isi va da redirect
				setUser(data.data.user);
				setToken(data.data.authorisation.token);
				console.log(data.data);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status == 422) {
					setBackendErrors(response.data.errors);
					console.log(response.data.errors);
				}
			});
	};

	const backgroundImage = "/wp7953009.webp";

	const {
		register,
		//handleSubmit (functie din react-hook-form) colecteaza datele din formular automat si le trimite functiei onSubmit
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const password = watch("password");
	const confirmPassword = watch("confirmPassword");
	const passwordsMatch = password === confirmPassword;

	//daca un user este logat si intra pe pg de register, va fi redirectionat catre pagina de home
	if (token) {
		return <Navigate to="/profile" />;
	}

	return (
		<Container
			fluid
			className={`${classes.cover} d-flex align-items-center justify-content-center flex-fill py-3`}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			<Row className="w-100 d-flex justify-content-center">
				<Col
					sm={12}
					md={6}
					lg={4}
					className="d-flex flex-column justify-content-center align-items-center p-0 rounded"
				>
					<Card className="w-100 shadow rounded border-0">
						<Card.Header className={classes.header}>
							<h3 className="text-center p-1">Register</h3>
						</Card.Header>
						<Card.Body>
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
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Row>
									<Col md={6}>
										<Form.Group controlId="firstName" className="mb-3">
											<Form.Label>
												First name <span className="text-danger">*</span>
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter your first name"
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
											<Form.Label>
												Last name <span className="text-danger">*</span>
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter your last name"
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
									<Form.Label>
										Email <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter your email address"
										{...register("email", {
											required: true,
											pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
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
									<Form.Label>
										Phone number <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="tel"
										placeholder="Enter your phone number"
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
									<Form.Control type="date" {...register("dateOfBirth")} />
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>
										Password <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter your password"
										{...register("password", { required: true, minLength: 8 })}
									/>
									{errors.password?.type === "required" && (
										<Form.Text className="text-danger">
											Password field is required
										</Form.Text>
									)}
									{errors.password?.type === "minLength" && (
										<Form.Text className="text-danger">
											Your password must have a minimum of 8 characters
										</Form.Text>
									)}
								</Form.Group>
								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>
										Password confirmation <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm your password"
										{...register("confirmPassword", {
											required: true,
											minLength: 8,
										})}
									/>
									{errors.confirmPassword?.type === "required" && (
										<Form.Text className="text-danger">
											Password confirmation field is required
										</Form.Text>
									)}
									{!passwordsMatch && !errors.confirmPassword && (
										<Form.Text className="text-danger">
											Password and confirm password are not the same
										</Form.Text>
									)}
								</Form.Group>

								<Row className="w-100 m-0 d-flex justify-content-between">
									<Col className="p-0">
										<Link to="/login" className="text-decoration-none">
											<p className={classes.links}>
												Already have an account? Login here
											</p>
										</Link>
									</Col>
								</Row>

								<Button
									variant="primary"
									type="submit"
									size="md"
									className={`${classes.grad} w-100 m-0`}
								>
									Sign up
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Register;
