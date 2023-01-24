import React, { useState, useEffect } from "react";
import { addDepositAPI, resetDepositAPI } from "../services/UserService";
import { Row, Col, Container, Button, Spinner, Alert, Table } from "reactstrap";
import ResetDeposit from "./modals/ResetDepositComponent";
import AddDeposit from "./modals/AddDepositComponent";
import { getEventsAPI } from "../services/EventService";
import { JsonParser } from "jackson-js";

function addDeposit(body, setDeposit, setDepositError) {
  const auth = localStorage.getItem("auth");
  addDepositAPI(auth, JSON.stringify(body)).then((response) => {
    if (response.data === undefined) {
      setDepositError(true);
    } else {
      setDeposit(response.data.new_total_deposit);
      setDepositError(false);
    }
  });
}

function resetDeposit(setDeposit, setDepositError) {
  const auth = localStorage.getItem("auth");
  resetDepositAPI(auth).then((response) => {
    if (response.data === undefined) {
      setDepositError(true);
    } else {
      setDeposit(response.data.new_deposit);
      setDepositError(false);
    }
  });
}

function toggleReset(showReset, setShowReset) {
  setShowReset(!showReset);
}

function toggleAdd(showAdd, setShowAdd) {
  setShowAdd(!showAdd);
}

function eventParser(ev) {
  var info = "";

  switch (ev.event_type) {
    case "BUY":
      const product = new JsonParser().parse(ev.data).product_name;
      const amount = new JsonParser().parse(ev.data).product_amount;
      const price = (
        new JsonParser().parse(ev.data).total_spent /
        new JsonParser().parse(ev.data).product_amount /
        100
      ).toFixed(2);
      const change_5 =
        new JsonParser().parse(ev.data).change["5"].toFixed(0) + "x 5¢";
      const change_10 =
        new JsonParser().parse(ev.data).change["10"].toFixed(0) + "x 10¢";
      const change_20 =
        new JsonParser().parse(ev.data).change["20"].toFixed(0) + "x 20¢";
      const change_50 =
        new JsonParser().parse(ev.data).change["50"].toFixed(0) + "x 50¢";
      const change_100 =
        new JsonParser().parse(ev.data).change["100"].toFixed(0) + "x $1";
      const change =
        "Change: " +
        change_5 +
        ", " +
        change_10 +
        ", " +
        change_20 +
        ", " +
        change_50 +
        ", " +
        change_100;
      info = (
        <p>
          <u>Product:</u> {product} <br />
          <u>Amount:</u> {amount} <br />
          <u>Price:</u> {price} <br />
          <u>Change:</u> {change}
        </p>
      );
      break;
    case "DEPOSIT":
      const fives = new JsonParser()
        .parse(ev.data)
        .denominations_added["5 cents"].toFixed(0);
      const tens = new JsonParser()
        .parse(ev.data)
        .denominations_added["10 cents"].toFixed(0);
      const twenties = new JsonParser()
        .parse(ev.data)
        .denominations_added["20 cents"].toFixed(0);
      const fifties = new JsonParser()
        .parse(ev.data)
        .denominations_added["50 cents"].toFixed(0);
      const hundreds = new JsonParser()
        .parse(ev.data)
        .denominations_added["100 cents"].toFixed(0);
      info = (
        <p>
          Denominations added: <br />
          <u>5¢:</u> {fives}
          <br />
          <u>10¢:</u> {tens}
          <br />
          <u>20¢:</u> {twenties}
          <br />
          <u>50¢:</u> {fifties}
          <br />
          <u>$100:</u> {hundreds}
        </p>
      );
      console.log(info);
      break;
    default:
  }
  return info;
}

function Deposit({ deposit, setDeposit }) {
  const auth = localStorage.getItem("auth");
  const [showReset, setShowReset] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [depositError, setDepositError] = useState(false);

  var deposit_value;
  if (deposit === undefined) {
    return (
      <Container className="main-jumbotron pt-3 d-flex justify-content-center">
        <Spinner type="grow" color="success" />
      </Container>
    );
  }
  deposit_value = (deposit / 100).toFixed(2);
  return (
    <Container className="main-jumbotron pt-3">
      <div>
        <h2>Deposit</h2>
        <hr />
        <h3>Dashboard</h3>
        <Row>
          <Col md={2} xs={6}>
            Your Deposit:
          </Col>
          <Col md={2} xs={6}>
            <strong>${deposit_value}</strong>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={2} xs={6}>
            <Button onClick={() => setShowAdd(true)} color="primary">
              Deposit
            </Button>
            <AddDeposit
              isOpen={showAdd}
              toggle={() => toggleAdd(showAdd, setShowAdd)}
              addDeposit={(body) =>
                addDeposit(body, setDeposit, setDepositError)
              }
            />
          </Col>
          <Col md={2} xs={6}>
            <Button onClick={() => setShowReset(true)} color="danger">
              Reset
            </Button>
            <ResetDeposit
              isOpen={showReset}
              toggle={() => toggleReset(showReset, setShowReset)}
              resetDeposit={() => resetDeposit(setDeposit, setDepositError)}
            />
          </Col>
        </Row>
        <Row>
          {depositError && (
            <Alert className="alert-danger" toggle={setDepositError(false)}>
              Server is down. Please try again later.
            </Alert>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Deposit;
