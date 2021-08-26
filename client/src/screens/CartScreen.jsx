import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { addToCart } from "../actions/cartActions";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const CartScreen = ({ history, location, match }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeItemHandler = (id) => {
    console.log(id + "removed");
  };
  return (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <Typography variant='h4' color='initial'>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <AlertMessage variant='info'>
            Your cart is empty &nbsp;
            <strong>
              <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
                Go Back
              </Link>
            </strong>
          </AlertMessage>
        ) : (
          <List component='nav'>
            {cartItems.map((item) => {
              return (
                <div key={item.product}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={item.image} />
                    </ListItemAvatar>
                    <Grid item md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {item.name}
                      </Link>
                    </Grid>
                    <Grid item md={2}>
                      ${item.price}
                    </Grid>
                    <Grid item md={2}>
                      <FormControl>
                        <InputLabel htmlFor='qty-select-native'>Qty</InputLabel>
                        <NativeSelect
                          id='qty-select-native'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid item md={2}>
                      <IconButton
                        aria-label='remove-item'
                        onClick={() => removeItemHandler(item.product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </Grid>
      {/* // */}
      <Grid item md={2}></Grid>
      {/* // */}
      <Grid item md={2}></Grid>
    </Grid>
  );
};

export default CartScreen;
