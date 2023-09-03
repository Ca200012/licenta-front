import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./PasswordReset.module.css";

import axiosClient from "../../axios-client";

import StepOne from "../../components/password_reset/StepOne";
import StepTwo from "../../components/password_reset/StepTwo";
import StepThree from "../../components/password_reset/StepThree";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomAlert from "../../components/CustomAlert";

function PasswordReset() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { token } = useStateContext();

  const [alert, setAlert] = useState({
    variant: "primary",
    message: null,
    visible: false,
  });

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, []);

  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [alert.visible]);

  const nextStep = async () => {
    let proceed = false;

    try {
      switch (step) {
        case 1:
          proceed = await checkEmail();
          break;
        case 2:
          proceed = await checkCode();
          break;
        case 3:
          proceed = await resetPassword();
          break;
        default:
          return;
      }

      if (proceed) {
        if (step < 3) {
          setStep(step + 1);
        } else {
          setShowConfirmation(true);
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axiosClient.post("/check-email", { email: email });
      return true;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          setAlert({
            variant: "danger",
            message: response.data.errors.message[0],
            visible: true,
          });
          return false;
        }
      }
    } finally {
      setAlert({
        variant: "success",
        message: "Email successfully confirmed!",
        visible: true,
      });
    }
  };

  const checkCode = async () => {
    try {
      const response = await axiosClient.post("/check-code", {
        code: code,
        email: email,
      });
      return true;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          setAlert({
            variant: "danger",
            message: response.data.errors.message[0],
            visible: true,
          });
          return false;
        }
      }
    } finally {
      setAlert({
        variant: "success",
        message: "Code successfully verified!",
        visible: true,
      });
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axiosClient.post("/reset-password", {
        password: password,
        password_confirmation: confirmPassword,
        email: email,
        code: code,
      });
      return true;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          setAlert({
            variant: "danger",
            message: response.data.errors.message[0],
            visible: true,
          });
          return false;
        }
      }
    } finally {
      setAlert({
        variant: "success",
        message: "Password successfully changed!",
        visible: true,
      });
    }
  };

  return (
    <Container
      className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
    >
      {alert.visible && (
        <CustomAlert
          variant={alert.variant}
          message={alert.message}
          onClose={() =>
            setAlert((prevAlert) => ({ ...prevAlert, visible: false }))
          }
        />
      )}
      <Row className="w-100 mx-0">
        <Col
          className={`${classes.header} p-0`}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <h1 className="py-3 text-center">Password reset</h1>
        </Col>
      </Row>
      <Row className="w-100 mx-0 bg-light py-3 d-flex justify-content-center">
        <Col
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className="d-flex justify-content-center flex-column"
        >
          {step === 1 && (
            <StepOne
              setEmail={setEmail}
              step={step}
              nextStep={nextStep}
              email={email}
            />
          )}
          {step === 2 && (
            <StepTwo
              setCode={setCode}
              code={code}
              step={step}
              nextStep={nextStep}
            />
          )}
          {step === 3 && !showConfirmation && (
            <>
              <h1>Reset your password</h1>
              <StepThree
                setPassword={setPassword}
                password={password}
                setConfirmPassword={setConfirmPassword}
                confirmPassword={confirmPassword}
                nextStep={nextStep}
              />
            </>
          )}
          {showConfirmation && (
            <>
              <h1 className="text-center">
                Your password has been successfully reset!
              </h1>
              <Button
                type="button"
                variant="primary"
                className={`${classes.grad} w-100 m-0 my-3`}
                onClick={() => navigate("/login")}
              >
                Go to login
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordReset;
