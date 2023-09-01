import { Row, Col, Container } from "react-bootstrap";

import classes from "./SizeGuidePage.module.css";
import SizeGuide from "../../components/article/SizeGuide";

function SizeGuidePage() {
	return (
		<Container
			className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
		>
			<Row className="w-100 mx-0">
				<Col
					className={`${classes.header} p-0`}
					xl={12}
					lg={12}
					md={12}
					sm={12}
					xs={12}
				>
					<h1 className="py-3 text-center">Size guide</h1>
				</Col>
			</Row>
			<Row className="bg-light w-100 p-3">
				<SizeGuide />
			</Row>
		</Container>
	);
}

export default SizeGuidePage;
