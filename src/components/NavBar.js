import { Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { useSearchParams } from "react-router-dom";

function NavBar() {
  const { user, cartCount, setCartCount } = useContext(UserContext);
  const [userCart, setUserCart] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const query = new URLSearchParams({
      name: search,
    });

    setSearch("");
    navigate(`/q?${query}`);
  }

  function fetchData() {
    fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserCart(data);

        // setNumCartItems(data.products.length);
      });
  }
  console.log(userCart?.products);
  useEffect(() => {
    if (!user.isAdmin) {
      fetchData();
    }
  }, [userCart, cartCount, setCartCount]);

  console.log(search);
  return (
    <nav className="sticky-top pb-0">
      <div className="bg-success text-center text-white">
        Enjoy up to 50% off on all the latest deals in our GRANDEST Christmas
        sale yet! Add to cart now!!
      </div>
      <Container fluid className="mx-0 px-0">
        <div className="nav-bar">
          <Nav.Link as={NavLink} to="/">
            <div className="d-flex flex-column align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                fill="#c1121f"
                viewBox="0 0 256 256"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM128,160a48.05,48.05,0,0,1-48-48,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0A48.05,48.05,0,0,1,128,160ZM40,72V56H216V72Z"></path>
              </svg>
              <h2 className="d-inline brand-name">SHOPZILLA</h2>
            </div>
          </Nav.Link>
          <form onSubmit={handleSearch} className="search-bar">
            <input
              id="searchbar"
              placeholder="Enter search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <input type="submit"></input>
          </form>
          <div className="nav-links">
            <ul className="nav-links">
              <li className="link">
                <Nav.Link as={NavLink} to="/">
                  Categories
                </Nav.Link>
              </li>
              <li className="link">
                {user.id == null ? (
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                ) : !user.isAdmin ? (
                  <Nav.Link as={NavLink} to="/orders">
                    My Orders
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/orders">
                    Manage Orders
                  </Nav.Link>
                )}
              </li>
            </ul>
            <ul className="nav-links">
              {user.id || !user.isAdmin ? (
                <p
                  id="c-items-num"
                  className="d-flex align-items-center justify-content-center"
                >
                  {userCart.products?.length ?? cartCount ?? 0}
                </p>
              ) : null}
              <li className="link cart-link">
                <NavLink
                  as={NavLink}
                  to={
                    user.id && !user.isAdmin
                      ? "/cart"
                      : !user.isAdmin
                      ? "/login"
                      : "/"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 link-logo"
                  >
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                </NavLink>
              </li>
              <li className="link">
                <div className="d-flex gap-3">
                  <Nav.Link
                    as={NavLink}
                    to={user.id !== null ? "/account" : "/login"}
                    exact
                  >
                    {user.id && !user.isAdmin ? (
                      <img
                        className="m-1"
                        style={{ height: "25px", borderRadius: "20px" }}
                        src="https://i.pinimg.com/originals/24/70/0d/24700d0c4b8ca3600672cb09cd1a5681.png"
                      />
                    ) : (
                      <svg
                        id="user"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 link-logo"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Nav.Link>
                  <Nav.Link
                    style={{ fontSize: "1rem" }}
                    as={NavLink}
                    to={user.id == null ? "/login" : "/logout"}
                    exact
                  >
                    {user.id == null ? "Log in" : "Log out"}
                  </Nav.Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="categ-nav text-center" fluid>
        <ul className="mb-0 categ d-flex flex-row justify-content-start gap-4 mx-6 py-1">
          <li>
            <Nav.Link as={NavLink} to="/category/clothing">
              Clothing
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/Electronics">
              Electronics
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/furniture">
              Furniture
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/toys">
              Toys
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/gaming">
              Games
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/groceries">
              Groceries
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/appliance">
              Appliances
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/pets">
              Pets
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/beauty">
              Beauty
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/health">
              Health
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/outdoor">
              Outdoor
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="/category/automotive">
              Automotive
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="category/productivity">
              Productivity
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to="category/books">
              Books
            </Nav.Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
