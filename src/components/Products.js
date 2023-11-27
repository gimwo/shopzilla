import { Container, Card, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { ThreeDots } from "react-loader-spinner";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [numLoad, setNumLoad] = useState(18);

  function handleLoadMore() {
    setNumLoad((num) => num + 18);
  }

  const fetchData = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProducts(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(products);
  return (
    <Container className="bg-offwhite py-4" fluid>
      <Container>
        <h2 className="featured-heading">Items in stock</h2>
      </Container>
      <Container>
        <div className=" d-flex flex-wrap gap-2 justify-content-center">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                height: "20rem",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#aaa"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : products !== undefined ? (
            products.slice(0, numLoad).map((product) => {
              return <ProductCard productData={product}></ProductCard>;
            })
          ) : null}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button
            style={{ width: "60%" }}
            className="text-center btn-danger"
            onClick={handleLoadMore}
            disabled={isLoading ? true : false}
          >
            LOAD MORE
          </Button>
        </div>
      </Container>
    </Container>
  );
}

export default Product;
