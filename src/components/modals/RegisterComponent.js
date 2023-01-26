import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  FormFeedback,
} from "reactstrap";
import { registerAPI } from "../../services/UserService";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
      confirm: undefined,
      role: "BUYER",
      message: undefined,
      success: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.props.toggle.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirm) return;
    const body = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };
    registerAPI(JSON.stringify(body)).then((response) => {
      switch (response) {
        case 201:
          this.setState({
            message: "User created successfully. Please try to login now.",
            success: true,
          });
          break;
        case 409:
          this.setState({
            message: "User already exists. Please try another username.",
            success: false,
          });
          break;
        default:
          this.setState({
            message: "Server is down. Please try again later.",
            success: false,
          });
      }
    });
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <Form method="post" onSubmit={this.handleSubmit}>
          <ModalBody>
            {this.state.message && (
              <Alert
                className={`alert-${this.state.success ? "success" : "danger"}`}
                toggle={() => this.setState({ message: undefined })}
              >
                {this.state.message}
              </Alert>
            )}
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="username"
                onChange={(e) => this.setState({ username: e.target.value })}
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
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => this.setState({ confirm: e.target.value })}
                invalid={this.state.password !== this.state.confirm}
                required
              />
              <FormFeedback>Passwords do not match</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                id="role"
                name="role"
                type="select"
                defaultChecked="BUYER"
                onChange={(e) => this.setState({ role: e.target.value })}
              >
                <option value="BUYER">Buyer</option>
                <option value="SELLER">Seller</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button block type="submit" color="primary">
              Register
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default Register;
