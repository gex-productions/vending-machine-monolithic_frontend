import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Container,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddDeposit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: undefined,
      fives: 0,
      tens: 0,
      twenties: 0,
      fifties: 0,
      hundreds: 0,
    };
    this.addDeposit = this.addDeposit.bind(this);
  }

  addDeposit(e) {
    e.preventDefault();
    this.props.addDeposit(this.state);
    this.props.toggle();
    console.log(this.state);
    this.setState({
      fives: 0,
      tens: 0,
      twenties: 0,
      fifties: 0,
      hundreds: 0,
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>Add Deposit</ModalHeader>
        <Container>
          <Form onSubmit={(e) => this.addDeposit(e)}>
            <ModalBody>
              Please add from the below denominations:
              <Container>
                <Row className="mt-2">
                  <Col className="pt-1 " xs={4}>
                    <Label className="text-center" for="fives">
                      5 Cents
                    </Label>
                  </Col>
                  <Col className="col-offset-1" xs={1}>
                    <Button
                      color="success"
                      onClick={() =>
                        this.setState({ fives: this.state.fives - 1 })
                      }
                      disabled={this.state.fives <= 0}
                      type="button"
                    >
                      <FontAwesomeIcon icon={"minus"} />
                    </Button>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                    <Input id="fives" value={this.state.fives} readOnly />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="success"
                      disabled={this.state.fives >= 10}
                      onClick={() =>
                        this.setState({ fives: this.state.fives + 1 })
                      }
                      type="button"
                    >
                      <FontAwesomeIcon icon={"plus"} />
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="pt-1 " xs={4}>
                    <Label className="text-center" for="tens">
                      10 Cents
                    </Label>
                  </Col>
                  <Col className="col-offset-1" xs={1}>
                    <Button
                      color="success"
                      onClick={() =>
                        this.setState({ tens: this.state.tens - 1 })
                      }
                      disabled={this.state.tens <= 0}
                      type="button"
                    >
                      <FontAwesomeIcon icon={"minus"} />
                    </Button>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                    <Input id="tens" value={this.state.tens} readOnly />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="success"
                      disabled={this.state.tens >= 10}
                      onClick={() =>
                        this.setState({ tens: this.state.tens + 1 })
                      }
                      type="button"
                    >
                      <FontAwesomeIcon icon={"plus"} />
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="pt-1 " xs={4}>
                    <Label className="text-center" for="twenties">
                      20 Cents
                    </Label>
                  </Col>
                  <Col className="col-offset-1" xs={1}>
                    <Button
                      color="success"
                      onClick={() =>
                        this.setState({ twenties: this.state.twenties - 1 })
                      }
                      disabled={this.state.twenties <= 0}
                      type="button"
                    >
                      <FontAwesomeIcon icon={"minus"} />
                    </Button>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                    <Input id="twenties" value={this.state.twenties} readOnly />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="success"
                      disabled={this.state.twenties >= 10}
                      onClick={() =>
                        this.setState({ twenties: this.state.twenties + 1 })
                      }
                      type="button"
                    >
                      <FontAwesomeIcon icon={"plus"} />
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="pt-1 " xs={4}>
                    <Label className="text-center" for="fifties">
                      50 Cents
                    </Label>
                  </Col>
                  <Col className="col-offset-1" xs={1}>
                    <Button
                      color="success"
                      onClick={() =>
                        this.setState({ tens: this.state.fifties - 1 })
                      }
                      disabled={this.state.fifties <= 0}
                      type="button"
                    >
                      <FontAwesomeIcon icon={"minus"} />
                    </Button>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                    <Input id="fifties" value={this.state.fifties} readOnly />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="success"
                      disabled={this.state.fifties >= 10}
                      onClick={() =>
                        this.setState({ fifties: this.state.fifties + 1 })
                      }
                      type="button"
                    >
                      <FontAwesomeIcon icon={"plus"} />
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="pt-1 " xs={4}>
                    <Label className="text-center" for="hundreds">
                      100 Cents
                    </Label>
                  </Col>
                  <Col className="col-offset-1" xs={1}>
                    <Button
                      color="success"
                      onClick={() =>
                        this.setState({ hundreds: this.state.hundreds - 1 })
                      }
                      disabled={this.state.hundreds <= 0}
                      type="button"
                    >
                      <FontAwesomeIcon icon={"minus"} />
                    </Button>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={2}>
                    <Input id="hundreds" value={this.state.hundreds} readOnly />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="success"
                      disabled={this.state.hundreds >= 10}
                      onClick={() =>
                        this.setState({ hundreds: this.state.hundreds + 1 })
                      }
                      type="button"
                    >
                      <FontAwesomeIcon icon={"plus"} />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button block color="primary">
                Add
              </Button>
            </ModalFooter>
          </Form>
        </Container>
      </Modal>
    );
  }
}

export default AddDeposit;
