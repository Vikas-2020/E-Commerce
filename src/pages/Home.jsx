import { useState, useEffect } from "react";
import instance from "../axiosConfig";
import "animate.css";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useCart();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const result = await instance.get("/products");
    setProducts(result.data);
    setLoading(false);
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="products flex flex-wrap justify-around items-center gap-3 px-12">
      {products.length > 0 &&
        products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}

      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in-out z-[500000]">
          ✅ Item already in wishlist.
        </div>
      )}
    </div>
  );
}

export default Home;
