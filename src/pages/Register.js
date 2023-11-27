import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Register() {
  // const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const navigate = useNavigate();
  function handleRegister(e) {
    e.preventDefault();
    setIsLoading(false);

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data !== "Existing user!") {
          console.log("registered!");
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");
          setIsLoading(true);
          Swal.fire({
            icon: "success",
            title: "Registered successfully!",
          });

          navigate("/login");
        } else {
          alert("Register failed");
        }
      });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="d-flex my-2 justify-content-center">
      <Container className="mx-0 px-0">
        <Row>
          <Col className="bg-login" md={7}></Col>
          <Col className="login-form">
            <Form className="p-5" onSubmit={handleRegister}>
              <h1 className="my-5 login-heading">Create an account</h1>
              <Form.Group className="mb-4" controlId="userFirst">
                <Form.Label className="form-label">First name:</Form.Label>
                <Form.Control
                  type="text"
                  className="input-field"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userLast">
                <Form.Label className="form-label">Last name:</Form.Label>
                <Form.Control
                  type="text"
                  className="input-field"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userEmail">
                <Form.Label className="form-label">Email address:</Form.Label>
                <Form.Control
                  type="email"
                  className="input-field"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userNumber">
                <Form.Label className="form-label">Mobile number:</Form.Label>
                <Form.Control
                  type="text"
                  className="input-field"
                  placeholder="Enter mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userPassword">
                <Form.Label className="form-label">Password:</Form.Label>
                <Form.Control
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-5" controlId="userPassword">
                <Form.Label className="form-label">
                  Confirm password:
                </Form.Label>
                <Form.Control
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="danger"
                className="mb-3 submit-btn"
                type="submit"
                id="submitBtn"
              >
                Create account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
