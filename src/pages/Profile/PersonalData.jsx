import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import classes from "../Login/Login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function PersonalData() {
	const [err, setErr] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [userData, setUserData] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const password = watch("password");
	const confirmPassword = watch("confirmPassword");
	const passwordsMatch = password === confirmPassword;

	useEffect(() => {
		const loadData = async () => {
			const result = await getUserData();
			setUserData(result);
		};

		loadData();
	}, []);

	const getUserData = async () => {
		try {
			const response = await axiosClient.get("/user");
			return response.data.data;
		} catch (err) {
			const response = err.response;
			if (response && response.status !== 200) {
				if (response.data.errors) {
					setErr(response.data.errors);
				}
			}
		}
	};

	const onSubmit = () => {};
	return (
		<>
			{!showForm && (
				<>
					<Row className="p-2 w-100">
						<Col className="pt-3 text-center">
							<h3>Date personale</h3>
						</Col>
					</Row>
					<Row className="px-2 w-100">
						<Col>
							<ListGroup variant="flush">
								<ListGroup.Item>
									Nume: {"   "}
									{userData?.last_name}
								</ListGroup.Item>
								<ListGroup.Item>
									Prenume: {"   "}
									{userData?.first_name}
								</ListGroup.Item>
								<ListGroup.Item>
									Email: {"   "}
									{userData?.email}
								</ListGroup.Item>
								<ListGroup.Item>
									Numar de telefon: {"   "} {userData?.phone_number}
								</ListGroup.Item>
								<ListGroup.Item>
									Data nasterii: {"   "}
									{userData?.date_of_birth}
								</ListGroup.Item>
							</ListGroup>
							<Button
								variant="primary"
								type="submit"
								size="xs"
								className={`${classes.grad} my-3`}
							>
								<FontAwesomeIcon icon={faPenToSquare} />
							</Button>
						</Col>
					</Row>
				</>
			)}
			{showForm && (
				<>
					<Row className="p-2 w-100">
						<Col className="p-2 text-center">
							<h3>Editare date personale</h3>
						</Col>
					</Row>
					<Row className="p-2 w-100 m-0">
						<Col className="">
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Row>
									<Col>
										<Form.Group controlId="firstName" className="mb-3">
											<Form.Label>Prenume</Form.Label>
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
											<Form.Label>Nume</Form.Label>
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
									<Form.Label>Email</Form.Label>
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
									<Form.Label>Numar de telefon</Form.Label>
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
									<Form.Label>Data nasterii</Form.Label>
									<Form.Control
										type="date"
										{...register("dateOfBirth", { required: true })}
									/>
									{errors.dateOfBirth && (
										<Form.Text className="text-danger">
											Data nasterii este obligatorie.
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Parola</Form.Label>
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
									<Form.Label>Confirmare parola</Form.Label>
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
