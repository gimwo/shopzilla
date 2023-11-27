import AppNavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { useState, useEffect } from "react";
import ProductView from "./pages/ProductView";
import ProductSearch from "./pages/ProductSearch";
import Category from "./pages/Category";
import { useSearchParams } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    cartId: null,
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            cartId: data.cartId,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
            cartId: null,
          });
        }
      });
    console.log(localStorage);
  }, [user.id]);

  function unsetUser() {
    localStorage.clear();
    setCartCount(0);
  }

  return (
    <UserProvider
      value={{
        user,
        setUser,
        unsetUser,
        cartCount,
        setCartCount,
      }}
    >
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/q" element={<ProductSearch />} />
          <Route path="/products/:productId" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category/:category" element={<Category />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
