import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Grid container spacing={3} justifyContent='center'>
          {products.map((product) => (
            <Grid item key={product._id} sm={6} md={4} lg={4} xl={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
export default HomeScreen;
