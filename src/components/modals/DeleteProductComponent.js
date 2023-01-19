import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: undefined,
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct() {
    this.props.deleteProduct();
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>Delete Product</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{this.props.productName}"?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteProduct}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteProduct;
