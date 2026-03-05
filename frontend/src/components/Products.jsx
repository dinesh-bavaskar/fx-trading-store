import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";
import SectionDivider from "../components/SectionDivider";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");

      // 🔥 FIX: Handle both possible response formats
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="px-10 py-14 bg-[#0a0614] text-white">
      
      <h2 className="text-4xl md:text-5xl text-center mb-12 golden-title">
        Our Top Rated Bots
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

    </section>
  );
}