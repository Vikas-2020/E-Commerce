import { useState, useEffect} from "react";
import instance from "../axiosConfig";
import "animate.css";
import Product from "../components/Product";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
}

export default Home;
