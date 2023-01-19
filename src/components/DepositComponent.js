import React, { useState, useEffect } from "react";
import { addDepositAPI, resetDepositAPI } from "../services/UserService";
import { Row, Col, Container, Button, Spinner, Alert } from "reactstrap";
import ResetDeposit from "./modals/ResetDepositComponent";
import AddDeposit from "./modals/AddDepositComponent";

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

function Deposit({ deposit, setDeposit, depositError, setDepositError }) {
  const auth = localStorage.getItem("auth");
  const [showReset, setShowReset] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    addDepositAPI(auth, JSON.stringify({})).then((response) =>
      setDeposit(response.data.new_total_deposit)
    );
  }, [auth, setDeposit]);

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
    <Container className="main-jumbotron">
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
              toggle={() => toggleAdd({ showAdd, setShowAdd })}
              addDeposit={(body) =>
                addDeposit({ body, setDeposit, setDepositError })
              }
            />
          </Col>
          <Col md={2} xs={6}>
            <Button onClick={() => setShowReset(true)} color="danger">
              Reset
            </Button>
            <ResetDeposit
              isOpen={showReset}
              toggle={() => toggleReset({ showReset, setShowReset })}
              resetDeposit={() => resetDeposit({ setDeposit, setDepositError })}
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
        <br />
        <h3>Transaction History</h3>
      </div>
    </Container>
  );
}

export default Deposit;
