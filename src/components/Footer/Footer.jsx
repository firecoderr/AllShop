import { Container, Row, Col, Form } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <footer className="bg-success mt-5 py-5 text-white">
        <Container>
          <Row>
            <Col className="col-12 col-md-6">
              <h2 className="fw-bold text-white">All Shop</h2>
              <p style={{ maxWidth: "400px" }} className="fw-light">
                loremasd asdkfao asfoaijdoiawd asoidoijadno asdoi aos doiasod
                oia d asdionoinado
              </p>
            </Col>
            <Col>
              <h3 className="fw-light align-items-stretch">Subscribe</h3>
              <div className="d-flex" style={{ position: "relative" }}>
                <Form.Control
                  className="shadow-none border-0 py-2"
                  type="email"
                  placeholder="Enter email"
                />
                <button
                  style={{ position: "absolute", right: "0", height: "100%" }}
                  className="border-0 bg-dark text-light rounded"
                >
                  subscribe
                </button>
              </div>
            </Col>
            <Col className="col-12 d-flex justify-content-center gap-3 fs-4 mt-5">
              <li
                style={{ cursor: "pointer" }}
                className="fa-brands fa-facebook"
              ></li>
              <li
                style={{ cursor: "pointer" }}
                className="fa-brands fa-instagram"
              ></li>
              <li
                style={{ cursor: "pointer" }}
                className="fa-brands fa-snapchat"
              ></li>
              <li
                style={{ cursor: "pointer" }}
                className="fa-brands fa-tiktok"
              ></li>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
