import { Container } from "react-bootstrap";
import Featured from "./Featured";

function Catalog() {
  return (
    <div>
      <Container className="my-5">
        <div className="bg-danger">
          <Featured />
        </div>
      </Container>
    </div>
  );
}

export default Catalog;
