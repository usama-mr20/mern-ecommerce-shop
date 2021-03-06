import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Product from "../components/Product";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { listProducts } from "../actions/productActions";
import Typography from "@material-ui/core/Typography";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
      <Typography
        variant='h4'
        color='initial'
        style={{ paddingTop: "5px", paddingBottom: "25px" }}
      >
        Latest Products
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant={"error"}>Error fetching products</AlertMessage>
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
