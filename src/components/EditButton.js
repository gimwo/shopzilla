import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Star from "./Star";
import Swal from "sweetalert2";

function EditButton({ productId, fetchData }) {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [prevLink1, setPrevLink1] = useState("");
  const [prevLink2, setPrevLink2] = useState("");
  const [prevLink3, setPrevLink3] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function handleEdit(e, productId) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        imgLink: imgLink,
        prevLink1: prevLink1,
        prevLink2: prevLink2,
        prevLink3: prevLink3,
        stock: stock,
        category: category,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data) {
          Swal.fire({
            icon: "success",
            title: "Product updated!",
          });
          closeEdit();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error updating!",
          });
        }
      });
  }

  const openEdit = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setStock(data.stock);
        setCategory(data.category);
        setImgLink(data.imgLink);
        setPrevLink1(data.prevLink1);
        setPrevLink2(data.prevLink2);
        setPrevLink3(data.prevLink3);
        setPrice(data.price);
      });

    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice(0);
  };

  return (
    <div>
      <>
        <Button
          className="mb-1 bg-edit-btn"
          style={{ width: "100%" }}
          size="sm"
          onClick={() => openEdit(productId)}
        >
          {" "}
          EDIT PRODUCT
        </Button>
        {/*EDIT MODAL*/}
        <Modal show={showEdit} onHide={closeEdit}>
          <Form onSubmit={(e) => handleEdit(e, productId)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group controlId="courseName">
                <Form.Label c>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Image link</Form.Label>
                <Form.Control
                  type="text"
                  value={imgLink}
                  onChange={(e) => setImgLink(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Preview Image link #1</Form.Label>
                <Form.Control
                  type="text"
                  value={prevLink1}
                  onChange={(e) => setPrevLink1(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Preview Image link #2</Form.Label>
                <Form.Control
                  type="text"
                  value={prevLink2}
                  onChange={(e) => setPrevLink2(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="courseDescription">
                <Form.Label>Preview Image link #3</Form.Label>
                <Form.Control
                  type="text"
                  value={prevLink3}
                  onChange={(e) => setPrevLink3(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="coursePrice">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="coursePrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" size="sm" onClick={closeEdit}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    </div>
  );
}

export default EditButton;
