import React, { useState, useEffect } from 'react';
import { apiUrl } from './http';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Latest Products
  const fetchLatestProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-latest-products`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const result = await res.json();
      if (result.status === 200) {
        setProducts(result.data || []);
      } else {
        toast.error('Failed to fetch latest products');
      }
    } catch (error) {
      toast.error('Server connection error');
      console.error('Error fetching latest products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  return (
    <div>
      <section className="section-2 py-5">
        <div className="container">
          <h2>New Arrivals</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <div className="row mt-4">
              {products.map((product, index) => (
                <div className="col-md-3 col-6" key={index}>
                                <div className="product card border-0">
                                  <div className="card-img">
                                    <Link to={`/product/${product.id}`}>
                                    <img src={product.image_url} className='w-100' alt="Produit" />
                                    
                                    </Link>
                                  </div>
                                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <a href={`/product/${product.id}`}>{product.title}</a>
                                    <div className="price mb-2">
                                      {product.price} DA <span className="text-decoration-line-through">{product.compare_price} DA</span>
                                    </div>
                                    <Link to={`/product/${product.id}`}  className="btn btn-voir-plus mt-2">Voir plus</Link>
                                  </div>
                                </div>
                              </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LatestProducts;