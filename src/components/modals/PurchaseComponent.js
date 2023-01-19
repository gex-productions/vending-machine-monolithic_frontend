import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

export default function Purchase({ data }) {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState();
  useEffect(() => {
    setModal(data !== undefined);
    setInfo(data);
  }, [data]);
  var deposit_value;
  if (info) deposit_value = (info.new_total_deposit / 100).toFixed(2);
  else deposit_value = (0).toFixed(2);
  return (
    <Modal isOpen={modal} toggle={() => setModal(!modal)}>
      <ModalHeader>
        Product{info?.product_amount > 1 ? "s " : " "} Purchased{" "}
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            Product{info?.product_amount > 1 ? "s " : " "} purchased
            successfully. Please find below your change based on available
            denominations.
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Denominations</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>5 Cents</th>
                  <td>{info?.change[5]}</td>
                </tr>
                <tr>
                  <th>10 Cents</th>
                  <td>{info?.change[10]}</td>
                </tr>
                <tr>
                  <th>20 Cents</th>
                  <td>{info?.change[20]}</td>
                </tr>
                <tr>
                  <th>50 Cents</th>
                  <td>{info?.change[50]}</td>
                </tr>
                <tr>
                  <th>100 Cents</th>
                  <td>{info?.change[100]}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <p>
              Your total deposit now is <strong>${deposit_value}</strong>.
            </p>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button block onClick={() => setModal(!modal)} color="primary">
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}
