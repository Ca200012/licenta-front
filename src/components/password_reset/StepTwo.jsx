import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import classes from "../../pages/PasswordReset/PasswordReset.module.css";

function StepOne({ setCode, code, nextStep, step }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    setCode(data.code);
    nextStep();
  };

  return (
    <Form className="w-100" onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Group controlId="code" className="mb-3">
        <Form.Label>
          <h1 className="text-center">Enter your verification code</h1>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Verification code"
          {...register("code", {
            required: true,
            pattern: /^[0-9]{6}$/,
          })}
          onChange={(e) => setCode(e.target.value)}
        />
        {errors.code?.type === "required" && (
          <Form.Text className="text-danger">
            Verification code is required
          </Form.Text>
        )}
        {errors.code?.type === "pattern" && (
          <Form.Text className="text-danger">
            Verification code is invalid
          </Form.Text>
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
