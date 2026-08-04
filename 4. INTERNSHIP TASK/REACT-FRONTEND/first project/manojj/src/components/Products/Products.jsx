import React, { useState, useEffect } from "react";
// import { ProductCard } from './ProductCard';
import { prefetchDNS } from "react-dom";
import ProductCard from "./ProductCard";
import Button from "../button/button";

// 2. Main Parent Component
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=10",
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  if (products)
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
            Featured Products
          </h1>

          {products.map((p, i) => {
            return (
              <ProductCard
                key={i}
                title={p.title}
                price={`$${p.price}`}
                description={p.description}
                imageUrl={p.image}
              />
            );
          })}
        </div>
        <Button bg="bg-red-500" name="Add to Cart" />
        <Button bg="bg-yellow-500" name="Remove from Cart" />
        <Button bg="bg-green-500" name="Buy Now" />
      </div>
    );
};
export default Products;
