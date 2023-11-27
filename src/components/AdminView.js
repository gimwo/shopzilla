import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AllProducts from "./AllProducts";
import AddProduct from "./AddProduct";
import { useState } from "react";
import SetAdmin from "./SetAdmin";

function AdminView() {
  const [allProduct, setAllProduct] = useState(true);
  const [newAdmin, setNewAdmin] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [inactiveSearch, setInactiveSearch] = useState(false);

  function handleAllProduct() {
    setAllProduct(() => true);
    setAddProduct(() => false);
    setNewAdmin(() => false);
  }

  function handleAddProduct() {
    setAllProduct(() => false);
    setAddProduct(() => true);
    setNewAdmin(() => false);
  }

  function handleSetAdmin() {
    setAllProduct(() => false);
    setAddProduct(() => false);
    setNewAdmin(() => true);
  }

  console.log(inactiveSearch);
  return (
    <>
      <div className="bg-offwhite">
        <Container className="p-3 mt-5">
          <Row>
            <Col md={2} className="bg-dashboard">
              <div
                style={{ height: "100%" }}
                className="d-flex flex-column p-4"
              >
                <h1 className="admin-heading pt-3 text-danger">Admin</h1>
                <h5 className="pb-4 admin-heading">DASHBOARD</h5>
                <h5 className="mt-3">Product Search:</h5>
                <input
                  className="product-search"
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                ></input>
                <label className="text-center align-self-center">
                  <input
                    className="mt-4 align-self-end"
                    type="checkbox"
                    checked={inactiveSearch}
                    onChange={(e) => setInactiveSearch(e.target.checked)}
                  />
                  <span> INACTIVE ONLY</span>
                </label>
                <ul className="text-decoration-none mt-5 admin-ul">
                  <Link
                    className="text-decoration-none admin-tabs"
                    onClick={handleAllProduct}
                  >
                    <li className="p-3 admin-tab">All Products</li>
                  </Link>
                  <Link
                    className="text-decoration-none admin-tabs"
                    onClick={handleAddProduct}
                  >
                    <li className="p-3 admin-tab">Create Product</li>
                  </Link>
                  <Link
                    className="text-decoration-none admin-tabs"
                    onClick={handleSetAdmin}
                  >
                    <li className="p-3 admin-tab">Set As Admin</li>
                  </Link>
                </ul>
              </div>
            </Col>

            {newAdmin ? (
              <Col>
                <SetAdmin />
              </Col>
            ) : null}
            {addProduct ? (
              <Col>
                {" "}
                <AddProduct />{" "}
              </Col>
            ) : null}
            {allProduct ? (
              <Col>
                <div className="px-2">
                  <AllProducts
                    adminSearch={adminSearch}
                    inactiveSearch={inactiveSearch}
                  />{" "}
                </div>
              </Col>
            ) : null}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AdminView;
