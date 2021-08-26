import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from "@material-ui/core/Typography";

const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant={"error"}>{error}</AlertMessage>
      ) : (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "80%" }}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={3}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Typography variant='body2' color='initial'>
              Status: {product.countInStock > 0 ? "In-Stock" : "Out of stock"}
            </Typography>
            <br />
            <Rating
              size='small'
              readOnly
              value={product.rating}
              precision={0.5}
            />
            <span>{product.numReviews} reviews</span>
            <h2>Price: ${product.price}</h2>
          </Grid>
          <Grid item xs={12} md={3}>
            <br />
            <br />
            {product.countInStock > 0 && (
              <FormControl>
                <InputLabel htmlFor='qty-select-native'>Qty</InputLabel>
                <NativeSelect
                  id='qty-select-native'
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )}

            <Button
              onClick={addToCartHandler}
              variant='contained'
              color='primary'
              fullWidth
              disabled={product.countInStock === 0}
            >
              ADD TO CART
            </Button>
            <br />
            <br />

            <Button
              variant='contained'
              color='primary'
              fullWidth
              disabled={product.countInStock === 0}
            >
              BUY
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductDetails;
