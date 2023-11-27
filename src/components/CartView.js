import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CartItem from "./CartItem";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import { Oval, ThreeDots } from "react-loader-spinner";

function CartView() {
  const { cartCount, setCartCount } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  function fetchData() {
    fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartProducts([data]);
      });
  }
  let userCartItems = cartProducts.map((cartProduct) => cartProduct.products);

  function handleCheckout() {
    setIsChecking(true);
    fetch(`${process.env.REACT_APP_API_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Checkout Successful",
          });
          setCartCount(0);
        } else
          Swal.fire({
            icon: "error",
            title: "Unsuccessful Checkout",
          });
        setIsChecking(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [userCartItems, cartCount]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  console.log(cartProducts);
  return (
    <div className="p-2 bg-cart-div">
      <Container className="">
        <Col className="bg-cart">
          <div className="px-3">
            <Row>
              <h3 className="text-center pt-5">Your Zillacart</h3>
              <h6 className="pt-3">Below are its products:</h6>
            </Row>
            <Row className="">
              <Col md={9}>
                <div className="bg-orders ">
                  {userCartItems[0]?.map((product) => (
                    <CartItem key={product.productId} cartProduct={product} />
                  ))}
                </div>
              </Col>
              <Col>
                <div className="p-5 bg-orders bg-result d-flex flex-column align-items-center justify-content-end gap-1">
                  <h5>Cart Total: </h5>
                  <h1 className="text-success price">
                    {" "}
                    ₱
                    {(cartProducts?.at(0)?.subtotal ?? 0).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </h1>

                  <h6>(VAT included upon checkout)</h6>
                  {isChecking ? (
                    <div
                      style={{
                        display: "flex",
                        height: "5rem",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#ddd"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  ) : null}
                  <Button
                    onClick={handleCheckout}
                    className="submit-review-btn  mt-2"
                  >
                    Proceed to checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default CartView;
