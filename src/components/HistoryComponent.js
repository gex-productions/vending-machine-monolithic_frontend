import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Spinner, Alert, Table } from "reactstrap";
import { getEventsAPI } from "../services/EventService";
import { JsonParser } from "jackson-js";

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
      break;
    case "ADD_PRODUCT":
      const name = new JsonParser().parse(ev.data).product.name;
      const amount_available = new JsonParser().parse(ev.data).product
        .amount_available;
      const cost = (new JsonParser().parse(ev.data).product.cost / 100).toFixed(
        2
      );
      info = (
        <p>
          Product Added: <br />
          <u>Name:</u> {name} <br />
          <u>Amount:</u> {amount_available} <br />
          <u>Cost:</u> ${cost} <br />
        </p>
      );
      break;
    case "EDIT_PRODUCT":
      const new_amount_available = new JsonParser().parse(
        ev.data
      ).amount_available;
      const new_cost = (new JsonParser().parse(ev.data).cost / 100).toFixed(2);
      info = (
        <p>
          Product Updated: <br />
          <u>Amount:</u> {new_amount_available} <br />
          <u>Cost:</u> ${new_cost} <br />
        </p>
      );
      break;
    case "DELETE_PRODUCT":
      info = (
        <p>
          <u>Product Deleted:</u> {ev.data}
        </p>
      );
    default:
  }
  return info;
}

export default function History() {
  const auth = localStorage.getItem("auth");
  const isBuyer = localStorage.getItem("role") === "BUYER";
  const [events, setEvents] = useState();

  useEffect(() => {
    getEventsAPI(auth).then((response) => setEvents(response.data.events));
  }, [auth]);

  var history;
  if (events !== undefined) {
    var id = 1;
    history = events.map((ev) => {
      var current_deposit = null;
      if (isBuyer && ev.success)
        current_deposit =
          ev.event_type === "RESET"
            ? (new JsonParser().parse(ev.data).new_deposit / 100).toFixed(2)
            : (new JsonParser().parse(ev.data).new_total_deposit / 100).toFixed(
                2
              );
      const info = ev.success ? eventParser(ev) : "";
      return (
        <tr key={id++}>
          <td>{ev.event_type}</td>
          <td>{ev.timestamp}</td>
          <td>{ev.success ? "Yes" : "No"}</td>
          <td>{ev.success ? info : ev.error}</td>
          {isBuyer && <td>{ev.success ? "$" + current_deposit : null} </td>}
        </tr>
      );
    });
  }
  return (
    <Container className="main-jumbotron pt-3">
      <div>
        <h2>Transaction History</h2>
        <hr />
        <Row>
          <Col xs={12} md={9}>
            {history ? (
              <div id="history-table">
                <Table bordered className="fixed-header table-striped">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Time</th>
                      <th>Success</th>
                      <th>Information</th>
                      {isBuyer && <th>Deposit</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {events?.length > 0 ? (
                      history
                    ) : (
                      <tr>
                        <td colSpan={5}>No records to show</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Spinner type="grow" color="success" />
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
