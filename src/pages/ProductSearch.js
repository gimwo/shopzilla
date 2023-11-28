import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import Pagination from "../components/Pagination";

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState("");
  const [page, setPage] = useState(1);

  const pages = products.length === 8 ? 1 : Math.floor(products.length / 8) + 1;
  const startItem = 0 + 8 * (page - 1);
  const endItem = 8 + 8 * (page - 1);

  function handlePage(num) {
    setPage(() => num);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  const search = searchParams.get("name");
  console.log(products);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = (search) => {
      fetch(`${process.env.REACT_APP_API_URL}/products/q?search=${search}`, {
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

    fetchData(search);
  }, [searchParams]);
  return (
    <Container>
      <Row className="pt-4">
        <h5>PRODUCT SEARCH</h5>
      </Row>
      <Row>
        <Col className="p-5 bg-admin" md={3}>
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
          ) : (
            <h4 className="search-number">
              {`${products?.length ?? 0} Search results: "${searchParams.get(
                "name"
              )}"`}
            </h4>
          )}
        </Col>
        <Col>
          {isLoading ? (
            <div
              className=" d-flex flex-row bg-search flex-wrap gap-1"
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
          ) : (
            <div className="bg-search d-flex justify-content-start align-items-center p-4">
              <div className="d-flex flex-row flex-wrap gap-1 justify-content-start">
                {products.error ? (
                  <h4 className=" text-center p-5">
                    No items for "{searchParams.get("name")}"
                  </h4>
                ) : (
                  products?.slice(startItem, endItem).map((product) => {
                    return (
                      <ProductCard key={product.name} productData={product} />
                    );
                  })
                )}
              </div>
            </div>
          )}
          <div className="my-3 d-flex justify-content-center">
            {Array.from({ length: pages }, (_, i) => i + 1).map((num) => (
              <Pagination
                isSearch={true}
                search={search}
                page={page}
                onSetPage={handlePage}
              >
                {num}
              </Pagination>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductSearch;
