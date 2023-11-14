/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Image,
  Form,
  Modal,
} from "react-bootstrap";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Profile({
  links,
  setProducts,
  setNewAdded,
  handleCloseModal,
  showModal,
  notification,
  setNotification,
  setDetail,
}) {
  const navigate = useNavigate();

  // USERS
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("USERS")));

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  });

  // login
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("LOGIN")));

  useEffect(() => {
    localStorage.setItem("LOGIN", JSON.stringify(login));
  });

  //   Current login
  const currentLogin = users.filter(
    (user) => user?.username === login[0]?.username
  );

  // Orders
  const orders = currentLogin[0]?.orders;

  const [routing, setRouting] = useState("my-order");

  // Seetting The Order
  const [order, setOrder] = useState([]);

  //***********************************************
  // Cancel The Order
  const cancelOrder = () => {
    setUsers((user) =>
      user.map((usr) => {
        return usr.username === currentLogin[0].username
          ? { ...usr, orders: orders.filter((ord) => ord.time !== order.time) }
          : usr;
      })
    );

    setRouting("my-order");
  };

  // Reveal the Password
  const [reveal, setReveal] = useState(false);

  // Change The Username and Password
  const [changeAccount, setChangeAccount] = useState({
    username: currentLogin[0]?.username,
    password: currentLogin[0]?.password,
  });

  // Change Account Function
  const changeAccountFunc = (changeUsername, changePassword) => {
    setUsers((user) =>
      user.map((usr) => {
        return usr.username === currentLogin[0]?.username
          ? { ...usr, username: changeUsername, password: changePassword }
          : usr;
      })
    );

    setLogin((prev) => {
      return [
        { ...prev[0], username: changeUsername, password: changePassword },
      ];
    });

    console.log(login);
    setRouting("account");
  };

  // Open Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);

  // Delete Account Function
  const deleteAccount = () => {
    setUsers((user) =>
      user.filter((usr) => {
        return usr?.username !== login[0]?.username;
      })
    );

    setLogin([]);

    setTimeout(() => {
      navigate("/");
      location.reload();
    }, 1);
  };

  return (
    <>
      {/* Header */}
      <Header
        links={links}
        setNewAdded={setNewAdded}
        setProducts={setProducts}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        notification={notification}
        setNotification={setNotification}
        setDetail={setDetail}
      />

      {/* Delete The Account Modal */}
      <Modal
        centered
        show={deleteModal}
        onHide={() => setDeleteModal((prev) => !prev)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>Are you sure to deleting this account?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteAccount}>
            Delete
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => setDeleteModal((prev) => !prev)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Profile */}
      <Container className="p-3" style={{ marginTop: "90px" }}>
        <Row className="row-cols-1">
          <Col className="bg-dark text-light p-2 px-3 px-sm-5 fs-5 mb-3 rounded d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              Hello, {currentLogin[0]?.username}!
            </div>
            <Button
              variant="light"
              onClick={() => {
                localStorage.setItem("LOGIN", JSON.stringify([]));
                navigate("/");
              }}
            >
              Log out
            </Button>
          </Col>
          <Col>
            <Row>
              {/* nav buttons */}
              <Col
                style={{ maxHeight: "250px" }}
                lg={3}
                className="profile-navbar col-1 p-2 border me-lg-3 me-1 rounded shadow"
              >
                <Button
                  style={{ position: "relative" }}
                  active={
                    routing === "my-order" || routing === "specific-order"
                      ? true
                      : false
                  }
                  className="d-flex justify-content-between align-items-center text-start w-100 mb-2 border"
                  variant="light"
                  onClick={() => setRouting("my-order")}
                >
                  <div>
                    <i className="fa-solid fa-bag-shopping"></i>{" "}
                    <span className="d-none d-lg-inline">My Orders</span>
                  </div>

                  {notification.myOrder && (
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "red",
                        position: "absolute",
                        top: "-3px",
                        right: "-2px",
                      }}
                      className="animate__animated animate__heartBeat animate__infinite rounded-pill"
                    ></div>
                  )}
                </Button>

                <Button
                  active={
                    routing === "account" || routing === "change-account"
                      ? true
                      : false
                  }
                  className="d-block text-start w-100 border"
                  variant="light    "
                  onClick={() => setRouting("account")}
                >
                  <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                  <span className="d-none d-lg-inline">Account settings</span>
                </Button>
              </Col>

              <Col
                style={{ minHeight: "400px" }}
                className="border shadow-lg rounded p-3 px-4 fs-4"
              >
                {/* My Order */}
                <Row
                  className={routing === "my-order" ? "row-cols-1" : "d-none"}
                >
                  <Col className="border-bottom border-dark pb-2">
                    My Orders
                  </Col>
                  {orders?.length > 0 ? (
                    <Col className="py-3 px-0">
                      {orders.reverse().map((order, index) => {
                        return (
                          <Button
                            key={order.time}
                            variant="outline-light"
                            className="order-btn mb-1 d-flex justify-content-between w-100 border-0 border-bottom text-dark text-start rounded-0"
                            onClick={() => {
                              setRouting("specific-order");
                              setOrder(order);
                              setNotification(false);
                            }}
                          >
                            <span>
                              <span className="me-3">{index + 1}. </span>
                              <span className="order-text">{order.time}</span>
                            </span>

                            <span className=" order-text d-flex align-items-center gap-2">
                              status: pending{" "}
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                }}
                                className="animate__animated animate__heartBeat animate__infinite bg-warning rounded-pill"
                              ></div>
                            </span>
                          </Button>
                        );
                      })}
                    </Col>
                  ) : (
                    <Image src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" />
                  )}
                </Row>

                {/* Account */}
                <Row
                  className={routing === "account" ? "row-cols-1" : "d-none"}
                >
                  <Col className="border-bottom border-dark pb-2">
                    Account Settings
                  </Col>
                  <Col className="pt-4 ps-5">
                    <h4>
                      <span className="fw-bold">Username:</span>{" "}
                      {currentLogin[0]?.username}
                    </h4>
                    <div>
                      <h4>
                        <span className="fw-bold">Password:</span>{" "}
                        {reveal ? currentLogin[0]?.password : "********"}
                      </h4>

                      <Button
                        className="text-decoration-underline"
                        variant="light"
                        onClick={() => setReveal((prev) => !prev)}
                      >
                        {reveal ? "hide password" : "reveal password"}
                      </Button>
                    </div>
                  </Col>

                  <Col className="mt-5 d-flex gap-2 ps-5">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setRouting("change-account");
                        setChangeAccount({
                          username: currentLogin[0]?.username,
                          password: currentLogin[0]?.password,
                        });
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => setDeleteModal((prev) => !prev)}
                      variant="danger"
                    >
                      Delete account
                    </Button>
                  </Col>
                </Row>

                {/* Change Account */}
                <Row
                  className={
                    routing === "change-account" ? "row-cols-1" : "d-none"
                  }
                >
                  <Col className="border-bottom border-dark pb-2">
                    Change account
                  </Col>
                  <Col className="mt-4 ps-5">
                    <div className="mb-3">
                      <h4 className="d-flex align-items-center gap-2">
                        <span className="fw-bold">Username:</span>{" "}
                        <Form.Control
                          type="text"
                          style={{ maxWidth: "250px", width: "100%" }}
                          value={changeAccount.username}
                          onChange={(e) =>
                            setChangeAccount((prev) => {
                              return { ...prev, username: e.target.value };
                            })
                          }
                        />
                      </h4>
                    </div>
                    <div>
                      <h4 className="d-flex align-items-center gap-2">
                        <span className="fw-bold">Password:</span>{" "}
                        <Form.Control
                          type="text"
                          style={{ maxWidth: "250px", width: "100%" }}
                          value={changeAccount.password}
                          onChange={(e) =>
                            setChangeAccount((prev) => {
                              return { ...prev, password: e.target.value };
                            })
                          }
                        />
                      </h4>
                    </div>
                  </Col>

                  <Col className="mt-5 d-flex gap-2 ms-5">
                    <Button
                      className="bg-light text-dark"
                      variant="outline-dark"
                      onClick={() => setRouting("account")}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="success"
                      onClick={() =>
                        changeAccountFunc(
                          changeAccount.username,
                          changeAccount.password
                        )
                      }
                    >
                      Save
                    </Button>
                  </Col>
                </Row>

                {/* Specific Order */}
                <Row
                  className={
                    routing === "specific-order" ? "row-cols-1" : "d-none"
                  }
                >
                  <Col className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2">
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => setRouting("my-order")}
                      className="fa-solid fa-arrow-left"
                    ></i>

                    <span className="fs-5 order-text d-flex align-items-center gap-2">
                      Order pending{" "}
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                        }}
                        className="animate__animated animate__heartBeat animate__infinite bg-warning rounded-pill"
                      ></div>
                    </span>
                  </Col>
                  <Col>
                    <Table
                      className="fs-6 mt-3"
                      striped
                      bordered
                      responsive
                      hover
                    >
                      <thead className="text-center">
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products?.map((ord, index) => {
                          return (
                            <>
                              <tr key={"order" + crypto.randomUUID()}>
                                <td>{index + 1}</td>
                                <td>
                                  <Image
                                    height="50"
                                    className="d-block mx-auto"
                                    src={ord.image}
                                  />
                                </td>
                                <td>{ord.title}</td>
                                <td className="text-center">
                                  ${ord.price.toLocaleString()}
                                </td>
                                <td className="text-center">{ord.quantity}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                    <Col className="d-flex justify-content-between align-items-start mt-3">
                      <div className="fs-5">
                        <div>
                          <span className="fw-bolder">Total price:</span> $
                          {order.products
                            ?.reduce((value, item) => {
                              return (value += item.total);
                            }, 0)
                            .toLocaleString()}
                        </div>

                        <div>
                          <span className="fw-bolder">Total items:</span>{" "}
                          {order.products
                            ?.reduce((value, item) => {
                              return (value += item.quantity);
                            }, 0)
                            .toLocaleString()}
                        </div>
                      </div>

                      <Button variant="outline-danger" onClick={cancelOrder}>
                        Cancel
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
