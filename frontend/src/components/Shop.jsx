
import React, { useState, useEffect } from 'react';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
import Layout from './common/Layout';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-categories`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const result = await res.json();
      console.log('Categories API Response:', result);
      if (result.status === 200) {
        setCategories(Array.isArray(result.data) ? result.data : []);
      } else {
        toast.error('Failed to fetch categories');
        setCategories([]);
      }
    } catch (error) {
      toast.error('Server connection error');
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const categoryParam = selectedCategories.length > 0 ? `?category=${selectedCategories.join(',')}` : '';
      const res = await fetch(`${apiUrl}/get-products${categoryParam}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const result = await res.json();
      console.log('Products API Response:', result);
      if (result.status === 200) {
        setProducts(Array.isArray(result.data) ? result.data : []);
      } else {
        toast.error('Failed to fetch products');
        setProducts([]);
      }
    } catch (error) {
      toast.error('Server connection error');
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Handle Category Checkbox Change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Refetch Products when Selected Categories Change
  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [selectedCategories]);

  return (
    <div>
      <Layout>
        <div className="container product-detail">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb py-5">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Shop</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3>Categories</h3>
                  {categories.length === 0 ? (
                    <p>No categories available</p>
                  ) : (
                    <ul className="list-unstyled">
                      {categories.map((category) => (
                        <li className="mb-2" key={category.id}>
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                          <label className="ps-2" htmlFor={`category-${category.id}`}>
                            {category.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row pb-5">
                {loading ? (
                  <p>Loading products...</p>
                ) : products.length === 0 ? (
                  <p>No products available</p>
                ) : (
                  products.map((product) => (
                    <div className="col-md-4 col-6" key={product.id}>
                                <div className="product card border-0">
                                    <div className="card-img">
                                        <img src={product.image_url} className='w-100' alt="" />
                                    </div>
                                    <div className="card-body">
                                        <a href={`/product/${product.id}`}>{product.title}</a>
                                        <div className="price">
                                        {product.price}DA <span className='text-decoration-line-through'>{product.compare_price} DA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Shop;