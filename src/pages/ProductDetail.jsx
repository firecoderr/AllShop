import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import { useEffect } from "react";

export default function ProductDetail({
  setCartList,
  links,
  detail,
  setDetail,
  setNewAdded,
  setProducts,
  handleCloseModal,
  showModal,
  notification,
  setNotification,
}) {
  const [count, setCount] = useState(1);

  // Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Alert Such Item Already Exists!
  const [itemAlert, setItemAlert] = useState(false);

  // CART
  const cart = JSON.parse(localStorage.getItem("CART"));

  // Added To The Cart
  const added = cart?.some((item) => item?.id === detail?.id);

  // Show Alert
  const showAlert = () => {
    setItemAlert(true);

    setTimeout(() => {
      setItemAlert(false);
    }, 2000);
  };

  // Add to Cart Function
  const addToCart = () => {
    if (!cart?.some((item) => item?.id === detail?.id)) {
      setCartList((prev) => [
        ...prev,
        { ...detail, quantity: count, total: count * detail?.price },
      ]);

      setNewAdded((prev) => [
        ...prev,
        { ...detail, quantity: count, total: count * detail?.price },
      ]);

      showAlert();
    } else {
      setCartList((prev) => prev.filter((item) => item?.id !== detail?.id));

      setNewAdded((prev) => prev.filter((item) => item?.id !== detail?.id));

      showAlert();
    }

    setCount(1);
  };

  // For Filter
  const forFilter = JSON.parse(localStorage.getItem("FORFILTER"));
  const similarItems = forFilter.filter(
    (item) => item?.category === detail?.category && item?.id !== detail?.id
  );

  const navigate = useNavigate();

  // Handle Click
  const handleClick = (id) => {
    const index = forFilter.findIndex((item) => item?.id === id);
    const clickedProduct = forFilter[index];

    setDetail(clickedProduct);
    navigate("/product-detail");
    window.scroll(0, 0);
  };

  // Similar Slider
  const similarSlider = useRef();

  const recentSlider = useRef();

  // Should Arrow Appear
  const [arrows, setArrows] = useState(false);

  useEffect(() => {
    similarItems.length * 228 >= similarSlider.current?.offsetWidth + 50
      ? setArrows(true)
      : setArrows(false);

    window.addEventListener("resize", () => {
      similarItems.length * 228 >= similarSlider.current?.offsetWidth + 50
        ? setArrows(true)
        : setArrows(false);
    });
  }, []);

  // Slider Effect
  useEffect(() => {
    setInterval(() => {
      const endScroll =
        similarSlider.current?.scrollWidth - similarSlider.current?.clientWidth;

      if (
        similarItems.length * 228 >=
        similarSlider.current?.offsetWidth + 50
      ) {
        similarSlider.current?.scrollLeft === endScroll
          ? (similarSlider.current.scrollLeft = 0)
          : (similarSlider.current.scrollLeft += 228);
      }
    }, 3000);
    // console.log(similarSlider.current.scrollLeft);
  }, []);

  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("RECENTLY")) || []
  );
  localStorage.setItem("RECENTLY", JSON.stringify(recent));

  // Recently Seen
  const recently = recent.filter((f) => f.id !== detail?.id).reverse();

  const addToRecent = (product) => {
    !recent.some((r) => r?.id === product?.id) &&
      setRecent((prev) => [...prev, product]);
  };

  // Recent Slider
  const [sliderArrow, setSliderArrow] = useState(false);

  useEffect(() => {
    if (recently.length * 250 > recentSlider.current?.offsetWidth) {
      setSliderArrow(true);
    } else {
      setSliderArrow(false);
    }

    console.log(recently.length * 250, recentSlider.current?.offsetWidth);

    window.addEventListener("resize", () => {
      if (recently.length * 250 > recentSlider.current?.offsetWidth) {
        setSliderArrow(true);
        console.log(recently.length * 250, recentSlider.current?.offsetWidth);
      } else {
        setSliderArrow(false);
      }
    });
  }, [recently.length]);

  return (
    <>
      {/* Alert */}
      {itemAlert && (
        <Alert
          style={{ zIndex: "2000" }}
          className="animate__animated animate__bounceInDown animate__fast text-center fixed-top py-4"
          variant="success"
        >
          {added ? "Added to your cart!" : "Removed from your cart!"}
        </Alert>
      )}

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

      {/* Product Detail */}
      <Container style={{ marginTop: "140px" }}>
        {loading ? (
          <Spinner
            animation="border"
            role="status"
            className="d-block mt-5 p-5 fs-1 mx-auto"
            style={{ color: "#3AB54AFF" }}
          />
        ) : (
          <>
            <Row md={2} className="row-cols-1 g-5 pb-5">
              <Col className="d-flex justify-content-md-end">
                <img
                  style={{ height: "350px", objectFit: "scale-down" }}
                  className="p-3 w-100 border"
                  src={detail?.image}
                  alt=""
                />
              </Col>
              <Col>
                <h1 className="fs-3 fw-bold text-dark">{detail?.title}</h1>
                <h3 className="fs-3 fw-normal">
                  {" "}
                  <li className="fa-solid fa-star text-warning"></li>{" "}
                  {detail?.rating?.rate}
                </h3>
                <h3 className="fs-3 fw-bold">${detail?.price}</h3>
                <div className="d-flex align-items-center gap-3 fs-2">
                  <Button
                    onClick={() => setCount((prev) => prev + 1)}
                    variant="light"
                    className="border border-dark"
                  >
                    +
                  </Button>
                  <span>{count.toLocaleString()}</span>
                  <Button
                    onClick={() =>
                      setCount((prev) => (count > 1 ? prev - 1 : prev - 0))
                    }
                    variant="light"
                    className="border border-dark"
                  >
                    -
                  </Button>

                  {count > 1 && (
                    <span className="text-secondary ms-2 fs-4 fw-bold">
                      = ${count * detail.price}
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={addToCart}
                  className={
                    added ? "mt-3 border border-success text-success" : "mt-3"
                  }
                  variant={added ? "light" : "success bg-gradient"}
                >
                  {added ? "Added" : "Add to cart"}
                </Button>
                <p className="lh-base mt-4 text-space">{detail?.description}</p>
              </Col>
            </Row>

            <Row className="row-cols-1 px-2">
              <Col className="border-bottom border-dark fs-5">
                Similar products
              </Col>
              <Col style={{ position: "relative" }}>
                {/* Arrow Buttons */}
                {arrows && (
                  <>
                    <li
                      onClick={() => (similarSlider.current.scrollLeft -= 228)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        zIndex: "10",
                        cursor: "pointer",
                        transform: "translateY(-50%)",
                      }}
                      className="fa-solid fa-arrow-left p-3 rounded-pill fw-bold bg-success shadow text-light"
                    ></li>

                    <li
                      onClick={() => (similarSlider.current.scrollLeft += 228)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "0",
                        zIndex: "10",
                        cursor: "pointer",
                        transform: "translateY(-50%)",
                      }}
                      className="fa-solid fa-arrow-right p-3 rounded-pill fw-bold bg-success shadow text-light"
                    ></li>
                  </>
                )}

                <div ref={similarSlider} className="d-flex similar-products">
                  {similarItems.map((item) => {
                    return (
                      <>
                        <div
                          onClick={() => addToRecent(item)}
                          style={{ width: "250px" }}
                          key={item?.id}
                        >
                          <div
                            onClick={() => handleClick(item.id)}
                            id={item?.id}
                            className=" p-4 product d-flex flex-column gap-2 align-items-center"
                          >
                            <img
                              className="product-image"
                              style={{ width: "180px", height: "150px" }}
                              src={item?.image}
                              alt={item?.title}
                            />
                            <h6 className="product-title text-center">
                              {item?.title}
                            </h6>
                            <h6
                              style={{ backgroundColor: "#3AB54AFF" }}
                              className="fw-bold text-light py-1 px-2 rounded"
                            >
                              ${item?.price}
                            </h6>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </Col>
            </Row>

            {recently.length > 0 && (
              <>
                <div style={{ position: "relative" }} className="px-2 mt-5">
                  {/* Arrow Buttons */}
                  {sliderArrow && (
                    <>
                      <li
                        onClick={() => (recentSlider.current.scrollLeft -= 250)}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "0",
                          zIndex: "10",
                          cursor: "pointer",
                          transform: "translateY(-50%)",
                        }}
                        className="fa-solid fa-arrow-left p-3 rounded-pill fw-bold bg-success shadow text-light"
                      ></li>

                      <li
                        onClick={() => (recentSlider.current.scrollLeft += 250)}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "0",
                          zIndex: "10",
                          cursor: "pointer",
                          transform: "translateY(-50%)",
                        }}
                        className="fa-solid fa-arrow-right p-3 rounded-pill fw-bold bg-success shadow text-light"
                      ></li>
                    </>
                  )}
                  <div className="border-bottom border-dark fs-5">
                    Recently seen
                  </div>
                  <div>
                    <button
                      onClick={() => setRecent([])}
                      className="border-0 bg-white d-block mt-2 ms-auto text-decoration-underline"
                    >
                      clear
                    </button>
                  </div>
                  <div>
                    <div
                      style={{
                        overflowX: "hidden",
                        overflowY: "hidden",
                        position: "relative",
                        scrollBehavior: "smooth",
                      }}
                      className="d-flex"
                      ref={recentSlider}
                    >
                      {recently.map((item) => {
                        return (
                          <>
                            <div className="d-flex justify-content-center ">
                              {" "}
                              <div style={{ width: "250px" }} key={item?.id}>
                                <div
                                  onClick={() => handleClick(item.id)}
                                  id={item?.id}
                                  className=" p-4 product d-flex flex-column gap-2 align-items-center"
                                >
                                  <img
                                    className="product-image"
                                    style={{ width: "180px", height: "150px" }}
                                    src={item?.image}
                                    alt={item?.title}
                                  />
                                  <h6 className="product-title text-center">
                                    {item?.title}
                                  </h6>
                                  <h6
                                    style={{ backgroundColor: "#3AB54AFF" }}
                                    className="fw-bold text-light py-1 px-2 rounded"
                                  >
                                    ${item?.price}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
