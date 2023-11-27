import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
// Import the "useContext" hook and the "UserContext" object. Deconstruct the "user" state and "setUser" setter function from the "UserContext" object.
import UserContext from "../UserContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { Oval } from "react-loader-spinner";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const retrieveUser = (token) => {
    fetch(`${process.env.REACT_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== "undefined") {
          localStorage.setItem("token", data.access);
          retrieveUser(data.access);
          setUser({
            token: localStorage.getItem("token"),
          });

          console.log("okay!");
          navigate("/");
        } else {
          setMessage(() => data.error);
        }
        setIsLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <>
      <div className="d-flex  my-2 justify-content-center">
        <Container className="mx-0 px-0">
          <Row>
            <Col className="bg-login" md={7}></Col>
            <Col className="login-form">
              <Form onSubmit={(e) => handleLogin(e)} className="p-5">
                <h1 className="my-5 login-heading">
                  Welcome back to Shopzilla!
                </h1>
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
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
                ) : message ? (
                  <h5 className="bg-warning text-white p-2">{message}</h5>
                ) : null}
                <Form.Group className="mb-4" controlId="userEmail">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    className="input-field"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="userPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  className="mb-3 submit-btn"
                  type="submit"
                  id="submitBtn"
                >
                  Submit
                </Button>

                <p className="login-new-user">
                  New here?{" "}
                  <Link className="register-link" to="/register" exact>
                    Create an account*
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
