import { useEffect, useState } from "react";
import { Button, Nav, NavLink } from "react-bootstrap";
import RemoveCartItem from "./RemoveCartItem";

function CartItem({ cartProduct }) {
  console.log(cartProduct);
  const [quantity, setQuantity] = useState(cartProduct.quantity);

  console.log(cartProduct);
  // function fetchData() {
  //   fetch(`${process.env.REACT_APP_API_URL}/products/${cartProduct.id}`);
  // }

  function handleIncQuan() {
    setQuantity((quantity) => quantity + 1);
  }

  function handleDecQuan() {
    setQuantity((quantity) => {
      return quantity > 0 ? quantity - 1 : quantity;
    });
  }

  useEffect(() => {
    function handleQuantityChange() {
      fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: cartProduct.productId,
          quantity: quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
          }
        });
    }
    handleQuantityChange();
  }, [quantity]);

  return (
    <>
      <div className="d-flex flex-column bg-offwhite py-1">
        <div className="product-card p-4 d-flex align-items-center justify-content-between">
          <div>
            <Nav.Link as={NavLink} to={`/products/${cartProduct.productId}`}>
              <img
                className="cart-img"
                src={cartProduct.imgLink}
                alt={cartProduct.imgLink}
              ></img>
            </Nav.Link>
          </div>
          <div>
            <h2>
              {cartProduct.name.length > 30
                ? `${cartProduct.name.slice(0, 25)}...`
                : cartProduct.name}
            </h2>
            <h6>ProductID: {cartProduct.productId}</h6>
          </div>
          <div className="d-flex align-items-center">
            <button onClick={handleDecQuan} className="quantity-btn">
              -
            </button>
            <input
              type="tel"
              className="text-center quantity"
              value={quantity}
            />
            <button onClick={handleIncQuan} className="quantity-btn">
              +
            </button>
          </div>
          <div className="mx-3 justify-self-end">
            <h5 className="text-success">PhP {cartProduct.price}</h5>
            <h5>Receive by:</h5>
            <h6>
              <em>3-5 delivery days</em>
            </h6>
          </div>
          <RemoveCartItem productId={cartProduct.productId} />
        </div>
      </div>
    </>
  );
}

export default CartItem;
