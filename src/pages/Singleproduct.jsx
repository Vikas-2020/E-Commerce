import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axiosConfig";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

function Singleproduct() {
  const { handleAddToCart, addToWishlist } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product);

  useEffect(() => {
    getSingleProductData(id);
  }, [id]);

  async function getSingleProductData(id) {
    try {
      const response = await instance.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  if (!product) {
    return <Loader />;
  }

  const { title, description, price, image, category, rating } = product;

  return (
    <div className="mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-192px)]">
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="min-w-auto md:w-1/2 md:h-[50vh] object-contain rounded-lg shadow-md"
      />

      {/* Product Info */}
      <div className="flex flex-col">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-lg text-blue-600 font-semibold mb-4">${price}</p>
          <p className="text-gray-700 mb-1"><strong className="text-gray-800">Rating:</strong> {rating.rate || "N/A"}</p>
          <p className="text-gray-700 mb-1"><strong className="text-gray-800">Category:</strong> {category || "N/A"}</p>
          <p className="text-gray-700 mb-6">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={() => addToWishlist(product)} className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
            <FaHeart /> Wishlist
          </button>
          <button
            onClick={() => handleAddToCart(product)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Singleproduct;
