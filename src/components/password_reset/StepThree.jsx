import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import classes from "../../pages/PasswordReset/PasswordReset.module.css";

function StepThree({
  setPassword,
  password,
  setConfirmPassword,
  confirmPassword,
  nextStep,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    setPassword(data.password);
    setConfirmPassword(data.confirmPassword);
    nextStep();
  };

  return (
    <Form className="w-100" onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Enter your password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 8 })}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password?.type === "required" && (
          <Form.Text className="text-danger">Password is required</Form.Text>
        )}
        {errors.password?.type === "minLength" && (
          <Form.Text className="text-danger">
            Your password must have a minimum of 8 characters
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Label>Enter your password confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password confirmation"
          {...register("confirmPassword", {
            required: true,
            minLength: 8,
          })}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword?.type === "required" && (
          <Form.Text className="text-danger">
            Password confirmation field is required
          </Form.Text>
        )}
        {password != confirmPassword && !errors.confirmPassword && (
          <Form.Text className="text-danger">
            Password and password confirmation are not the same
          </Form.Text>
        )}
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className={`${classes.grad} w-100 m-0 mb-3`}
      >
        Submit
      </Button>
    </Form>
  );
}

export default StepThree;
