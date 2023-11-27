import { Button } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { useState } from "react";

export default function ArchiveButton({ productId, isActive, fetchData }) {
  const [isLoading, setIsLoading] = useState("");

  const handleArchive = (productId) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          console.log("archived!");
          fetchData();
        } else {
          fetchData();
        }
        setIsLoading(false);
      });
  };

  const handleActivate = (productId) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          console.log("activated");
          fetchData();
        } else {
          fetchData();
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      {isActive ? (
        <Button
          className="bg-archive-btn"
          size="sm"
          onClick={() => handleArchive(productId)}
        >
          ARCHIVE
          {isLoading ? (
            <div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "1rem",
              }}
            >
              <Oval
                className="loader"
                height={80}
                width={80}
                color="#eee"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#eee"
                strokeWidth={6}
                strokeWidthSecondary={4}
              />
            </div>
          ) : null}
        </Button>
      ) : (
        <Button
          className="bg-activate-btn"
          size="sm"
          onClick={() => handleActivate(productId)}
        >
          ACTIVATE{" "}
          {isLoading ? (
            <p
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "1rem",
              }}
            >
              <Oval
                className="loader"
                height={80}
                width={80}
                color="#eee"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#eee"
                strokeWidth={6}
                strokeWidthSecondary={4}
              />
            </p>
          ) : null}
        </Button>
      )}
    </>
  );
}
