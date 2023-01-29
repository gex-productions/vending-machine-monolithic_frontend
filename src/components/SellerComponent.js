import React, { useState, useEffect } from "react";
import { addProductAPI, getOwnedProductsAPI } from "../services/ProductService";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Spinner,
  Col,
  Row,
  Container,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProduct from "./modals/AddProductComponent";
import SellerProductCard from "./SellerProductCardComponent";

function toggleAdd(showAdd, setShowAdd) {
  setShowAdd(!showAdd);
}

function addProduct(body, setData, setShowError) {
  const auth = localStorage.getItem("auth");
  addProductAPI(auth, body).then((response) => {
    if (response === 201) {
      setShowError(false);
      getOwnedProductsAPI(auth).then((response) => setData(response.data));
    } else {
      setShowError(true);
    }
  });
}

function Seller() {
  const auth = localStorage.getItem("auth");
  const [data, setData] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(0);
  const [showDelete, setShowDelete] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getOwnedProductsAPI(auth).then((response) => setData(response.data));
  }, [auth]);

  if (!data) {
    return (
      <Container className="main-jumbotron pt-3 d-flex justify-content-center">
        <Spinner type="grow" color="success" />
      </Container>
    );
  } else {
    const products = data.products.map((product) => {
      return (
        <Col className="mb-3" key={product.id} sm="12" md="6" lg="4">
          <SellerProductCard
            product={product}
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            setData={setData}
            setShowError={setShowError}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        </Col>
      );
    });
    return (
      <Container className="main-jumbotron pt-3">
        <div>
          <h2>
            Your Products{" "}
            <Button onClick={() => setShowAdd(true)} color="success">
              <FontAwesomeIcon icon="plus" size="lg" />
              Add Product
            </Button>
          </h2>

          <hr />
          <Row>{products}</Row>
          <AddProduct
            isOpen={showAdd}
            toggle={() => toggleAdd(showAdd, setShowAdd)}
            addProduct={(body) => addProduct(body, setData, setShowError)}
          />
        </div>
      </Container>
    );
  }
}

export default Seller;
