import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewButton from "./ReviewButton";

function DeliveredOrder({ orderData }) {
  const [orderProducts, setOrderProducts] = useState([]);

  const productCollection = orderProducts
    .filter((orderProduct) => orderProduct?._id == orderData?.orderId)
    .at(0)?.orderedProducts;

  function fetchData() {
    fetch(`${process.env.REACT_APP_API_URL}/orders/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderProducts(data);
      });
  }

  console.log(productCollection);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="order-card p-4">
        <Container>
          <h5>Order ID: {orderData.orderId} </h5>
          <h5>Status: {orderData.status} </h5>
          <Row>
            <Col>
              {productCollection?.map((product) => (
                <div>
                  <img
                    className="mini-order-image"
                    src={product.imgLink}
                    alt={product.name}
                  />
                  <ReviewButton
                    productId={product.productId}
                    orderData={orderData}
                  />
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DeliveredOrder;
