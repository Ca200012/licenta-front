import React from "react";
import { Alert } from "react-bootstrap";

function CustomAlert({ variant, message, onClose }) {
  return (
    <Alert
      variant={variant}
      dismissible
      onClose={onClose}
      className="position-absolute server_alert"
    >
      {message}
    </Alert>
  );
}

export default CustomAlert;
