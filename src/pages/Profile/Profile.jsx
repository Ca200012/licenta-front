import classes from "./Profile.module.css";

import { useEffect } from "react";
import { Container, Row, Col, ListGroup, NavLink } from "react-bootstrap";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../axios-client";

function Profile() {
	//pentru a verifica ca ruta este /profile
	const match = useMatch("/profile");
	const navigate = useNavigate();
	const { token, setToken, setUser } = useStateContext();

	useEffect(() => {
		document.title = "Profile";
	}, []);

	const onLogout = (ev) => {
		ev.preventDefault();

		axiosClient.post("/logout").then(() => {
			setUser({});
			setToken(null);
			navigate("/login");
		});
	};

	if (!token) {
		return <Navigate to="/" />;
	}

	if (match) {
		return <Navigate to="/profile/personal-data" />;
	}

	return (
		<Container
			className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
		>
			<Row className="w-100 m-0">
				<Col
					className={`${classes.header} p-0`}
					xl={12}
					lg={12}
					md={12}
					sm={12}
					xs={12}
				>
					<h1 className="py-3 text-center">My profile</h1>
				</Col>
			</Row>
			<Row className="w-100 d-flex m-0">
				<Col xl={4} lg={4} md={6} sm={12} xs={12} className="p-0">
					<ListGroup>
						<ListGroup.Item className="py-3 fw-bold">
							<Link
								to="/profile/personal-data"
								className="text-decoration-none text-dark"
							>
								<FontAwesomeIcon icon={faPerson} className="me-1" /> Personal
								data
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className="bg-transparent py-3 fw-bold">
							<Link
								to="/profile/orders"
								className="text-decoration-none text-dark"
							>
								<FontAwesomeIcon icon={faBox} className="me-1" /> Orders
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className="py-3 fw-bold">
							<Link
								to="/profile/returns"
								className="text-decoration-none text-dark"
							>
								<FontAwesomeIcon icon={faTruck} className="me-1" /> Returns
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className="bg-transparent py-3 fw-bold">
							<Link
								to="/profile/contact-us"
								className="text-decoration-none text-dark"
							>
								<FontAwesomeIcon icon={faMessage} className="me-1" /> Contact us
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className="py-3 fw-bold">
							<Link
								to="/"
								className="text-decoration-none text-dark"
								onClick={onLogout}
							>
								<FontAwesomeIcon
									icon={faArrowRightFromBracket}
									className="me-1"
								/>{" "}
								Logout
							</Link>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col xl={8} lg={8} md={6} sm={12} xs={12} className="p-0 bg-white">
					{/* urmatorul lucru se va afisa doar in pg de profile, nu va fi inherited si de copii */}
					{match && <div>Profil</div>}
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
}

export default Profile;
