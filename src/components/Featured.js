import { useEffect, useState } from "react";
import { Button, Card, Carousel, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import { ThreeDots, Oval } from "react-loader-spinner";
import { Nav } from "react-bootstrap";

function Featured() {
  const [products, setProducts] = useState("");
  const [featured, setFeatured] = useState(null);
  const [isLoading, setIsLoading] = useState("");
  const [loaded, setLoaded] = useState(false);

  function fetchData() {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        let featured = [];
        const randomArr = [];
        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data?.length);
          if (randomArr.indexOf(randomNum) === -1) {
            randomArr.push(randomNum);
          } else {
            generateRandomNums();
          }
        };
        console.log(randomArr);
        for (let i = 0; i < 10; i++) {
          generateRandomNums();
          featured.push(
            <FeaturedCard
              product={data[randomArr[i]]}
              key={data[randomArr[i]]._id}
            />
          );
        }
        setFeatured(featured);
        setIsLoading(false);
      });
  }

  console.log(featured);
  // console.log(products);
  useEffect(() => {
    fetchData();
  }, [loaded]);

  return (
    <div>
      <Container className="">
        <h1 className="featured-heading">Featured items and Sponsor</h1>
      </Container>
      <Container className="featured-list bg-danger p-3 mb-3">
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
              color="#ddd"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <Carousel className="featured-carousel" pause={"hover"}>
            <Carousel.Item>
              <div className="d-flex justify-content-center gap-3">
                {featured?.slice(0, 5)}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center gap-3">
                {featured?.slice(5, 11)}
              </div>
            </Carousel.Item>
          </Carousel>
        )}
        <Nav.Link as={NavLink} to={"/q?name=samsung+fold"}>
          <img
            onLoad={() => setLoaded(true)}
            alt="image"
            style={{ width: "100%", borderRadius: "5px" }}
            className="my-3"
            src="https://i.ytimg.com/vi/reBVZCq-3HA/maxresdefault.jpg"
          ></img>
        </Nav.Link>
      </Container>
    </div>
  );
}

export default Featured;
