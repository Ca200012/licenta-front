import React, { useEffect } from "react";
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
import classes from "./Login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { useState } from "react";

function Login() {
	const [backendErrors, setbackendErrors] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const { setUser, setToken } = useStateContext();
	const { token } = useStateContext();

	const backgroundImage = "/wp7953009.webp";

	useEffect(() => {
		document.title = "Autentificare";
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (backendErrors) {
			setShowAlert(true);
		}
	}, [backendErrors]);

	const onSubmit = (form_data) => {
		const payload = {
			email: form_data.email,
			password: form_data.password,
		};
		//console.log(payload);
		axiosClient
			.post("/login", payload)
			.then(({ data }) => {
				setUser(data.data.user);
				setToken(data.data.authorisation.token);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status == 422) {
					if (response.data.errors) {
						setbackendErrors(response.data.errors);
					} else {
						setbackendErrors({
							email: [response.data.message],
						});
					}
				}
			});
	};

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
							<h3 className="text-center p-1">Autentificare</h3>
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

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>
										Parola <span className="text-danger">*</span>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Introduceti parola"
										{...register("password", {
											required: true,
											minLength: 8,
										})}
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

								<Row className="w-100 m-0 d-flex justify-content-between">
									<Col className="p-0 d-flex flex-start">
										{["checkbox"].map((type) => (
											<div key={`default-${type}`} className="mb-3">
												<Form.Check
													type={type}
													id={`default-${type}`}
													label="Ramaneti conectat"
												/>
											</div>
										))}
									</Col>
									<Col className="p-0 d-flex justify-content-end">
										<Link
											to="/forgot-password"
											className="text-decoration-none text-dark"
										>
											<p className={classes.links}>Ati uitat parola?</p>
										</Link>
									</Col>
								</Row>
								<Row className="w-100 m-0 d-flex justify-content-between">
									<Col className="p-0">
										<Link to="/register" className="text-decoration-none">
											<p className={classes.links}>
												Nu aveti cont? Inregistrati-va aici
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
									Autentificare
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
