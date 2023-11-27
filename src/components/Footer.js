import { Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer d-flex overflow-y-hidden">
      <Col className=" d-flex align-self-center justify-content-center">
        <Container className="pt-5 px-large">
          <h6 className="d-flex flex-column gap-5 pt-5">
            <div>
              Here at Shopzilla, our goal is to stand as a formidable force in
              the realm of e-commerce. We strive to establish ourselves as a
              dominant presence, offering unparalleled service and quality
              products. Our commitment to excellence drives us to continuously
              enhance your shopping experience. We take immense pleasure in
              serving you and are dedicated to meeting your needs with utmost
              professionalism and efficiency. Your satisfaction remains our top
              priority, and we are grateful for the opportunity to assist you in
              every way possible. Thank you for choosing Shopzilla. We look
              forward to continuing to exceed your expectations. ust as
              Godzilla’s colossal footsteps leave an indelible mark, we strive
              to make our footprint synonymous with reliability, quality, and an
              unparalleled shopping experience. Much like the awe-inspiring
              presence of Godzilla, our commitment to you looms large, ensuring
              that every interaction, every purchase is an experience worth
              roaring about. With every click, scroll, and purchase, we endeavor
              to unleash the power of choice, diversity, and exceptional
              service, akin to the ferocity and impact of Godzilla's iconic
              roar.
            </div>
            <div>
              Your satisfaction is our battleground, and we stand ready, like
              Godzilla against adversaries, to defend your right to exceptional
              service and top-notch products. As Shopzilla navigates the
              ever-expanding e-commerce universe, we are driven by a passion
              akin to Godzilla’s fiery determination, ensuring that our
              offerings evolve and adapt to meet your ever-changing needs. Thank
              you for entrusting Shopzilla to be your colossal companion in the
              sprawling metropolis of online shopping. Join us as we continue to
              harness the spirit of Godzilla, making waves and leaving a
              resounding impact in the world of e-commerce.
            </div>
            <div>
              Sincerely, <p>The Shopzilla Team</p>
            </div>
            <div>
              <strong>All Rights Reserved 2023</strong>
            </div>
          </h6>
          <svg
            id="shopzilla-footer"
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM128,160a48.05,48.05,0,0,1-48-48,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0A48.05,48.05,0,0,1,128,160ZM40,72V56H216V72Z"></path>
          </svg>
        </Container>
      </Col>
    </div>
  );
}

export default Footer;
