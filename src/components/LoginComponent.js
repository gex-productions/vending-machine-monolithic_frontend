import React from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { loginAPI } from "../services/UserService";
import Register from "./modals/RegisterComponent";
import PropTypes from "prop-types";
import Footer from "./FooterComponent";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      loginFail: false,
      loginError: undefined,
      modal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const encodedString = btoa(this.state.username + ":" + this.state.password);
    const auth = "Basic " + encodedString;
    loginAPI(auth).then((response) => {
      if (response.message !== undefined) {
        localStorage.setItem("role", response.message);
        localStorage.setItem("auth", auth);
        this.props.setAuth(auth);
        if (response.message === "BUYER")
          this.props.setDeposit(response.data.deposit);
      } else {
        var message;
        if (response === 401) {
          message = "Invalid Credentials. Please check and try again.";
        } else {
          message = "Server is down. Please try again later.";
        }
        this.setState({
          loginFail: true,
          loginError: message,
        });
      }
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <>
        <div className="App-header">
          <div className="container">
            <div className="container bg-purple border rounded p-3 mt-4 col-md-4">
              <div>
                <h3 className="text-center">Login</h3>
              </div>
              <Form method="post" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="username"
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                  />
                </FormGroup>
                <Button block type="submit" color="primary">
                  Login
                </Button>
                <Button
                  className="mt-2"
                  block
                  onClick={this.toggle}
                  type="button"
                  color="success"
                >
                  Register
                </Button>
              </Form>
              <Register isOpen={this.state.modal} toggle={this.toggle} />
            </div>
            {this.state.loginFail && (
              <Alert
                className="alert-danger"
                toggle={() =>
                  this.setState({
                    loginFail: false,
                  })
                }
              >
                {this.state.loginError}
              </Alert>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Login;
