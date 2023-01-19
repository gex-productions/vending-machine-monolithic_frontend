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

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount_available: props.product.amount_available,
      cost: props.product.cost,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.editProduct(JSON.stringify(this.state));
    this.props.toggle();
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.product.name}
        </ModalHeader>
        <Form method="post" onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="amount_available">Product Amount</Label>
              <Input
                id="amount_available"
                name="amount_available"
                type="number"
                value={this.state.amount_available}
                placeholder="Product Amount"
                onChange={(e) =>
                  this.setState({ amount_available: parseInt(e.target.value) })
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
                value={this.state.cost}
                placeholder="Product Cost"
                onChange={(e) =>
                  this.setState({ cost: parseInt(e.target.value) })
                }
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button block type="submit" color="primary">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default EditProduct;
