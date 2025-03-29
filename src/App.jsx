import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import KidsWear from "./components/KidsWear/KidsWear";
import MensWear from "./components/MensWear/MensWear";
import WomensWear from "./components/WomensWear/WomensWear";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const location = useLocation(); // Get the current route

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // Hide sections when visiting these routes
  const hideExtraSections = [
    "/womens-wear",
    "/mens-wear",
    "/kids-wear",
  ].includes(location.pathname);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleOrderPopup={handleOrderPopup} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero handleOrderPopup={handleOrderPopup} />
              <Products />
            </>
          }
        />
        <Route path="/womens-wear" element={<WomensWear />} />
        <Route path="/mens-wear" element={<MensWear />} />
        <Route path="/kids-wear" element={<KidsWear />} />
      </Routes>

      {/* Render these sections only if not in Womens, Mens, or Kids wear pages */}
      {!hideExtraSections && (
        <>
          <Subscribe />
          <TopProducts handleOrderPopup={handleOrderPopup} />
          <Banner />
          <Testimonials />
        </>
      )}

      <Footer />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
