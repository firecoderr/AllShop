import React from "react";
import Header from "../components/Header";
import {
  Container,
  Table,
  Image,
  Button,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCart({
  links,
  setCartList,
  setDetail,
  setProducts,
  handleCloseModal,
  showModal,
  notification,
  setNotification,
}) {
  // Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // CART
  const cart = JSON.parse(localStorage.getItem("CART"));

  // Total Price
  const totalPrice = cart.reduce((value, item) => {
    return (value += item.total);
  }, 0);

  // Increase and Decrease Quantity
  const plusQuantity = (item) => {
    setCartList((prev) =>
      prev.map((p) => {
        return p.id === item.id
          ? {
              ...p,
              quantity: p.quantity + 1,
              total: (p.quantity + 1) * p.price,
            }
          : p;
      })
    );
  };

  const minusQuantity = (item) => {
    setCartList((prev) =>
      prev.map((p) => {
        return p.id === item.id && p.quantity > 1
          ? {
              ...p,
              quantity: p.quantity - 1,
              total: (p.quantity - 1) * p.price,
            }
          : p;
      })
    );
  };

  const navigate = useNavigate();

  const login = JSON.parse(localStorage.getItem("LOGIN"));

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("USERS")) || []
  );
  localStorage.setItem("USERS", JSON.stringify(users));

  const myCart = JSON.parse(localStorage.getItem("CART"));

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  });

  const date = new Date().toLocaleString();

  const [checkoutDone, setCheckoutDone] = useState(false);

  // Checkout Funtion Itself
  const checkoutFunction = () => {
    setUsers((prev) =>
      prev.map((user) => {
        if (
          user.username === login[0]?.username &&
          user.password === login[0]?.password
        ) {
          setLoading(true);

          setTimeout(() => {
            setCheckoutDone(true);
          }, 1000);

          setTimeout(() => {
            setNotification({ profile: true, myOrder: true });
            setCartList([]);
            navigate("/");
          }, 2000);
          return {
            ...user,
            orders: [...user.orders, { products: myCart, time: date }],
          };
        } else {
          return { ...user, orders: [] };
        }
      })
    );

    // setUsers([
    //   { username: "admin", password: "admin", orders: [] },
    //   { username: "ulugbek", password: "2003", orders: [] },
    // ]);
  };

  // Checkout
  const checkout = () => {
    return login.length > 0
      ? checkoutFunction()
      : handleCloseModal((prev) => !prev);
  };

  return (
    <>
      {/* Checkout Successfully Done */}
      {checkoutDone && (
        <Alert
          style={{ zIndex: "2000" }}
          className="fixed-top text-center py-4"
          variant="success"
        >
          <Alert.Heading className="fs-2">
            Successfully submitted!
          </Alert.Heading>
          <hr />
          <p className="mb-0">We will be in touch with you soon.</p>
        </Alert>
      )}

      {/* Header */}
      <Header
        links={links}
        setProducts={setProducts}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        notification={notification}
        setNotification={setNotification}
        setDetail={setDetail}
      />

      {/* Cart List */}
      <Container
        style={{
          marginTop: "120px",
          marginBottom: "120px",
          minHeight: "300px",
        }}
      >
        <Row>
          <Col>
            <h2 className="py-3 text-decoration-underline">My Cart</h2>
          </Col>
        </Row>
        {loading ? (
          <Spinner
            animation="border"
            role="status"
            className="d-block mt-5 p-5 fs-1 mx-auto"
            style={{ color: "#3AB54AFF" }}
          />
        ) : cart.length > 0 ? (
          <>
            <Table striped bordered responsive hover>
              <thead className="text-center">
                <tr>
                  <th>#</th>
                  <th>image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  return (
                    <tr key={crypto.randomUUID()}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          className="d-block mx-auto"
                          src={item.image}
                          height={40}
                        />
                      </td>
                      <td
                        className="my-cart-title"
                        onClick={() => {
                          setDetail(item);
                          navigate("/product-detail");
                        }}
                      >
                        {item.title}
                      </td>
                      <td className="text-center">
                        ${item.price.toLocaleString()}
                      </td>
                      <td className="text-center align-items-center justify-content-center">
                        <Button
                          onClick={() => plusQuantity(item)}
                          className="p-1"
                          variant="light"
                        >
                          +
                        </Button>{" "}
                        <span className="mx-1">{item.quantity}</span>
                        <Button
                          onClick={() => minusQuantity(item)}
                          className="p-1"
                          variant="light"
                        >
                          -
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="d-block mx-auto"
                          size="sm"
                          variant="outline-danger"
                          onClick={() => {
                            setCartList((prev) =>
                              prev.filter((p) => p?.id !== item.id)
                            );
                          }}
                        >
                          remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row className="row-cols-1">
              <Col className="d-flex gap-5 justify-content-end align-items-center">
                <h4 className="fw-bold">Total price:</h4>
                <h4>${totalPrice.toLocaleString()}</h4>
              </Col>
              <Col className="d-flex mt-5 gap-5 justify-content-center align-items-center">
                <Button
                  className="w-100 shadow"
                  variant="dark"
                  onClick={() => checkout()}
                >
                  Checkout
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <h2 className="text-center pt-5">Your card is empty!</h2>
        )}
      </Container>
    </>
  );
}
