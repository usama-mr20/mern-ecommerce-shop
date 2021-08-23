import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Product from "../components/Product";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:" + error.message);
      });
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Grid container spacing={3} justifyContent='center'>
        {products.map((product) => (
          <Grid item key={product._id} sm={6} md={4} lg={4} xl={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default HomeScreen;
