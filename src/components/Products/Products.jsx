import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineImageSearch } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Popup from "../Popup/Popup"; // Import the Popup component

// Import all images dynamically
const images = import.meta.glob("/src/assets/women/*", { eager: true });

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false); // State to control the order popup visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State to handle the selected product
  const [searchPopup, setSearchPopup] = useState(false); // State to manage the search popup
  const location = useLocation();

  useEffect(() => {
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          img:
            images[`/src/assets/women/${item.img}`]?.default ||
            "/default-image.jpg", // Fallback image
        }));
        setProducts(updatedData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Dynamic Titles Based on Route
  const pageTitle =
    location.pathname === "/womens-wear"
      ? "Women's wear"
      : location.pathname === "/mens-wear"
      ? "Men's wear"
      : location.pathname === "/kids-wear"
      ? "Kid's wear"
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

  // Function to open the product card when image search icon is clicked
  const showProductCard = (product) => {
    setSelectedProduct(product); // Set the selected product to display in the card
    setSearchPopup(true); // Open search popup
  };

  // Function to close the product card and reset search popup
  const closeProductCard = () => {
    setSearchPopup(false); // Close search popup
    setSelectedProduct(null); // Reset the selected product
  };

  // Function to handle adding to cart and showing the order popup
  const handleAddToCart = (product) => {
    setSelectedProduct(product); // Set the selected product for cart
    setOrderPopup(true); // Trigger the order popup
  };

  // Function to close the order popup
  const closeOrderPopup = () => {
    setOrderPopup(false); // Close order popup
    setSelectedProduct(null); // Reset the selected product
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Dynamic Section Heading */}
        <div className="text-center y-4 mb-10 max-w-[600px] mx-auto">
          <p className="text-md text-primary">{pageTitle}</p>
          <h1 className="text-3xl font-bold pt-3 pb-1">{pageHeading}</h1>
          <p className="text-md text-gray-400">{pageSubtitle}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {(showAll ? products : products.slice(0, 5)).map((data) => (
            <div
              key={data.id}
              className="space-y-3 my-4 mx-2 p-3 sm:p-3 md:p-4 lg:p-5 rounded-md shadow-lg hover:shadow-xl transition"
            >
              <img
                src={data.img}
                alt={data.title}
                className="lg:h-[250px] lg:w-[250px] md:h-[220px] md:w-[220px] object-cover rounded-md mx-auto"
              />
              <div className="text-start">
                <div className="flex flex-row items-center space-x-2">
                  <h3 className="font-semibold text-blue-500 text-lg pb-1">
                    {data.title}
                  </h3>
                  <span>
                    <MdOutlineImageSearch
                      className="mt-2 ml-2 cursor-pointer mb-3 text-red-600"
                      size={16}
                      onClick={() => showProductCard(data)} // Open search popup
                    />
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-600">
                    ${data.price}
                  </p>
                  <div>
                    <FaCartPlus
                      className="text-green-500 cursor-pointer"
                      size={20}
                      onClick={() => handleAddToCart(data)} // Trigger the cart popup
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && (
          <div className="flex justify-center">
            <button
              className="mt-10 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition"
              onClick={() => setShowAll(true)}
            >
              View All
            </button>
          </div>
        )}

        {/* Render the Order Popup */}
        {orderPopup && (
          <Popup
            orderPopup={orderPopup}
            setOrderPopup={closeOrderPopup} // Close the order popup
            product={selectedProduct} // Pass selected product to Popup
          />
        )}

        {/* Render the Search Popup */}
        {searchPopup && selectedProduct && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-[400px]">
              <div className="flex justify-end">
                <button onClick={closeProductCard} className="text-2xl">
                  &times;
                </button>
              </div>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.title}
                className="w-full h-[250px] object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600">
                {selectedProduct.title}
              </h3>
              <p className="text-md text-gray-600 mt-2">
                {selectedProduct.description}
                <span className="text-md font-semibold">
                  Rating : {selectedProduct.rating} ⭐
                </span>
              </p>
              <div className="mt-4 flex gap-4">
                <h4 className="font-semibold text-gray-600 pt-1">
                  Available Sizes :
                </h4>
                <ul className="text-sm text-black flex flex-row gap-4">
                  {Object.keys(selectedProduct.sizes).map((size) => (
                    <li
                      key={size}
                      className={`${
                        size === "M"
                          ? "bg-orange-400 text-white p-2 rounded-lg hover:bg-orange-500"
                          : ""
                      } ${size === "M" ? "" : ""} ${
                        size === "L"
                          ? "bg-orange-400 text-white p-2 rounded-lg hover:bg-orange-500"
                          : ""
                      } ${size === "L" ? "" : ""} ${
                        size === "XL"
                          ? "bg-orange-400 text-white p-2 rounded-lg hover:bg-orange-500"
                          : ""
                      } ${size === "XL" ? "" : ""}`}
                    >
                      {size}: {selectedProduct.sizes[size]}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-lg font-bold text-red-600 mt-4">
                ${selectedProduct.price}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
