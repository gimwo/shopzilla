import { Row, Col } from "react-bootstrap";

function OrderItem({ productData }) {
  console.log(productData.orderedProducts);
  return (
    <Row className="d-flex align-items-center">
      <Col>
        <img className="order-image" src={productData.imgLink} />
      </Col>
      <Col md={8}>
        <h4>{productData.name} </h4>
        <h6>Quantity: {productData.quantity} x</h6>
        <h6>
          Subtotal price: P{" "}
          {productData.price?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h6>
      </Col>
    </Row>
  );
}

export default OrderItem;
