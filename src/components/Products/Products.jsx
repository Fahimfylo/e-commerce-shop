import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineImageSearch } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Popup from "../Popup/Popup";
import { motion, AnimatePresence } from "framer-motion";

const images = import.meta.glob("/src/assets/women/*", { eager: true });

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchPopup, setSearchPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          img:
            images[`/src/assets/women/${item.img}`]?.default ||
            "/default-image.jpg",
        }));
        setProducts(updatedData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const pageTitle =
    location.pathname === "/womens-wear"
      ? "Women's Wear"
      : location.pathname === "/mens-wear"
      ? "Men's Wear"
      : location.pathname === "/kids-wear"
      ? "Kid's Wear"
      : "Top Selling Products";

  const pageHeading =
    location.pathname === "/womens-wear"
      ? "Our latest Women's Wear"
      : location.pathname === "/mens-wear"
      ? "Men's Best collections"
      : location.pathname === "/kids-wear"
      ? "Kids' Wear"
      : "Top Selling Products for You";

  const pageSubtitle =
    location.pathname === "/womens-wear"
      ? "Explore our new collection for women"
      : location.pathname === "/mens-wear"
      ? "Find the best styles for men."
      : location.pathname === "/kids-wear"
      ? "Cute and trendy outfits for kids."
      : "Discover top fashion picks for you.";

  const showProductCard = (product) => {
    setSelectedProduct(product);
    setSearchPopup(true);
  };

  const closeProductCard = () => {
    setSearchPopup(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setOrderPopup(true);
  };

  const closeOrderPopup = () => {
    setOrderPopup(false);
    setSelectedProduct(null);
  };

  return (
    <div className="mt-16 mb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-lg text-indigo-600 font-semibold">{pageTitle}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-3 mb-2">
            {pageHeading}
          </h1>
          <p className="text-lg text-gray-500">{pageSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {(showAll ? products : products.slice(0, 5)).map((data) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6"
            >
              <img
                src={data.img}
                alt={data.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-1">
                    {data.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-800">
                    ${data.price}
                  </p>
                </div>
                <div className="flex mt-1 items-start space-x-2">
                  <MdOutlineImageSearch
                    className="text-red-600 cursor-pointer text-xl"
                    onClick={() => showProductCard(data)}
                  />
                  <FaCartPlus
                    className="text-green-600 cursor-pointer text-xl"
                    onClick={() => handleAddToCart(data)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="flex justify-center mt-12">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              onClick={() => setShowAll(true)}
            >
              View All
            </button>
          </div>
        )}

        <AnimatePresence>
          {orderPopup && (
            <Popup
              orderPopup={orderPopup}
              setOrderPopup={closeOrderPopup}
              product={selectedProduct}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {searchPopup && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl w-[90%] max-w-md"
              >
                <div className="flex justify-end">
                  <button
                    onClick={closeProductCard}
                    className="text-2xl text-gray-600"
                  >
                    &times;
                  </button>
                </div>
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  {selectedProduct.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedProduct.description}{" "}
                  <span className="font-semibold">
                    Rating: {selectedProduct.rating} ⭐
                  </span>
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-semibold text-gray-700">
                    Available Sizes:
                  </h4>
                  <ul className="flex gap-2">
                    {Object.keys(selectedProduct.sizes).map((size) => (
                      <li
                        key={size}
                        className={`px-3 py-1 rounded-full text-sm ${
                          size === "M" || size === "L" || size === "XL"
                            ? "bg-orange-400 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {size}: {selectedProduct.sizes[size]}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xl font-bold text-red-700">
                  ${selectedProduct.price}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
