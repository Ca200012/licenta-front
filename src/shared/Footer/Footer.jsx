import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faInstagram,
	faFacebook,
	faTwitter,
	faTiktok,
	faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import {
	faRuler,
	faMessage,
	faAddressCard,
	faTruck,
	faMoneyBill,
	faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
	return (
		<Container fluid className={`${classes.shadow} p-0 m-0 bg-light py-3`}>
			<Row className="w-100 d-flex justify-content-between">
				<Col
					xl={4}
					lg={4}
					md={12}
					sm={12}
					xs={12}
					className="d-flex justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-xs-center"
				>
					<Row className="d-flex flex-column">
						<Col className="text-center mb-2 mt-1">
							<h6>Information</h6>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faAddressCard} className="me-2" />
								About us
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link
								className={`${classes.color} text-decoration-none`}
								to="/sizeguidepage"
							>
								<FontAwesomeIcon icon={faRuler} className="me-2" />
								Size guide
							</Link>
						</Col>

						<Col className="text-center mb-1">
							<Link
								className={`${classes.color} text-decoration-none`}
								to="/returnpolicy"
							>
								<FontAwesomeIcon icon={faTruck} className="me-2" />
								Return policy
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faMoneyBill} className="me-2" />
								Payment information
							</Link>
						</Col>
					</Row>
				</Col>
				<Col
					xl={4}
					lg={4}
					md={12}
					sm={12}
					xs={12}
					className="d-flex justify-content-center"
				>
					<Row className="d-flex flex-column">
						<Col className="text-center mb-2 mt-1">
							<h6>Social media</h6>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faInstagram} className="me-2" />
								Instagram
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faFacebook} className="me-2" />
								Facebook
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faTwitter} className="me-2" />
								Twitter
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faTiktok} className="me-2" />
								Tiktok
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faTelegram} className="me-2" />
								Telegram
							</Link>
						</Col>
					</Row>
				</Col>
				<Col
					xl={4}
					lg={4}
					md={12}
					sm={12}
					xs={12}
					className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-center justify-content-sm-center justify-content-xs-center"
				>
					<Row className="d-flex flex-column">
						<Col className="text-center mb-2 mt-1">
							<h6>Help</h6>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faMessage} className="me-2" />
								Contact us
							</Link>
						</Col>
						<Col className="text-center mb-1">
							<Link className={`${classes.color} text-decoration-none`} to="#">
								<FontAwesomeIcon icon={faCircleQuestion} className="me-2" />
								FAQ
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Footer;
