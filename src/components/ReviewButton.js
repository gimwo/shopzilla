import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import StarRating from "./StarRating";
import Swal from "sweetalert2";

function ReviewButton({ orderData, productId, tempRating, setTempRating }) {
  const [rating, setRating] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [review, setReview] = useState(null);
  const [headline, setHeadline] = useState(null);

  const countRef = useRef(0);

  function handleSendReview(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/products/review`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        headline: headline,
        orderId: orderData.orderId,
        productId: productId,
        message: review,
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Review submitted!",
          });
          closeEdit();
        }
      });
  }

  console.log(orderData.orderId);
  useEffect(
    function () {
      if (rating) countRef.current++;
    },
    [rating]
  );

  function openEdit() {
    setShowEdit(true);
  }

  function closeEdit() {
    setShowEdit(false);
  }

  console.log(rating);
  return (
    <>
      <button onClick={openEdit} className="review-btn mx-2 px-3">
        Make Review
      </button>
      <Modal className="modal-review" show={showEdit} onHide={closeEdit}>
        <Form onSubmit={handleSendReview}>
          <Modal.Header>
            <Modal.Title className="modal-title">Review Product</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <Row>
              <Col>
                <h3>How was this product?</h3>
                <Form.Label>Product Rating</Form.Label>
                <div className="mb-4">
                  <StarRating
                    rating={rating}
                    tempRating={tempRating}
                    onSetRating={setRating}
                    setTempRating={setTempRating}
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>

            <Form.Group controlId="courseName">
              <Form.Label>Review headline</Form.Label>
              <Form.Control
                placeholder="Headline here"
                className="text-body"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Form.Group controlId="courseName">
              <Form.Label>Write Review</Form.Label>
              <Form.Control
                rows={5}
                placeholder="Write your review here"
                className="text-body"
                as="textarea"
                value={null}
                onChange={(e) => setReview(e.target.value)}
                required
                style={{ resize: "none" }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="submit-review-btn"
              style={{ width: "100%" }}
              variant="success"
              type="submit"
            >
              Send Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ReviewButton;
