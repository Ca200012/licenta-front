import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import classes from "./Register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { useState, useEffect } from "react";

function Register() {
	const { token } = useStateContext();

	const [err, setErr] = useState(null);
	const { setUser, setToken } = useStateContext;

	useEffect(() => {
		document.title = "Inregistrare";
	}, []);
	//daca un user este logat si intra pe pg de register, va fi redirectionat catre pagina de home
	if (token) {
		return <Navigate to="/" />;
	}

	//functionalitatea de register
	const onSubmit = (form_data) => {
		//in variabila form_data avem toate valorile din form dupa submit(form_data este trimis de catre handleSubmit)
		const payload = {
			first_name: form_data.firstName,
			last_name: form_data.lastName,
			email: form_data.email,
			phone_number: form_data.phoneNumber,
			birth_date: form_data.dateOfBirth,
			password: form_data.password,
			password_confirmation: form_data.confirmPassword,
		};
		axiosClient
			.post("/register", payload)
			//data reprezinta raspunsul primit de la server(din backend)
			.then(({ data }) => {
				//daca avem raspuns pozitiv stocam in user datele user-ului si in token token ul
				//pagina isi va da redirect
				setUser(data.data.user);
				setToken(data.data.authorisation.token);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status == 422) {
					setErr(response.data.errors);
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
							<h3 className="text-center p-1">Inregistrare</h3>
						</Card.Header>
						<Card.Body>
							{err && (
								<div className="alert">
									{Object.keys(err).map((key) => (
										<p key={key}>{err[key][0]}</p>
									))}
								</div>
							)}
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Row>
									<Col md={6}>
										<Form.Group controlId="firstName" className="mb-3">
											<Form.Label>
												Prenume <span className="text-danger">*</span>
											</Form.Label>
											<Form.Control
												type="text"
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
									<Col md={6}>
										<Form.Group controlId="lastName" className="mb-3">
											<Form.Label>
												Nume <span className="text-danger">*</span>
											</Form.Label>
											<Form.Control
												type="text"
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
								</Row>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>
										Email <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="email"
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
									<Form.Label>
										Numar de telefon <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="tel"
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
									<Form.Label>
										Data nasterii <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control type="date" />
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>
										Parola <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Introduceti parola"
										{...register("password", { required: true, minLength: 8 })}
									/>
									{errors.password?.type === "required" && (
										<Form.Text className="text-danger">
											Parola este obligatorie.
										</Form.Text>
									)}
									{errors.password?.type === "minLength" && (
										<Form.Text className="text-danger">
											Parola trebuie sa contina minim 8 caractere.
										</Form.Text>
									)}
								</Form.Group>
								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>
										Confirmare parola <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirmati parola"
										{...register("confirmPassword", {
											required: true,
											minLength: 8,
										})}
									/>
									{errors.confirmPassword?.type === "required" && (
										<Form.Text className="text-danger">
											Confirmarea parolei este obligatorie.
										</Form.Text>
									)}
									{!passwordsMatch && !errors.confirmPassword && (
										<Form.Text className="text-danger">
											Parola si confirmarea parolei sunt diferite.
										</Form.Text>
									)}
								</Form.Group>

								<Row className="w-100 m-0 d-flex justify-content-between">
									<Col className="p-0">
										<Link to="/login" className="text-decoration-none">
											<p className={classes.links}>
												Aveti deja cont? Autentificati-va aici
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
									Inregistrare
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
