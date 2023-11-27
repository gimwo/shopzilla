import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function SetAdmin() {
  const [userId, setUserId] = useState(null);

  function handleSetAdmin(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/set-admin`, {
      method: "PATCH",
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
            title: "Admin access granted!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
          });
        }
      });
  }

  return (
    <>
      <Container className="mx-0 px-0">
        <Row>
          <Col className="bg-add-prod">
            <Form onSubmit={handleSetAdmin} className="p-5">
              <h3 className="admin-heading">SET NEW ADMIN</h3>
              <h6 className="pb-4">
                NOTE: Providing users admin privileges is in the meantime
                irreversible.
              </h6>
              <Form.Group className="mb-4" controlId="userFirst">
                <Form.Label className="form-label">User ID:</Form.Label>
                <Form.Control
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="input-field"
                  placeholder="User ID"
                  required
                />
              </Form.Group>

              <Button
                variant="warning"
                className="mb-3 submit-btn"
                type="submit"
                id="submitBtn"
              >
                Give Admin Access
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SetAdmin;
