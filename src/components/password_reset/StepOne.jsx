import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import classes from "../../pages/PasswordReset/PasswordReset.module.css";

function StepOne({ setEmail, email, nextStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    setEmail(data.email);
    nextStep();
  };

  return (
    <Form className="w-100" onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>
          <h1 className="text-center">Enter your email address</h1>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email?.type === "required" && (
          <Form.Text className="text-danger">
            Email address field is required
          </Form.Text>
        )}
        {errors.email?.type === "pattern" && (
          <Form.Text className="text-danger">Email is invalid</Form.Text>
        )}
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className={`${classes.grad} w-100 m-0 mb-3`}
      >
        Next
      </Button>
    </Form>
  );
}

export default StepOne;
