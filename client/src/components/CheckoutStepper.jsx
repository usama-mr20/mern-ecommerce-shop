import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
const CheckoutStepper = (props) => {
  return (
    <>
      <Stepper alternativeLabel activeStep={props.CurrentStep}>
        <Step>
          <StepLabel>Sign In</StepLabel>
        </Step>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
        <Step>
          <StepLabel>Place Order</StepLabel>
        </Step>
      </Stepper>
    </>
  );
};

export default CheckoutStepper;
