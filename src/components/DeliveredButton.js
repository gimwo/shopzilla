import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

function DeliveredButton({ product, fetchAdminData }) {
  const [isUpdate, setIsUpdate] = useState(false);

  function handleDelivered() {
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: product._id,
        status: "delivered",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Order updated!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error updating!",
          });
        }
      });
    setIsUpdate((isUpdate) => !isUpdate);
  }

  useEffect(() => {
    fetchAdminData();
  }, [handleDelivered]);
  return (
    <>
      {product.status !== "delivered" ? (
        <Button onClick={handleDelivered}>Mark as delivered</Button>
      ) : (
        <Button disabled>Item already delivered</Button>
      )}
    </>
  );
}

export default DeliveredButton;
