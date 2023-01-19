import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ResetDeposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: undefined,
    };
    this.resetDeposit = this.resetDeposit.bind(this);
  }

  resetDeposit() {
    this.props.resetDeposit();
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>Reset Deposit</ModalHeader>
        <ModalBody>Are you sure you want to reset your Deposit?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.resetDeposit}>
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

export default ResetDeposit;
