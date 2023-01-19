import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import {
  deleteProductAPI,
  getOwnedProductsAPI,
  updateProductAPI,
} from "../services/ProductService";
import DeleteProduct from "./modals/DeleteProductComponent";
import EditProduct from "./modals/EditProductComponent";

function editProduct(id, body, setData, setShowError) {
  const auth = localStorage.getItem("auth");
  updateProductAPI(auth, id, body).then((response) => {
    if (response === 200) {
      setShowError(false);
      getOwnedProductsAPI(auth).then((response) => setData(response.data));
    } else {
      setShowError(true);
    }
  });
}

function deleteProduct(id, setData, setShowError) {
  const auth = localStorage.getItem("auth");
  deleteProductAPI(auth, id).then((response) => {
    if (response === 204) {
      setShowError(false);
      getOwnedProductsAPI(auth).then((response) => setData(response.data));
    } else {
      setShowError(true);
    }
  });
}

export default function SellerProductCard({
  product,
  showDelete,
  setShowDelete,
  showEdit,
  setShowEdit,
  setData,
  setShowError,
}) {
  const cost_value = (product.cost / 100).toFixed(2);
  return (
    <Card>
      <CardTitle heading="true">{product.name}</CardTitle>
      <CardBody>
        <div>
          <h3>Cost: ${cost_value}</h3>
          <h3>Available amount: {product.amount_available}</h3>
          <Row>
            <Col xs={2}>
              <Button onClick={() => setShowEdit(product.id)} color="primary">
                <FontAwesomeIcon icon="edit" />
              </Button>
            </Col>
            <Col xs={2}>
              <Button onClick={() => setShowDelete(product.id)} color="danger">
                <FontAwesomeIcon icon="trash" />
              </Button>
            </Col>
          </Row>
          <DeleteProduct
            productName={product.name}
            isOpen={showDelete === product.id}
            toggle={() => setShowDelete(0)}
            deleteProduct={() =>
              deleteProduct(product.id, setData, setShowError)
            }
          />
          <EditProduct
            product={product}
            isOpen={showEdit === product.id}
            toggle={() => setShowEdit(0)}
            editProduct={(body) =>
              editProduct(product.id, body, setData, setShowError)
            }
          />
        </div>
      </CardBody>
    </Card>
  );
}
