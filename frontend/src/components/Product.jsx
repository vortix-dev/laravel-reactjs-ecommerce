import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl, adminToken } from './common/http';
import { toast } from 'react-toastify';
import Layout from './common/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CartContext } from './context/Cart';

export const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  // Fetch Product Data
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/get-product/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        }
      });
      const result = await res.json();
      console.log('Product API Response:', result);
      if (result.status === 200 && result.data) {
        setProduct(result.data);
      } else {
        toast.error('Failed to fetch product');
        setProduct(null);
      }
    } catch (error) {
      toast.error('Server connection error');
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Product added to cart');
    } else {
      toast.error('Cannot add product to cart');
    }
  };

  return (
    <div>
      <Layout>
        <div className="container product-detail">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb py-5">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Product</li>
                </ol>
              </nav>
            </div>
          </div>
          {loading ? (
            <p>Loading product...</p>
          ) : !product ? (
            <p>Product not found</p>
          ) : (
            <>
              <div className="row mb-5">
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-2">
                      <Swiper
                        style={{
                          '--swiper-navigation-color': '#000',
                          '--swiper-pagination-color': '#000',
                        }}
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        direction="vertical"
                        spaceBetween={10}
                        slidesPerView={6}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper mt-2"
                      >
                        {product.gallery && product.gallery.length > 0 ? (
                          product.gallery.map((image, index) => (
                            <SwiperSlide key={index}>
                              <div className="content">
                                <img
                                  src={`${apiUrl}/uploads/products/small/${image}`}
                                  alt={`Product image ${index + 1}`}
                                  height={100}
                                  className="w-100"
                                />
                              </div>
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <div className="content">
                              <img
                                src={product.image ? `${apiUrl}/uploads/products/small/${product.image}` : 'path/to/placeholder-image.jpg'}
                                alt="Placeholder"
                                height={100}
                                className="w-100"
                              />
                            </div>
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                    <div className="col-10">
                      <Swiper
                        style={{
                          '--swiper-navigation-color': '#000',
                          '--swiper-pagination-color': '#000',
                        }}
                        loop={true}
                        spaceBetween={0}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        {product.gallery && product.gallery.length > 0 ? (
                          product.gallery.map((image, index) => (
                            <SwiperSlide key={index}>
                              <div className="content">
                                <img
                                  src={`${apiUrl}/uploads/products/large/${image}`}
                                  alt={`Product image ${index + 1}`}
                                  className="w-100"
                                  style={{ height: '450px', objectFit: 'contain' }}
                                />
                              </div>
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <div className="content">
                              <img
                                src={product.image_url}
                                alt={product.title}
                                className="w-100"
                                style={{ height: '450px', objectFit: 'contain' }}
                              />
                            </div>
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <h2>{product.title}</h2>
                  <div className="d-flex">
                    <Rating size={20} readonly initialValue={4} />
                    <span className="pt-1 ps-2">10 Reviews</span>
                  </div>
                  <div className="price h3 py-3">
                    {product.price} DA{' '}
                    {product.compare_price && (
                      <span className="text-decoration-line-through">{product.compare_price} DA</span>
                    )}
                  </div>
                  <div>
                    {product.short_description || 'No short description available.'}
                  </div>
                  <div className="add-to-cart my-4">
                    <button onClick={handleAddToCart} className="btn btn-primary text-uppercase">
                      Add to Cart
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="row pb-5">
                <div className="col-md-12">
                  <Tabs defaultActiveKey="description" id="product-tabs" className="mb-3">
                    <Tab eventKey="description" title="Description">
                      {product.description || 'No description available.'}
                    </Tab>
                    <Tab eventKey="reviews" title="Reviews (10)">
                      <p>No reviews available yet.</p>
                      {/* Placeholder for future reviews integration */}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Product;