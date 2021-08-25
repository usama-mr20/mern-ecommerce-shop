import React from "react";
import Alert from "@material-ui/lab/Alert";

const AlertMessage = ({ variant, children }) => {
  return <Alert severity={variant}>{children}</Alert>;
};

AlertMessage.defaultProps = {
  severity: "info",
};
export default AlertMessage;
