import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class BuyProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount,
      success: undefined,
    };
    this.buyProduct = this.buyProduct.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) {
      this.setState({
        amount: this.props.amount,
      });
    }
  }

  buyProduct() {
    this.props.buyProduct();
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>Buy Product</ModalHeader>
        <ModalBody>
          Are you sure you want to buy "{this.props.productName}" with amount of{" "}
          {this.state.amount}
          {}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.buyProduct}>
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

export default BuyProduct;
