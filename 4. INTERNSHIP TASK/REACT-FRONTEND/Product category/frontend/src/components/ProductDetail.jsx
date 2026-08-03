import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="flex items-center justify-center bg-gray-100 p-6">
            <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
          </div>

          <div className="flex flex-col justify-between p-6">
            <div>
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>
            </div>

            <div>
              <p className="text-2xl font-extrabold text-gray-900 mb-3">${product.price}</p>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm font-semibold transition-colors duration-200"
              >
                Back to products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
