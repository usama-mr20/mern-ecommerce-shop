import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => {
  return (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    axios
      .get("/api/products")
      .then((response) => {
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.response,
        });
      });
  };
};
