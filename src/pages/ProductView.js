import { Container, Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import EditButton from "../components/EditButton";
import UserContext from "../UserContext";
import ReviewItem from "../components/ReviewItem";
import Swal from "sweetalert2";
import { Oval, Grid, ThreeDots } from "react-loader-spinner";

function ProductView() {
  const { user, cartCount, setCartCount } = useContext(UserContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [relProducts, setRelProducts] = useState([]);
  const [currImage, setCurrImage] = useState("");
  const [reviews, setReviews] = useState(null);
  const [isReviewsLoading, setIsReviewsLoading] = useState("");
  const [isRelLoading, setIsRelLoading] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isAdding, setIsAdding] = useState("");
  const [numLoad, setNumLoad] = useState(4);

  function handleLoadMore() {
    setNumLoad((num) => num + 4);
  }

  console.log(user);
  function setInitialImg() {
    setCurrImage(product.imgLink);
  }
  console.log(reviews);

  function fetchReviews() {
    setIsReviewsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
        setIsReviewsLoading(false);
      });
  }

  function fetchRelData(productCat) {
    setIsRelLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/category/${productCat}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRelProducts(data);
        console.log(data);
        setIsRelLoading(false);
      });
  }

  function fetchData() {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProduct(data);
        setCurrImage(data.imgLink);
        fetchRelData(data.category);
        fetchReviews();
        setIsLoading(false);
      });
  }

  function handleIncQuan() {
    setQuantity((quantity) => quantity + 1);
  }

  function handleDecQuan() {
    setQuantity((quantity) => {
      return quantity > 0 ? quantity - 1 : quantity;
    });
  }

  function handleAddToCart() {
    setIsAdding(true);
    fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.method === "add") {
          console.log(data);
          setCartCount((cartCount) => cartCount + 1);
          Swal.fire({
            icon: "success",
            title: "Added to cart quantity successful!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error adding to cart!",
          });
        }
        setIsAdding(false);
      });
  }

  console.log(quantity);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchData();
    fetchReviews();
    setNumLoad(4);
    setQuantity(1);
  }, [productId]);

  const rating = reviews?.reduce(
    (acc, review) => (acc += review.rating / reviews.length || 1),
    0
  );
  console.log(Math.ceil(rating));
  console.log(reviews);
  return (
    <>
      <div className="bg-product-view">
        <Container className="bg-product">
          <Row className="p-3 py-5">
            <Col>
              <div
                style={{ height: "50rem", overflowAnchor: "none" }}
                className="d-flex justify-content-center align-items-center product-img"
              >
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
                  <img
                    className="img-product"
                    alt="product-img"
                    style={{ width: "50rem" }}
                    src={currImage}
                  ></img>
                )}
              </div>
            </Col>
            <Col className="p-5">
              {user.isAdmin ? (
                product.isActive ? (
                  <p className="product-status bg-success text-center text-white">
                    ACTIVE
                  </p>
                ) : (
                  <p className="product-status bg-danger text-center text-white">
                    INACTIVE
                  </p>
                )
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    width: "100%",
                    height: "19rem",
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
                <>
                  <h2 className="product-heading">{product.name}</h2>
                  <h5 className="product-cat pb-2">
                    Category: {product.category}
                  </h5>
                  <h1 className="text-orange">
                    ₱{" "}
                    {product.price?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h1>
                  <h3>
                    {rating ? (
                      "⭐".repeat(Math.ceil(rating))
                    ) : (
                      <h6>No ratings yet</h6>
                    )}
                    <span className="num-reviews">({reviews?.length})</span>
                  </h3>
                  <h5 className="pt-3">Description: {product.description}</h5>
                </>
              )}

              <div className="d-flex align-items-center quantity-div gap-4">
                <h6 className="product-quantity">Quantity:</h6>
                <div className="d-flex align-items-center">
                  <button onClick={handleDecQuan} className="quantity-btn">
                    -
                  </button>
                  <input
                    type="tel"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-center quantity"
                  />
                  <button onClick={handleIncQuan} className="quantity-btn">
                    +
                  </button>
                </div>
              </div>

              {isAdding ? (
                <div
                  style={{
                    display: "flex",
                    height: "5rem",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#ddd"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              ) : null}

              <Button
                onClick={handleAddToCart}
                className="mt-4 cart-btn"
                disabled={!user.id || user.isAdmin ? true : false}
              >
                ADD TO CART
              </Button>

              <div className="d-flex flex-wrap gap-2 mb-3">
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
                    <Oval
                      className="loader"
                      height={30}
                      width={30}
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
                  <>
                    <img
                      onMouseLeave={setInitialImg}
                      onMouseEnter={(e) => setCurrImage(e.target.src)}
                      className="preview-image"
                      src={product.prevLink1}
                      alt="preview-img"
                    />
                    <img
                      onMouseLeave={setInitialImg}
                      onMouseEnter={(e) => {
                        setCurrImage(e.target.src);
                      }}
                      className="preview-image"
                      src={product.prevLink2}
                      alt="preview-img"
                    />
                    <img
                      onMouseLeave={setInitialImg}
                      onMouseEnter={(e) => {
                        setCurrImage(e.target.src);
                      }}
                      className="preview-image"
                      src={product.prevLink3}
                      alt="preview-img"
                    />
                  </>
                )}
              </div>

              {user.isAdmin ? (
                <Row className="d-flex justify-content-end">
                  <Col md={2}>
                    <EditButton productId={productId} />
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="gap-4">
          <Col md={7} className="p-4 reviews-container">
            <h2 className="text-center">Product Reviews</h2>
            {isReviewsLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "50rem",
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
            ) : reviews?.length ? (
              reviews?.map((review) => (
                <div>
                  <ReviewItem review={review} key={review.dateCreated} />
                </div>
              ))
            ) : (
              <h5 className="mt-5 text-center">No reviews yet.</h5>
            )}
          </Col>
          <Col className="p-3">
            <h2 className="text-center">You might also like</h2>
            <div className="d-flex flex-wrap justify-content-center gap-1">
              {relProducts?.length > 1 ? (
                relProducts
                  ?.filter((relProduct) => {
                    return (
                      relProduct._id !== productId &&
                      relProduct.isActive !== false
                    );
                  })
                  .slice(0, numLoad)
                  .map((product) => (
                    <ProductCard key={product._id} productData={product} />
                  ))
              ) : (
                <h5 className="text-secondary mt-4">No other items to show.</h5>
              )}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button
                style={{ width: "60%" }}
                className="text-center btn-danger"
                onClick={handleLoadMore}
              >
                LOAD MORE
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductView;
