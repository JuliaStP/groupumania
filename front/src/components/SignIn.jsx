import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../actions";
import withNavigation from "./Nav";
import companyLogo from "../assets/icon.png";
import "../styles/SignIn.css";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  authenticate = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Email and password are required' });
      return;
    }

    try {
      const success = await this.props.signIn(email, password);
      if (success) {
        this.props.navigate('/main');
      } else {
        this.setState({ error: 'Login failed' });
      }
    } catch (error) {
      this.setState({ error: error.message });
      console.error('Error during signin:', error);
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <div className="logo">
          <img src={companyLogo} alt="Company Logo" />
        </div>
        <div className="form login-form">
          {this.props.isLoggedIn ? "You are logged in" : "You are not logged in"}
          <h2>Sign In</h2>
          New User? <Link to="/signup">Sign Up</Link>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={this.authenticate} className="login">
            <FormLabel className="label">
              Email*
              <Input
                className="input"
                type="text"
                name="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </FormLabel>
            <FormLabel className="label">
              Password*
              <Input
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormLabel>
            <button type="submit" className="button btn-front">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignIn));
