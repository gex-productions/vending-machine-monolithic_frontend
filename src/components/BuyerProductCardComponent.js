import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Input, Row } from "reactstrap";
import { getAvailableProductsAPI } from "../services/ProductService";
import { buyAPI } from "../services/UserService";
import BuyProduct from "./modals/BuyProductComponent";

function buyProduct(
  id,
  amount,
  setAmount,
  setData,
  setError,
  setDeposit,
  setSuccess
) {
  const auth = localStorage.getItem("auth");
  const body = {
    product_id: id,
    amount: amount,
  };
  buyAPI(auth, JSON.stringify(body)).then((response) => {
    console.log(response);
    if (response.data !== undefined && response.data !== null) {
      setError(undefined);
      console.log(response.data.new_total_deposit);
      setDeposit(response.data.new_total_deposit);
      getAvailableProductsAPI(auth).then((response) => setData(response.data));
      setAmount(0);
      setSuccess(response.data);
    } else {
      if (response === 503) setError("Server is down. Please try again later.");
      if (response.message) setError(response.message);
      else setError(response.error);
    }
  });
}

export default function BuyerProductCard({
  product,
  setData,
  setError,
  setDeposit,
  setSuccess,
}) {
  const [amount, setAmount] = useState(0);
  const [showBuy, setShowBuy] = useState(false);
  const toggle = () => setShowBuy(!showBuy);
  const cost_value = (product.cost / 100).toFixed(2);
  return (
    <Card>
      <CardTitle heading="true">{product.name}</CardTitle>
      <CardBody>
        <h2>Cost: ${cost_value}</h2>
        <Row>
          <Col>
            <Button
              disabled={amount === 0}
              onClick={() => setShowBuy(true)}
              color="primary"
            >
              Buy
            </Button>
          </Col>
          <Col></Col>
          <Col>
            <Button
              onClick={() => setAmount(amount - 1)}
              disabled={amount === 0}
              color="success"
            >
              <FontAwesomeIcon icon="minus" />
            </Button>
          </Col>
          <Col>
            <Input value={amount} readOnly />
          </Col>
          <Col>
            <Button
              onClick={() => setAmount(amount + 1)}
              disabled={amount >= product.amount_available}
              color="success"
            >
              <FontAwesomeIcon icon="plus" />
            </Button>
          </Col>
        </Row>
        <BuyProduct
          productName={product.name}
          isOpen={showBuy}
          toggle={toggle}
          amount={amount}
          buyProduct={() =>
            buyProduct(
              product.id,
              amount,
              setAmount,
              setData,
              setError,
              setDeposit,
              setSuccess
            )
          }
        />
      </CardBody>
    </Card>
  );
}
