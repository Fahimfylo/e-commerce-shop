/* eslint-disable react/prop-types */
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ orderPopup, setOrderPopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", address: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.address) newErrors.address = "Address is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOrderPopup(false);
      setFormData({ name: "", email: "", address: "" });
      alert("Order Submitted Successfully!");
    }
  };

  return (
    <AnimatePresence>
      {orderPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl w-[90%] max-w-[400px] relative"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setOrderPopup(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500 transition-transform duration-200"
            >
              <IoCloseOutline />
            </motion.button>

            {/* Header */}
            <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
              Order Now
            </h1>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", placeholder: "Name" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "address", placeholder: "Address" },
              ].map(({ name, placeholder, type = "text" }) => (
                <div key={name}>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                Order Now
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
