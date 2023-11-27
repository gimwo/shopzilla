import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderCard from "../components/OrderCard";
import OrderItem from "../components/OrderItem";
import DeliveredButton from "../components/DeliveredButton";
import userEvent from "@testing-library/user-event";
import UserContext from "../UserContext";
import Footer from "../components/Footer";
import { Grid } from "react-loader-spinner";

function Orders() {
  const { user } = useContext(UserContext);
  const [adminSearch, setAdminSearch] = useState("");
  const [orderProducts, setOrderProducts] = useState("");
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isLoading, setIsLoading] = useState("");

  function fetchAdminData() {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderProducts(data);
      });
    setIsLoading(false);
  }

  function fetchData() {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status == "404") {
          setIsLoading(false);
          setOrderProducts([]);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setOrderProducts([]);
        } else {
          setOrderProducts(data);
          console.log(orderProducts);
        }
        setIsLoading(false);
      });
  }

  console.log(orderProducts);
  useEffect(() => {
    if (user.isAdmin) {
      fetchAdminData();
    } else {
      fetchData();
    }
  }, [adminSearch]);

  return (
    <Container className="bg-admin py-3" style={{ minHeight: "50rem" }}>
      {user.isAdmin ? (
        <div className="text-center pt-5">
          <h3 className="mt-3 order-search-label">
            ADMIN: EXACT ORDER ID SEARCH:
          </h3>
          <input
            placeholder="Order ID (Max of 24 characters)"
            className="id-search"
            maxLength={24}
            type="text"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
          ></input>
        </div>
      ) : (
        <>
          <h2 className="text-center pt-4">ORDER HISTORY</h2>
          <h6 className="text-center">As of {new Date().toDateString()}</h6>
        </>
      )}

      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "10rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            height="80"
            width="80"
            color="#c1121f"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="pt-1 ">
          {orderProducts.length === 0 || !orderProducts ? (
            <h3 className="text-center p-5">No orders made yet.</h3>
          ) : orderProducts?.filter(
              (orderProduct) => orderProduct._id === adminSearch
            ).length !== 0 ? (
            orderProducts
              ?.filter((orderProduct) => {
                return orderProduct._id === adminSearch;
              })
              .map((product) => {
                return (
                  <>
                    <Container className="pt-4">
                      <div className=" order-card p-4">
                        <Container>
                          <Row className="justify-content-around">
                            <Col md={8}>
                              <h4>Order ID: {product._id} </h4>
                              <h4>User ID: {product.userId} </h4>
                              <h5>Date: {product.dateOrdered} </h5>
                              <h5>
                                Status: <em>{product.status}</em>
                              </h5>
                            </Col>
                            <Col>
                              <h2>
                                PhP{" "}
                                {product.totalAmount?.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </h2>
                              <span>*calculated VAT included</span>
                            </Col>
                            {user.isAdmin ? (
                              <Col>
                                <DeliveredButton
                                  fetchAdminData={fetchAdminData}
                                  product={product}
                                />
                              </Col>
                            ) : null}
                          </Row>
                        </Container>
                        <hr />
                        <h4>Product list:</h4>
                        <Container className="">
                          {product
                            ? product.orderedProducts.map((product) => (
                                <OrderItem
                                  key={product.imgLink}
                                  productData={product}
                                />
                              ))
                            : null}
                        </Container>
                      </div>{" "}
                    </Container>
                  </>
                );
              })
              .reverse()
          ) : (
            orderProducts
              ?.map((product) => {
                return (
                  <>
                    <Container className="pt-4">
                      <div className=" order-card p-4">
                        <Container>
                          <Row className="justify-content-around">
                            <Col md={8}>
                              <h4>Order ID: {product._id} </h4>
                              <h4>User ID: {product.userId} </h4>
                              <h5>Date: {product.dateOrdered} </h5>
                              <h5>
                                Status: <em>{product.status}</em>
                              </h5>
                            </Col>
                            <Col>
                              <h2>
                                PhP{" "}
                                {product.totalAmount?.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </h2>
                              <span>*calculated VAT included</span>
                            </Col>
                            {user.isAdmin ? (
                              <Col>
                                <DeliveredButton
                                  fetchAdminData={fetchAdminData}
                                  product={product}
                                />
                              </Col>
                            ) : null}
                          </Row>
                        </Container>
                        <hr />
                        <h4>Product list:</h4>
                        <Container className="">
                          {product
                            ? product.orderedProducts.map((product) => (
                                <OrderItem
                                  key={product.imgLink}
                                  productData={product}
                                />
                              ))
                            : null}
                        </Container>
                      </div>{" "}
                    </Container>
                  </>
                );
              })
              .reverse()
          )}
        </div>
      )}
    </Container>
  );
}

export default Orders;
