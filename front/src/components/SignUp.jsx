import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../actions";
import companyLogo from "../assets/icon.png";
import "../styles/SignUp.css";
import withNavigation from "./Nav";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

class SignUp extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    error: "",
  };

  authenticate = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName, password } = this.state;

    if (!email || !password || !firstName || !lastName) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    try {
      const success = await this.props.signUp(email, firstName, lastName, password);
      if (success) {
        this.props.navigate('/main');
      } else {
        this.setState({ error: 'Sign up failed, check your email address' });
      }
    } catch (error) {
      this.setState({ error: error.message });
      console.error('Error during signup:', error);
    }
  };

  render() {
    const { email, firstName, lastName, password, error } = this.state;
    return (
      <div>
        <div className="logo">
          <img src={companyLogo} alt="Company Logo" />
        </div>
        <div className="form signup-form">
          <h2>Sign Up</h2>
          Already registered? <Link to="/">Sign In</Link>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={this.authenticate} className="signup">
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
            <div className="inlineInputs">
              <FormLabel className="label" style={{ width: "48%" }}>
                First Name*
                <Input
                  className="input"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
              </FormLabel>
              <FormLabel className="label" style={{ width: "48%" }}>
                Last Name*
                <Input
                  className="input"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
              </FormLabel>
            </div>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// export default connect(
//   (state) => ({ isLoggedIn: state.auth.isLoggedIn }),
//   { signUp }
// )(withNavigation(SignUp));

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignUp));
