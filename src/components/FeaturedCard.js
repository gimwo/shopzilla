import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Oval } from "react-loader-spinner";

function FeaturedCard({ product }) {
  return (
    <>
      <Nav.Link as={NavLink} to={`/products/${product._id}`}>
        <Card style={{ width: "25rem" }} className="p-1">
          <Card.Img
            style={{ maxHeight: "25rem" }}
            variant="top"
            src={product?.imgLink}
          />
          <Card.Body>
            <Card.Title>
              {product.name?.length > 30
                ? `${product.name.slice(0, 30)}...`
                : product.name}
            </Card.Title>
            <h4>{"⭐".repeat(5)}</h4>
            <h3 className="text-orange">
              PhP{" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </Card.Body>
        </Card>
      </Nav.Link>
    </>
  );
}

export default FeaturedCard;
