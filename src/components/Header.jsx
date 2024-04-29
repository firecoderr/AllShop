/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header({
  links,
  setProducts,
  setNewAdded,
  handleCloseModal,
  showModal,
  notification,
  setNotification,
  setDetail,
}) {
  const header = useRef();

  const navigate = useNavigate();

  // Switch Login
  const [switchLogin, setSwitchLogin] = useState(true);

  const [alert, setAlert] = useState(false);

  const [wrongAlert, setWrongAlert] = useState(false);

  // ==================================================================

  // Login
  const [login, setLogin] = useState(
    JSON.parse(localStorage.getItem("LOGIN")) || []
  );
  localStorage.setItem("LOGIN", JSON.stringify(login));

  // Login Username and Password
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ===================================================================

  // Users
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("USERS")) || []
  );
  localStorage.setItem("USERS", JSON.stringify(users));

  // ****************************************
  // Login the User
  const loginUser = () => {
    if (
      users.some(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      )
    ) {
      setTimeout(() => {
        handleCloseModal((prev) => !prev);
        setLogin(users.filter((user) => user.username === loginUsername));
      }, 1);
      location.reload();
    } else {
      setWrongAlert((prev) => !prev);

      setTimeout(() => {
        setWrongAlert((prev) => !prev);
      }, 2000);
    }
  };
  // ****************************************

  // Sign Username and Password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Sign The User Up
  const signUser = (e) => {
    e.preventDefault();

    if (!users.some((user) => user.username === username)) {
      handleCloseModal((prev) => !prev);
      location.reload();

      setTimeout(() => {
        setUsers((prev) => [...prev, { username, password, orders: [] }]);
        setLogin([{ username, password, orders: [] }]);
      }, 1);
    } else {
      // alert("Such username already exists");
      setAlert((prev) => !prev);

      setTimeout(() => {
        setAlert((prev) => !prev);
      }, 2000);
    }
  };

  // ====================================================================

  // CART
  const cart = JSON.parse(localStorage.getItem("NEWADDED"));

  // Quantity
  const quantity = cart?.reduce((value, item) => {
    return (value += item.quantity);
  }, 0);

  // Set Shadow to The Header When Scrolled
  const [scrollHeight, setScrollHeight] = useState(window.scrollY);
  const [width, setWidth] = useState(window.innerWidth);

  console.log(width);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  });

  document.addEventListener("scroll", () => {
    setScrollHeight(window.scrollY);
  });

  // Search Filter Value
  const [searchValue, setSearchValue] = useState("");

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchValue("");
    setProducts(searchResults);

    searchValue !== "" &&
      setTimeout(() => {
        navigate("/search-results");
      }, 1);
  };

  // For Filter
  const forFilter = JSON.parse(localStorage.getItem("FORFILTER"));

  const searchResults = forFilter.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  console.log(searchResults);

  // Navbar
  const navbar = useRef();
  const toggleBtn = useRef();

  return (
    <>
      {alert && (
        <Alert
          style={{ zIndex: "2000" }}
          className="animate__animated animate__bounceInDown animate__faster fixed-top py-4 text-center"
          variant="warning"
        >
          Such username already exists!
        </Alert>
      )}

      {wrongAlert && (
        <Alert
          style={{ zIndex: "2000" }}
          className="animate__animated animate__bounceInDown animate__faster fixed-top py-4 text-center"
          variant="warning"
        >
          Wrong username or password!
        </Alert>
      )}

      {/* Modal Login */}
      <Modal
        show={showModal}
        centered
        onHide={handleCloseModal}
        style={{
          width: "400px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        className="mx-auto modal-login"
      >
        {switchLogin ? (
          <>
            {/* Login */}
            <Modal.Header className="border-0 pt-4" closeButton>
              <Modal.Title className="text-center w-100 fw-bold">
                Login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginUser();
                }}
                className="d-grid gap-3"
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => setLoginUsername(e.target.value)}
                    value={loginUsername}
                    required
                    type="text"
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="info"
                  className="text-light mt-4"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="py-4">
              <p className="text-center w-100">
                Don't have an account?{" "}
                <a
                  href="#signup"
                  onClick={() => setSwitchLogin((prev) => !prev)}
                >
                  Sign here
                </a>
              </p>
            </Modal.Footer>
          </>
        ) : (
          <>
            {/* Sign Up */}
            <Modal.Header className="border-0 pt-4" closeButton>
              <Modal.Title className="text-center w-100 fw-bold">
                Sign Up
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
              <Form onSubmit={(e) => signUser(e)} className="d-grid gap-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    type="text"
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="info"
                  className="text-light mt-4"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="py-4">
              <p
                onClick={() => setSwitchLogin((prev) => !prev)}
                className="text-center w-100"
              >
                Already have an account? <a href="#login">Login here</a>
              </p>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <Navbar
        ref={header}
        expand=""
        className={
          scrollHeight > 30
            ? "fixed-top py-3 border-bottom shadow"
            : "fixed-top py-3"
        }
        bg="light"
        variant="light"
      >
        <Container>
          <Row className="w-100 row-cols-1">
            <Col className="d-flex justify-content-between align-items-center">
              <Navbar.Brand
                // href="/"
                onClick={() => {
                  navigate("/");
                  setProducts([]);
                  window.scrollTo(0, 0);
                }}
                className="d-flex align-items-center fs-4 fw-bold text-dark"
              >
                <Image src="logo.jpg" height="40" />
                AllShop
              </Navbar.Brand>

              <Form
                onSubmit={handleSubmit}
                className="d-flex gap-1 align-items-center"
              >
                <div
                  style={{ transition: ".3s" }}
                  className={
                    width > 600
                      ? "search-bar d-flex gap-2"
                      : "search-bar d-none gap-2"
                  }
                >
                  <Form.Control
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    className="shadow-none mr-sm-2"
                    style={{ borderColor: "#3AB54AFF" }}
                  />
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#3AB54AFF" }}
                    className="text-light border-0"
                  >
                    <li className="fa-solid fa-search"></li>
                  </Button>

                  {searchValue !== "" && (
                    <ul
                      className="bg-light w-100 shadow-lg border searchResults"
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "58px",
                        listStyle: "none",
                        padding: "0",
                      }}
                    >
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map((item) => {
                            return (
                              <li
                                onClick={() => {
                                  setDetail(item);
                                  setSearchValue("");
                                  setTimeout(() => {
                                    navigate("/product-detail");
                                  }, 1);
                                }}
                                title={item.title}
                                style={{ cursor: "pointer" }}
                                key={crypto.getRandomValues}
                                className="p-2 border-bottom border-secondary"
                              >
                                <Image src={item.image} width="40" />{" "}
                                {item.title}
                              </li>
                            );
                          })}
                        </>
                      ) : (
                        <li className="p-2 py-3 text-center">Nothing found!</li>
                      )}
                    </ul>
                  )}
                </div>
                <div
                  style={{ transition: ".3s" }}
                  className={
                    scrollHeight > 30 && width < 600
                      ? "search-bar d-flex gap-2"
                      : "search-bar d-none gap-2"
                  }
                >
                  <Form.Control
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    className="shadow-none mr-sm-2"
                    style={{ borderColor: "#3AB54AFF" }}
                  />
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#3AB54AFF" }}
                    className="text-light border-0"
                  >
                    <li className="fa-solid fa-search"></li>
                  </Button>

                  {searchValue !== "" && (
                    <ul
                      className="bg-light w-100 shadow-lg border searchResults"
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "58px",
                        listStyle: "none",
                        padding: "0",
                      }}
                    >
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map((item) => {
                            return (
                              <li
                                onClick={() => {
                                  setDetail(item);
                                  setSearchValue("");
                                  setTimeout(() => {
                                    navigate("/product-detail");
                                  }, 1);
                                }}
                                title={item.title}
                                style={{ cursor: "pointer" }}
                                key={crypto.getRandomValues}
                                className="p-2 border-bottom border-secondary"
                              >
                                <Image src={item.image} width="40" />{" "}
                                {item.title}
                              </li>
                            );
                          })}
                        </>
                      ) : (
                        <li className="p-2 py-3 text-center">Nothing found!</li>
                      )}
                    </ul>
                  )}
                </div>

                <li
                  onClick={() => {
                    navigate("/my-cart");
                    setNewAdded([]);
                  }}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    color: "#3AB54AFF",
                  }}
                  className="fa-solid fa-cart-shopping fs-3 mx-3"
                >
                  {cart.length > 0 && (
                    <span
                      className="text-light p-3 fs-6 d-flex justify-content-center align-items-center rounded-pill"
                      style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-15px",
                        backgroundColor: "red",
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    >
                      {quantity}
                    </span>
                  )}
                </li>

                {/* login or Profile */}
                {login.length > 0 ? (
                  <li
                    onClick={() => {
                      setNotification((prev) => {
                        return { ...prev, profile: false };
                      });
                      navigate("/profile");
                      window.scrollTo(0, 0);
                    }}
                    className="fa-solid fa-user fs-3 mx-1"
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      color: "#3AB54AFF",
                    }}
                  >
                    {notification.profile && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "-2px",
                          width: "12px",
                          height: "12px",
                          backgroundColor: "red",
                        }}
                        className="animate__animated animate__heartBeat animate__infinite rounded-pill"
                      ></div>
                    )}
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      handleCloseModal();
                    }}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      color: "#3AB54AFF",
                    }}
                    className="fa-solid fa-right-to-bracket fs-3 mx-1"
                  ></li>
                )}

                <Navbar.Toggle
                  ref={toggleBtn}
                  className="shadow-none ms-3"
                  aria-controls="navbar-collapse-id"
                />
              </Form>
            </Col>

            <Col>
              <Navbar.Collapse ref={navbar} id="navbar-collapse-id">
                <Nav className="header-navbar mr-auto mt-4">
                  {links?.map((link) => {
                    return (
                      <Nav.Link
                        onClick={(e) => {
                          window.scrollTo(0, 500);
                          setProducts(
                            forFilter.filter(
                              (p) =>
                                p?.category ===
                                e?.target.textContent.toLowerCase()
                            )
                          );

                          navigate("/search-results");
                          // console.log(navbar.current.classList);
                          navbar.current.classList.remove("show");
                        }}
                        className="link p-2 text-capitalize fs-6"
                        key={crypto.randomUUID()}
                      >
                        {link}
                      </Nav.Link>
                    );
                  })}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}
