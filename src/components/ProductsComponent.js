import React, { useState, useEffect } from "react";
import { getAvailableProductsAPI } from "../services/ProductService";
import { Spinner, Col, Row, Container, Alert, Label } from "reactstrap";
import Purchase from "./modals/PurchaseComponent";
import BuyerProductCard from "./BuyerProductCardComponent";

function Products({ setDeposit }) {
  const auth = localStorage.getItem("auth");
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  useEffect(() => {
    getAvailableProductsAPI(auth).then((response) => setData(response.data));
  }, [auth]);
  const products =
    data?.products.length === 0 ? (
      <Label>There are no available products currently.</Label>
    ) : (
      data?.products.map((product) => {
        return (
          <Col className="mb-3" key={product.id} sm="12" md="6" lg="4">
            <BuyerProductCard
              product={product}
              setData={setData}
              setError={setError}
              setDeposit={setDeposit}
              setSuccess={setSuccess}
            />
          </Col>
        );
      })
    );
  return (
    <Container className="main-jumbotron pt-3">
      <div>
        {error && (
          <Alert className="alert-danger" toggle={() => setError(undefined)}>
            {error}
          </Alert>
        )}
        <h2>Products</h2>
        <hr />
        <Row>{data ? products : <Spinner type="grow" color="success" />}</Row>
      </div>
      <Purchase data={success} />
    </Container>
  );
}

export default Products;
