import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Spinner from "../loader/Spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const url = "https://fakestoreapi.com/products/category/men's clothing";
    const res = await fetch(url);
    const data = await res.json();
    setLoading(false);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] my-3 mx-auto w-fit">
      {products && !loading ? (
        products.map((prod) => {
          return <ProductCard key={prod.id} prod={prod} />;
        })
      ) : (
        <div className="mx-auto   text-xl flex items-center justify-center">
          <Spinner />
          Fetching Products...
        </div>
      )}
    </div>
  );
}
