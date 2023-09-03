import { Row, Col, Container } from "react-bootstrap";

import classes from "./PaymentAndShippingInfoPage.module.css";

function PaymentAndShippingInfoPage() {
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
          <h1 className="py-3 text-center">Payment and shipping information</h1>
        </Col>
      </Row>
      <Row className="bg-light w-100 p-3">
        <section className="payment-info">
          <h2>Payment Information</h2>
          <p>
            We offer the "Cash on Delivery" payment method for your convenience.
            With this option, you can pay in cash when your order arrives at
            your doorstep. No online payment is required. Please make sure to
            have the exact amount ready for the delivery person.
          </p>
        </section>

        <section className="shipping-info">
          <h2>Shipping Information</h2>
          <p>
            Your order will be delivered to the shipping address provided during
            checkout. Please double-check the address for accuracy to ensure a
            smooth delivery process. Our team will contact you to confirm the
            delivery date and time once your order is ready for shipment.
          </p>
          <p>
            If you have any questions or need to update your shipping address,
            please contact our customer support team.
          </p>
        </section>
      </Row>
    </Container>
  );
}

export default PaymentAndShippingInfoPage;
