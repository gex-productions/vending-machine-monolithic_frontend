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
} from "reactstrap";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      amount_available: undefined,
      cost: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.addProduct(JSON.stringify(this.state));
    this.props.toggle();
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>
          Add Product Details
        </ModalHeader>
        <Form method="post" onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Product Name"
                onChange={(e) => this.setState({ name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount_available">Product Amount</Label>
              <Input
                id="amount_available"
                name="amount_available"
                type="number"
                placeholder="Product Amount"
                onChange={(e) =>
                  this.setState({ amount_available: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="cost">Product Cost &#40;in Cents&#41;</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                placeholder="Product Cost"
                onChange={(e) => this.setState({ cost: e.target.value })}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button block type="submit" color="primary">
              Add Product
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default AddProduct;
