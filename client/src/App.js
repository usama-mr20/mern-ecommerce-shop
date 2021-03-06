import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@material-ui/core/Container";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./screens/ProductDetails";
import UserProfileScreen from "./screens/UserProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container maxWidth='lg'>
        <main style={{ marginTop: "80px", minHeight: "80vh" }}>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/product/:id' component={ProductDetails} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={UserProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
          </Switch>
        </main>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
