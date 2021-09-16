import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@material-ui/core/Container";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./screens/ProductDetails";

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
          </Switch>
        </main>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
