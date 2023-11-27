import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import DeliveredOrder from "./DeliveredOrder";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

function UserView({ userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [changePass, setChangePass] = useState(false);
  const [viewOrders, setViewOrders] = useState(true);
  const [isLoading, setIsLoading] = useState("");
  const [isPassLoading, setIsPassLoading] = useState("");
  const [userAccount, setUserAccount] = useState("");

  const dateNow = new Date();
  const ops = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function handleChangePassword(e) {
    e.preventDefault();
    setIsPassLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          Swal.fire({
            icon: "success",
            title: "Password changed!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unsuccessful Password change.",
          });
        }
        setIsPassLoading(false);
      });
  }

  function handleChangePass() {
    setChangePass(true);
    setViewOrders(false);
  }
  function handleViewOrders() {
    setChangePass(false);
    setViewOrders(true);
  }

  function fetchData() {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserAccount(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchData();
  }, []);

  const pendingOrders = userAccount.orders
    ?.filter((order) => order.status == "pending")
    .reverse();

  const deliveredOrders = userAccount.orders
    ?.filter((order) => order.status == "delivered")
    .reverse();

  return (
    <>
      <div className="bg-offestwhite">
        <Container className="p-3 mt-5 ">
          <Row className="gap-3">
            <Col md={2} className="text-center bg-dashboard bg-user">
              <div
                style={{ height: "100%" }}
                className="d-flex flex-column p-4"
              >
                <img
                  className="m-1"
                  style={{ height: "170px", borderRadius: "20px" }}
                  src="https://i.pinimg.com/originals/24/70/0d/24700d0c4b8ca3600672cb09cd1a5681.png"
                />
                <h1 className="admin-heading pt-3 text-danger">
                  {userAccount.firstName} {userAccount.lastName?.at(0)}.
                </h1>
                <h5 className="pb-4 admin-heading">SHOPZILLA USER</h5>
                <div className="">
                  <h6>Registered email: {userAccount.email}</h6>
                  <h6>
                    Total no. of orders made: {userAccount.orders?.length}
                  </h6>
                </div>
                <ul className="text-decoration-none mt-3 admin-ul">
                  <Link
                    className="text-decoration-none admin-tabs"
                    onClick={handleViewOrders}
                  >
                    <li className="p-3 admin-tab">View Orders</li>
                  </Link>
                  <Link
                    className="text-decoration-none admin-tabs"
                    onClick={handleChangePass}
                  >
                    <li className="p-3 admin-tab">Change Password</li>
                  </Link>
                </ul>
              </div>
            </Col>
            {!changePass ? (
              <Col className="bg-account">
                <div className="p-5">
                  <Row>
                    <h3 className="admin-heading">
                      GREETINGS, {userAccount.firstName?.toUpperCase()}{" "}
                      {userAccount.lastName?.toUpperCase()}
                    </h3>
                    <h6 className="pt-1 user-date">
                      {dateNow.toLocaleDateString("en-US", ops)}
                    </h6>
                  </Row>
                  {isLoading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "50rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Oval
                        className="loader"
                        height={80}
                        width={80}
                        color="#c1121f"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#eee"
                        strokeWidth={6}
                        strokeWidthSecondary={4}
                      />
                    </div>
                  ) : (
                    <Row className="mt-3">
                      <Col md={9}>
                        <h3 className="py-2">
                          ({pendingOrders?.length}) Pending Orders
                        </h3>
                        <div className="d-flex bg-orders flex-column gap-2 py-2">
                          {pendingOrders?.map((order) => {
                            return (
                              <OrderCard
                                orderData={order}
                                key={order.orderId}
                              />
                            );
                          })}
                        </div>
                      </Col>
                      <Col md={3}>
                        <h3 className="py-2">
                          ({deliveredOrders?.length}) Completed Orders
                        </h3>
                        <div className="d-flex bg-orders flex-column gap-2 p-4">
                          {deliveredOrders?.map((order) => {
                            return <DeliveredOrder orderData={order} />;
                          })}
                        </div>
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
            ) : (
              <>
                <Col className="bg-add-prod">
                  <Form onSubmit={handleChangePassword} className="p-5">
                    <h3 className="admin-heading">CHANGE PASSWORD</h3>
                    <h6 className="pb-4">
                      NOTE: Please refrain from frequently changing passwords.
                    </h6>
                    <Form.Group className="mb-4" controlId="password1">
                      <Form.Label className="form-label">
                        Old password:
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="input-field"
                        placeholder="Enter old password"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password2">
                      <Form.Label className="form-label">
                        New password:
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field"
                        placeholder="Enter new password"
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="warning"
                      className="mb-3 submit-btn"
                      type="submit"
                      id="submitBtn"
                    >
                      Change Password
                    </Button>
                  </Form>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserView;
