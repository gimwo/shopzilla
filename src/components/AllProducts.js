import ArchiveButton from "./ArchiveButton";
import Products from "./Products";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import ProductCard from "./ProductCard";
import EditButton from "./EditButton";
import { ThreeDots } from "react-loader-spinner";

function AllProducts({ adminSearch, inactiveSearch }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [products, inactiveSearch]);

  const search = RegExp(adminSearch, "i");
  return (
    <>
      <div className=" d-flex flex-row bg-admin flex-wrap gap-1">
        {adminSearch || inactiveSearch
          ? products
              ?.filter((product) => {
                if (inactiveSearch) {
                  return (
                    product.isActive === false && product.name.match(search)
                  );
                } else {
                  return product.name.match(search);
                }
              })
              .map((product) => {
                return (
                  <ProductCard
                    className={product.isActive ? null : "bg-danger"}
                    productData={product}
                    adminRights={true}
                  >
                    <EditButton productId={product._id} fetchData={fetchData} />
                    <ArchiveButton
                      productId={product._id}
                      isActive={product.isActive}
                      fetchData={fetchData}
                    />
                  </ProductCard>
                );
              })
          : products?.map((product) => (
              <ProductCard productData={product} adminRights={true}>
                <EditButton productId={product._id} fetchData={fetchData} />
                <ArchiveButton
                  productId={product._id}
                  isActive={product.isActive}
                  fetchData={fetchData}
                />
              </ProductCard>
            ))}
      </div>
    </>
  );
}

export default AllProducts;
