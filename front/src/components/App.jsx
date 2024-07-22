import React from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Main from "../components/Main";
import Profile from "../components/Profile";
import PropTypes from "prop-types";
import "../styles/App.css";
import "../styles/index.css";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <section>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/main" element={<PrivateRoute element={<Main />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            </Routes>
          </section>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);

