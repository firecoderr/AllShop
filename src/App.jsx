import "./App.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/MyCart";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Footer from "./components/Footer/Footer";

const URL = "https://fakestoreapi.com/products";

export default function App() {
  // For Filter
  const [forFilter, setForFilter] = useState(
    JSON.parse(localStorage.getItem("FORFILTER")) || []
  );
  localStorage.setItem("FORFILTER", JSON.stringify(forFilter));

  // Products
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("PRODUCTS")) || []
  );
  localStorage.setItem("PRODUCTS", JSON.stringify(products));

  // Cart List
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("CART")) || []
  );
  localStorage.setItem("CART", JSON.stringify(cartList));

  // Product Detail
  const [detail, setDetail] = useState(
    JSON.parse(localStorage.getItem("DETAIL")) || []
  );
  localStorage.setItem("DETAIL", JSON.stringify(detail));

  // Loading
  const [loading, setLoading] = useState(false);

  // Nav Link Categories
  const links = forFilter.reduce((value, item) => {
    if (!value.includes(item?.category)) {
      value.push(item?.category);
    }

    return value;
  }, []);

  // New Added
  const [newAdded, setNewAdded] = useState(
    JSON.parse(localStorage.getItem("NEWADDED")) || []
  );
  localStorage.setItem("NEWADDED", JSON.stringify(newAdded));

  // API
  useEffect(() => {
    setLoading(true);

    async function getData() {
      const response = await fetch(URL);
      const data = await response.json();
      setLoading(false);
      products.length === 0 && setProducts(data);
      setForFilter(data);
    }

    getData();
  }, []);

  // Show Modal
  const [showModal, setShowModal] = useState(false);

  // Modal Function
  const handleCloseModal = () => {
    setShowModal((prev) => !prev);
  };

  // Notification
  const [notification, setNotification] = useState(
    JSON.parse(localStorage.getItem("NOTIFICATION")) || {
      profile: false,
      myOrder: false,
    }
  );
  localStorage.setItem("NOTIFICATION", JSON.stringify(notification));

  return (
    <>
      {/* About Page */}
      <Routes>
        <Route
          path="/"
          element={
            <About
              setProducts={setProducts}
              links={links}
              products={products}
              setDetail={setDetail}
              loading={loading}
              setNewAdded={setNewAdded}
              newAdded={newAdded}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              notification={notification}
              setNotification={setNotification}
            />
          }
        ></Route>

        <Route
          path="/search-results"
          element={
            <SearchResults
              setProducts={setProducts}
              links={links}
              products={products}
              setDetail={setDetail}
              loading={loading}
              setNewAdded={setNewAdded}
              newAdded={newAdded}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              notification={notification}
              setNotification={setNotification}
            />
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <Profile
              links={links}
              setNewAdded={setNewAdded}
              setProducts={setProducts}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              notification={notification}
              setNotification={setNotification}
              setDetail={setDetail}
            />
          }
        ></Route>

        {/* Product Details */}
        <Route
          path="/product-detail"
          element={
            <ProductDetail
              setProducts={setProducts}
              setDetail={setDetail}
              setCartList={setCartList}
              detail={detail}
              links={links}
              setNewAdded={setNewAdded}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              notification={notification}
              setNotification={setNotification}
            />
          }
        ></Route>

        {/* My Cart */}
        <Route
          path="/my-cart"
          element={
            <MyCart
              setProducts={setProducts}
              setDetail={setDetail}
              links={links}
              setCartList={setCartList}
              loading={loading}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              notification={notification}
              setNotification={setNotification}
            />
          }
        ></Route>
      </Routes>

      <Footer />
    </>
  );
}
