import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { Oval } from "react-loader-spinner";

function ProductCard({ children, productData, adminRights }) {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState("");
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState("");

  function fetchReviews() {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productData._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  const rating = reviews?.reduce(
    (acc, review) => (acc += review.rating / reviews.length),
    0
  );

  useEffect(() => {
    setProduct(productData);
  }, [productData]);
  // console.log(product);
  return (
    <>
      {!adminRights ? (
        <Link className="text-decoration-none" to={`/products/${product._id}`}>
          <Card style={{ width: "21rem" }} className="p-1 item-in-stock">
            <div
              style={{ height: "20rem", overflow: "hidden" }}
              className="d-flex"
            >
              {isLoading ? (
                <div
                  style={{
                    width: "21rem",
                    height: "20rem",
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
                <Card.Img variant="top" src={product.imgLink} />
              )}
            </div>
            {children}
            <Card.Body>
              <Card.Title>
                {product.name?.length > 20
                  ? `${product.name.slice(0, 25)}....`
                  : product.name}
              </Card.Title>

              {rating ? (
                <h4>{"⭐".repeat(Math.ceil(rating))}</h4>
              ) : (
                <h6>No ratings yet!</h6>
              )}

              <h3 className="text-orange">
                ₱{" "}
                {product.price?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
              <h5 className="d-flex gap-1">
                <h5 className="text-decoration-line-through text-secondary">
                  ₱
                  {(product?.price * 1.9).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h5>
                (-50%)
              </h5>
              <h6>{product.stock} stock left!</h6>
            </Card.Body>
          </Card>
        </Link>
      ) : (
        <Card
          style={{ width: "21rem" }}
          className={`"p-1 item-in-stock" ${
            product.isActive && product.stock > 0 ? null : "bg-admin-prod-inac"
          }`}
        >
          <div
            style={{ height: "21rem", overflow: "hidden" }}
            className="d-flex"
          >
            <Card.Img variant="top" src={product.imgLink} />
          </div>
          {children}
          <Card.Body>
            <Link
              className={`${
                product.isActive && product.stock > 0
                  ? "text-success"
                  : "text-danger"
              } text-decoration-none`}
              to={`/products/${product._id}`}
            >
              <Card.Title>
                {product.name?.length > 30
                  ? `${product.name.slice(0, 25)}....`
                  : product.name}
              </Card.Title>
              {rating ? (
                <h4>
                  {"⭐".repeat(
                    Math.ceil(rating) + "★".repeat(5 - Math.ceil(rating))
                  )}
                </h4>
              ) : (
                <h6>No ratings yet!</h6>
              )}
              <h3 className="text-orange">₱ {product.price?.toFixed(2)}</h3>
              <h5 className="text-decoration-line-through">₱</h5>
              <h6>{product.userOrders?.length} Orders</h6>
              <h6>
                Stock available: <strong>{product.stock}</strong>{" "}
              </h6>
            </Link>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default ProductCard;
