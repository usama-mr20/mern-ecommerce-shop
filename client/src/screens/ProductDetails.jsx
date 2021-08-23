import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/${match.params.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:" + error.message);
      });
  }, [match]);

  return (
    <>
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

          <Button
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
    </>
  );
};

export default ProductDetails;
