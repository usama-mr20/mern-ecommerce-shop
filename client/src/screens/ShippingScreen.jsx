import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function ShippingScreen({ history }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ address, city, postalCode, country });
  };
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h5'>
        Shipping
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='Address'
              label='Address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='city'
              label='City'
              name='city'
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              typr='number'
              name='postal code'
              label='Postal Code'
              id='postalCode'
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='country'
              label='Country'
              id='country'
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />

        <Button type='submit' fullWidth variant='contained' color='primary'>
          Submit{" "}
        </Button>
      </form>
    </Container>
  );
}

export default ShippingScreen;
