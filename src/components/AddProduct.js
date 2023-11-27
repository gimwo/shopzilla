import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [prevLink1, setPrevLink1] = useState("");
  const [prevLink2, setPrevLink2] = useState("");
  const [prevLink3, setPrevLink3] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");

  function handleAddProduct(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: "POST",
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
        price: price,
        SKU: sku,
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Add product successful!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Add product unsuccessful!",
          });
        }
      });
  }

  return (
    <div className="">
      <Container className="mx-0 px-0">
        <Row>
          <Col className="bg-add-prod">
            <Form className="p-5" onSubmit={handleAddProduct}>
              <h3 className="admin-heading">PRODUCT CREATION</h3>
              <h6 className="pb-4">
                NOTE: Products created cannot be deleted in the admin dashboard.
                Please contact the developer if permanent deletion is deemed
                necessary.
              </h6>
              <Form.Group className="mb-4" controlId="userFirst">
                <Form.Label className="form-label">Product name:</Form.Label>
                <Form.Control
                  type="text"
                  className="input-field"
                  placeholder="Enter product name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userLast">
                <Form.Label className="form-label">Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                  placeholder="Enter product description"
                  required
                  fixed
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userEmail">
                <Form.Label className="form-label">Stock:</Form.Label>
                <Form.Control
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="input-field"
                  placeholder="Enter stock"
                  min={0}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userNumber">
                <Form.Label className="form-label">Category:</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option>{"<--Select product category-->"}</option>
                  <option>Appliance</option>
                  <option>Automotive</option>
                  <option>Beauty</option>
                  <option>Books</option>
                  <option>Clothing</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Gaming</option>
                  <option>Health</option>
                  <option>Groceries</option>
                  <option>Outdoor</option>
                  <option>Pets</option>
                  <option>Productivity</option>
                  <option>Toys</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4" controlId="userPassword">
                <Form.Label className="form-label">
                  Product thumbnail link:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={imgLink}
                  onChange={(e) => setImgLink(e.target.value)}
                  className="input-field"
                  placeholder="Image URL"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userPassword">
                <Form.Label className="form-label">
                  Preview image link #1:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={prevLink1}
                  onChange={(e) => setPrevLink1(e.target.value)}
                  className="input-field"
                  placeholder="Image URL"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userPassword">
                <Form.Label className="form-label">
                  Preview image link #2:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={prevLink2}
                  onChange={(e) => setPrevLink2(e.target.value)}
                  className="input-field"
                  placeholder="Image URL"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userPassword">
                <Form.Label className="form-label">
                  Preview image link #3:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={prevLink3}
                  onChange={(e) => setPrevLink3(e.target.value)}
                  className="input-field"
                  placeholder="Image URL"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="userPassword">
                <Form.Label className="form-label">Price:</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field"
                  placeholder="Product price"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-5" controlId="userPassword">
                <Form.Label className="form-label">SKU:</Form.Label>
                <Form.Control
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="input-field"
                  placeholder="SKU"
                  required
                />
              </Form.Group>
              <Button
                variant="success"
                className="mb-3 submit-btn"
                type="submit"
                id="submitBtn"
              >
                Add product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProduct;
