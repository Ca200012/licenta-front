import { Row, Col, Container } from "react-bootstrap";

import classes from "./ReturnPolicyPage.module.css";

function ReturnPolicyPage() {
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
          <h1 className="py-3 text-center">Return policy</h1>
        </Col>
      </Row>
      <Row className="bg-light w-100 p-3">
        <h1>Return Policy</h1>
        <div className="policy-section">
          <div className="policy-item">
            <div className="item-title">In-Store Returns</div>
            <div>
              We accept returns for clothing, bags, and accessories purchased
              in-store. Unfortunately, at this time, we do not offer online
              returns. Our dedicated team is available to guide you through the
              return process and help you find an alternative item that matches
              your preferences.
            </div>
          </div>
          <div className="policy-item">
            <div className="item-title">Return Guidelines</div>
            <div>To be eligible for a return, please ensure that:</div>
            <ol>
              <li>The item(s) were purchased directly from our store.</li>
              <li>The original receipt or proof of purchase is presented.</li>
              <li>
                The item(s) are in their original condition, with all tags and
                labels attached.
              </li>
              <li>
                The return is initiated within 30 days from the date of
                purchase.
              </li>
            </ol>
          </div>
          <div className="policy-item">
            <div className="item-title">Items Excluded from Returns</div>
            <div>
              Certain items are non-returnable for hygiene and safety reasons.
            </div>
          </div>
          <div className="policy-item">
            <div className="item-title">Return Process</div>
            <div>Follow these steps to initiate an in-store return:</div>
            <ol>
              <li>Visit our store location where the purchase was made.</li>
              <li>
                Present the original receipt or proof of purchase to our store
                associate.
              </li>
              <li>
                Our associate will assess the condition of the item(s) and
                process your return accordingly.
              </li>
              <li>
                You will have the option to exchange the item(s) for an
                alternative product or receive store credit for future
                purchases.
              </li>
            </ol>
            <div>
              Please note that refunds to the original form of payment are not
              available for in-store returns. Store credit will be provided for
              returned items, which can be used towards any future purchase.
            </div>
          </div>
          <div className="policy-item">
            <div className="item-title">Exchange Policy</div>
            <div>
              If you wish to exchange an item, our team will gladly assist you
              in finding a suitable replacement. Exchanges are subject to
              product availability.
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default ReturnPolicyPage;
