import CheckoutStepper from "../components/CheckoutStepper";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <>
      <CheckoutStepper CurrentStep={2} />
      <Container component='main' maxWidth='xs'>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align='center' component='h1' variant='h5'>
                Payment Method
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <RadioGroup
                aria-label='PaymentMethod'
                name='PaymentMethod'
                value={paymentMethod}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='PayPal'
                  control={<Radio />}
                  label='PayPal'
                />
                {/* <FormControlLabel
                  value='Stripe'
                  control={<Radio />}
                  label='Stripe'
                /> */}
              </RadioGroup>
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <br />

          <Button type='submit' fullWidth variant='contained' color='primary'>
            Proceed
          </Button>
        </form>
      </Container>
    </>
  );
};

export default PaymentScreen;
