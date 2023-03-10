import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import { Routes, Route, Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import React, { Fragment } from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:key" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/me/update"
          element={isAuthenticated && <UpdateProfile />}
        />
        <Route
          path="/password/update"
          element={isAuthenticated && <UpdatePassword />}
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
