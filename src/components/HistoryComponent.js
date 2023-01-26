import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner, Table } from "reactstrap";
import { getEventsAPI, eventParser } from "../services/EventService";
import { JsonParser } from "jackson-js";

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
