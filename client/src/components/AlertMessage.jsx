import React from "react";
import Alert from "@material-ui/lab/Alert";

const AlertMessage = ({ type, variant, children }) => {
  return (
    <Alert variant={type} severity={variant}>
      {children}
    </Alert>
  );
};

AlertMessage.defaultProps = {
  severity: "info",
};
export default AlertMessage;
