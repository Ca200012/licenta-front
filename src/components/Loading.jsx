import { Col } from "react-bootstrap";

function Loading() {
	return (
		<Col className="d-flex justify-content-center align-items-center my-5">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</Col>
	);
}

export default Loading;
