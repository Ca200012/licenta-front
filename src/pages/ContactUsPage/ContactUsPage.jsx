import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import classes from "./ContactUsPage.module.css";
import { useState } from "react";
import axiosClient from "../../axios-client";

function ContactUsPage() {
  const [showContactForm, setShowContactForm] = useState(true);

  const onSubmit = (form_data) => {
    const payload = {
      email: form_data.email,
      message: form_data.message,
    };
    axiosClient
      .post("/message", payload)
      .then(({ data }) => {})
      .catch((err) => {
        const response = err.response;
        if (response && response.status == 422) {
          const error = response.data.message;
        }
      });
    setShowContactForm(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <h1 className="py-3 text-center">Contact us</h1>
        </Col>
      </Row>
      <Row className="bg-light w-100 p-3 d-flex justify-content-center">
        <Col xl={6} lg={6} md={12} sm={12} xs={12} className=" py-3">
          {showContactForm ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <Form.Text className="text-danger">
                    Email address field is required
                  </Form.Text>
                )}
                {errors.email?.type === "pattern" && (
                  <Form.Text className="text-danger">
                    Email is invalid
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="message" className="mb-3">
                <Form.Label>
                  Message <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter your message"
                  {...register("message", {
                    required: true,
                  })}
                />
                {errors.message?.type === "required" && (
                  <Form.Text className="text-danger">
                    Message field is required
                  </Form.Text>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                size="md"
                className={`${classes.grad} w-100 m-0`}
              >
                Send us a message
              </Button>
            </Form>
          ) : (
            <>
              <h2 className="text-center">Thank you for your message!</h2>
              <h4 className="text-center my-3">
                Our customer support will get in contact with you as soon as
                possible!
              </h4>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUsPage;
