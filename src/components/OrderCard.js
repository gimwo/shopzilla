import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderItem from "./OrderItem";
import UserContext from "../UserContext";

function OrderCard({ orderData }) {
  const { user } = useContext(UserContext);
  const [orderProducts, setOrderProducts] = useState([]);

  const productCollection = orderProducts
    ?.filter((orderProduct) => orderProduct?._id == orderData?.orderId)
    .at(0)?.orderedProducts;

  const totalPrice = orderProducts
    ?.filter((orderProduct) => orderProduct?._id == orderData?.orderId)
    .at(0)?.totalAmount;

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="order-card p-4 ">
        <Container>
          <Row className="justify-content-around">
            <Col md={8} className="d-flex">
              <h5>Order ID: {orderData.orderId} </h5>
              <h5>Date: {orderData.dateOrdered} </h5>
              <h5>
                Status: <em>{orderData.status}</em>
              </h5>
            </Col>
            <Col>
              <h2>
                PhP{" "}
                {totalPrice?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h2>

              <span>*calculated VAT included</span>
            </Col>
          </Row>
        </Container>
        <hr />
        <h4>Product list:</h4>
        <Container className="">
          {productCollection
            ? productCollection.map((product) => (
                <OrderItem key={product.imgLink} productData={product} />
              ))
            : null}
        </Container>
      </div>
    </div>
  );
}

export default OrderCard;
