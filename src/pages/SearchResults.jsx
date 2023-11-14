/* eslint-disable react/prop-types */
import Header from "../components/Header";
import { Carousel, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function About({
  products,
  loading,
  links,
  setDetail,
  newAdded,
  setNewAdded,
  setProducts,
  handleCloseModal,
  showModal,
  notification,
  setNotification,
}) {
  // Navigate
  const navigate = useNavigate();

  // Recently Seen
  const [recently, setRecently] = useState(
    JSON.parse(localStorage.getItem("RECENTLY")) || []
  );
  localStorage.setItem("RECENTLY", JSON.stringify(recently));

  // Handle Click
  const handleClick = (product) => {
    const index = products.findIndex((item) => item?.id === product.id);
    const clickedProduct = products[index];

    setDetail(clickedProduct);
    window.scroll(0, 0);

    // Add to Recently Seen
    !recently.some((r) => r.id === product.id) &&
      setRecently((prev) => [...prev, product]);
    console.log(product, recently);

    setTimeout(() => {
      navigate("/product-detail");
    }, 1);
  };

  // Search Item Count
  const searchCount = products.length;

  return (
    <>
      {/* Header */}
      <Header
        setProducts={setProducts}
        links={links}
        newAdded={newAdded}
        setNewAdded={setNewAdded}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        notification={notification}
        setNotification={setNotification}
        setDetail={setDetail}
      />

      {/* Carousel */}
      <Container fluid className="p-0" style={{ marginTop: "86px" }}>
        <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://content.vodafone.co.nz/dims4/default/d98478e/2147483647/strip/true/crop/2360x640+0+0/resize/1640x445!/quality/90/?url=http%3A%2F%2Fvodafonenz-brightspot.s3.amazonaws.com%2F3d%2F7e%2Fbc19d8a74fcea1c2532b2199c4b0%2Fcbu-presale-family-page-hello-banner-desktop-banner-iphone-12-pro-no-cta-copy-2x.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://journeyofficial.com/cdn/shop/files/iPhone-15-accessories-collections-banner_fd75ad22-dfde-4dc6-823c-4b183bcce66a.jpg?v=1694666808&width=2500"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://at-store.ru/uploadedFiles/newsimages/big/43kcyy.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Product List */}
      <Container className="p-3">
        <Row>
          <Col className="p-3">
            <h5>
              <span className="fw-bold">Search results</span> {searchCount}{" "}
              items found
            </h5>
          </Col>
        </Row>
        {loading ? (
          <Spinner
            animation="border"
            role="status"
            className="d-block mt-5 p-5 fs-1 mx-auto"
            style={{ color: "#3AB54AFF" }}
          />
        ) : (
          <Row
            key={crypto.randomUUID()}
            lg={4}
            md={3}
            sm={2}
            className="row-cols-2"
          >
            {products.map((item) => {
              return (
                <>
                  <Col key={crypto.randomUUID()}>
                    <div
                      onClick={() => {
                        handleClick(item);
                      }}
                      id={item?.id}
                      className=" p-1 mb-4 product w-100 d-flex flex-column gap-2 align-items-center"
                    >
                      <img
                        className="product-image"
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
                  </Col>
                </>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}

export default About;
