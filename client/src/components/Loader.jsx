import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = ({ size }) => {
  return (
    <CircularProgress
      size={size}
      style={{ margin: "auto", display: "block" }}
    />
  );
};

Loader.defaultProps = {
  size: 75,
};

export default Loader;
