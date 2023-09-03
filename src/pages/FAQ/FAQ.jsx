import { Row, Col, Container, Accordion } from "react-bootstrap";

import classes from "./FAQ.module.css";

function FAQ() {
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
          <h1 className="py-3 text-center">Frequently asked questions</h1>
        </Col>
      </Row>
      <Row className="bg-light w-100 p-3">
        <Col>
          <Accordion defaultActiveKey="0" className="py-5">
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I place an order?</Accordion.Header>
              <Accordion.Body>
                Browse through our catalog and add the items you wish to
                purchase to your cart. Once you're ready to check out, follow
                the instructions. A confirmation will be sent to your email.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                How long does it take for my order to arrive?
              </Accordion.Header>
              <Accordion.Body>
                We strive to deliver all orders within 2-5 business days right
                to your doorstep or your preferred location anywhere in Romania.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What is Cash on Delivery?</Accordion.Header>
              <Accordion.Body>
                Cash on Delivery allows you to pay for your order with cash when
                it arrives at your doorstep. This eliminates the need for online
                transactions or card payments.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Is Cash on Delivery safe?</Accordion.Header>
              <Accordion.Body>
                Absolutely! Cash on Delivery is a risk-free payment option that
                allows you to inspect your products before paying for them.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>How can I track my order?</Accordion.Header>
              <Accordion.Body>
                Once your order is confirmed, your order's status will be
                available in your orders page.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>What is your return policy?</Accordion.Header>
              <Accordion.Body>
                You have 30 days from the receipt of your order to return items
                that are unused and in their original packaging.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>
                How do I return an item paid for by Cash on Delivery?
              </Accordion.Header>
              <Accordion.Body>
                Contact our customer service to initiate the return process.
                Once the item is received and inspected, we'll arrange for a
                refund or a replacement.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>
                Do you offer international shipping?
              </Accordion.Header>
              <Accordion.Body>
                Currently, we only ship within Romania. However, we are looking
                to expand our services in the future.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>
                Is it possible to change my order after it has been placed?
              </Accordion.Header>
              <Accordion.Body>
                If you need to make changes to your order, please contact our
                customer service immediately. We can only make changes if the
                order has not yet been dispatched.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>
                I received a damaged/incorrect item. What should I do?
              </Accordion.Header>
              <Accordion.Body>
                We apologize for any inconvenience. Please contact our customer
                service as soon as possible to initiate a return or exchange.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default FAQ;
