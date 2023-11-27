import { useContext } from "react";
import { Button } from "react-bootstrap";
import UserContext from "../UserContext";

function RemoveCartItem({ productId }) {
  const { cartCount, setCartCount } = useContext(UserContext);

  function handleRemove() {
    fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}/remove`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setCartCount((cartCount) => {
            if (cartCount > 0) {
              return cartCount - 1;
            }
          });
        }
      });
  }

  return (
    <>
      <Button onClick={handleRemove} className="remove-item-btn">
        X
      </Button>
    </>
  );
}

export default RemoveCartItem;
