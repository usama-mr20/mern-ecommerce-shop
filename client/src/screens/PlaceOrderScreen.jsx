import React from "react";
import CheckoutStepper from "../components/CheckoutStepper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AlertMessage from "../components/AlertMessage";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);

  const placeOrderHandler = () => {
    // dispatch(
    //   createOrder({
    //     orderItems: cart.cartItems,
    //     shippingAddress: cart.shippingAddress,
    //     paymentMethod: cart.paymentMethod,
    //     itemsPrice: cart.itemsPrice,
    //     shippingPrice: cart.shippingPrice,
    //     taxPrice: cart.taxPrice,
    //     totalPrice: cart.totalPrice,
    //   })
    // );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    linkBtn: {
      textDecoration: "none",
      color: "inherit",
    },
    klass: {
      border: "1px solid red",
    },
  }));

  const classes = useStyles();

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  return (
    <>
      <CheckoutStepper CurrentStep={3} />

      <div className='root'>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography component='h3' variant='h6'>
                  Shipping
                </Typography>
                <Typography component='p' variant='subtitle1'>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </Typography>
              </CardContent>

              <Divider />

              <CardContent>
                <Typography component='h3' variant='h6'>
                  Payment Method
                </Typography>
                <Typography component='p' variant='subtitle1'>
                  <strong>Method:</strong> {cart.paymentMethod}
                </Typography>
              </CardContent>

              <Divider />

              <CardContent>
                <Typography component='h3' variant='h6'>
                  Order Items
                </Typography>
                {cart.cartItems.length === 0 ? (
                  <AlertMessage variant='info'>Your cart is empty</AlertMessage>
                ) : (
                  <List component='nav' aria-label='order items'>
                    {cart.cartItems.map((item, index) => (
                      <Grid
                        container
                        justifyContent='space-between'
                        alignItems='center'
                        spacing={4}
                      >
                        <Grid item xs={8}>
                          <ListItem divider>
                            <ListItemAvatar>
                              <Avatar alt='products iamge' src={item.image} />
                            </ListItemAvatar>
                            <Link
                              to={`/product/${item.product}`}
                              className={classes.linkBtn}
                            >
                              <ListItemText primary={item.name} />
                            </Link>
                          </ListItem>
                        </Grid>

                        <Grid item xs={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Grid>
                      </Grid>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography
                  align='center'
                  component='h3'
                  variant='h6'
                  color='initial'
                >
                  ORDER SUMMARY
                </Typography>
                <br />
                <Divider />
                <br />
                <Grid container>
                  <Grid item xs={8}>
                    <Typography component='p' variant='subtitle1'>
                      Items
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    ${cart.itemsPrice}
                  </Grid>
                  <Grid item xs={8}>
                    <Typography component='p' variant='subtitle1'>
                      Shipping
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    ${cart.shippingPrice}
                  </Grid>
                  <Grid item xs={8}>
                    <Typography component='p' variant='subtitle1'>
                      Tax
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    ${cart.taxPrice}
                  </Grid>
                  <Grid item xs={8}>
                    <Typography component='p' variant='subtitle1'>
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    ${cart.totalPrice}
                  </Grid>
                  <Grid item xs={12}>
                    <br />

                    <Button
                      variant='contained'
                      fullWidth
                      color='primary'
                      onClick={placeOrderHandler}
                    >
                      Confirm Order
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default PlaceOrderScreen;
