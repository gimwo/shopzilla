import { Carousel, Container, Row, Col } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Grid } from "react-loader-spinner";

function Hero() {
  return (
    <div className="bg-hero pt-0 pb-3">
      <Container className="bg-white px-0">
        <Row>
          <Col>
            <Carousel fade={true} controls={false}>
              <Carousel.Item>
                <img
                  style={{ overflow: "hidden" }}
                  className="carousel"
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGV5eHhkZXc3bWpxNzg1dGk0YzllcHFlODhvOTBnOTFwcjM1M2QzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OIA1VROT19MEGW3FpK/giphy.gif"
                  alt="pic"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{ overflow: "hidden" }}
                  className="carousel"
                  src="https://www.scholastic.com/content/dam/scholastic/educators/collections/Most-Popular-BL_-COLL_16-9.jpg.corpimagerendition.xxl.1400.788.png"
                  alt="pic"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://www.gigahertz.com.ph/cdn/shop/files/playstation-5-77d37a0.jpg?v=1695884245&width=1280"
                  alt="pic"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/349138/1200x675.jpg?w=1280&ar=default&fit=crop&crop=faces,edges&auto=format"
                  alt="pic"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://i0.wp.com/pokemontoday.net/wp-content/uploads/2023/08/Obsidian-Flames-Pokemon-TCG-Wallpaper.webp?resize=1024%2C580&ssl=1"
                  alt="pic"
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col>
            <Row>
              <img
                src="https://live.staticflickr.com/65535/53349143960_0566d70f18_z.jpg"
                alt="free-ship"
              />
            </Row>
            <Row>
              {/* <div className="hot-category-card text-center"> */}
              <div className="hot-category-card text-center d-flex linked-products justify-content-center">
                <Nav.Link as={NavLink} to="/category/electronics">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="100"
                      height="100"
                      src="https://img.icons8.com/fluency/48/multiple-devices.png"
                      alt="multiple-devices"
                    />
                  </div>
                  <h5>Electronics</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/clothing">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/clothes.png"
                      alt="clothes"
                    />
                  </div>
                  <h5>Clothing</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/gaming">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/nintendo-switch-pro-controller.png"
                      alt="nintendo-switch-pro-controller"
                    />
                  </div>
                  <h5>Gaming</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/appliance">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/appliances.png"
                      alt="appliances"
                    />
                  </div>
                  <h5>Appliances</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/furniture">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/three-seater-sofa.png"
                      alt="three-seater-sofa"
                    />
                  </div>
                  <h5>Furniture</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/toys">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/toy-car.png"
                      alt="toy-car"
                    />
                  </div>
                  <h5>Toys</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/groceries">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/gailan.png"
                      alt="gailan"
                    />
                  </div>
                  <h5>Groceries</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/productivity">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/clerk.png"
                      alt="clerk"
                    />
                  </div>
                  <h5>Productivity</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/books">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/courses.png"
                      alt="courses"
                    />
                  </div>
                  <h5>Books</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/pets">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/dog.png"
                      alt="dog"
                    />
                  </div>
                  <h5>Pets</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/beauty">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/lipstick.png"
                      alt="lipstick"
                    />
                  </div>
                  <h5>Beauty</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/outdoor">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/basketball.png"
                      alt="basketball"
                    />
                  </div>
                  <h5>Outdoor</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/automotive">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/suv.png"
                      alt="suv"
                    />
                  </div>
                  <h5>Automotive</h5>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/health">
                  <div className="overflow-hidden">
                    <img
                      className="featured"
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/pill.png"
                      alt="pill"
                    />
                  </div>
                  <h5>Health</h5>
                </Nav.Link>
                {/* </div> */}
              </div>
            </Row>
            <Row>{/* <Col className="bg-danger">hello</Col> */}</Row>
          </Col>
        </Row>

        <Row>
          <Col className=" mt-3">
            <div className="banner-large bg-danger d-flex flex-column align-items-center pt-5 gap-2">
              <h1 className="mt-1">
                <span id="bold-text-head">The holiday season is here</span>, buy
                gifts now for a discounted price!
              </h1>
              <h2>
                Please save yourself from the hassle of the holidays, receive
                your
                <span id="bold-text-sub">
                  {" "}
                  packages right at your doorstep.
                </span>
              </h2>
              <div className="mt-4">
                <a href="#" className="shop-btn">
                  Get to shopping!
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;
