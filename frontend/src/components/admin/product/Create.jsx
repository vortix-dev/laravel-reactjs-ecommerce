import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';

export const Create = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    compare_price: '',
    category_id: '',
    description: '',
    short_description: '',
    status: 1,
    is_featured: 'no',
    gallery: [],
    default_image: null
  });
  const [categories, setCategories] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      });
      const result = await res.json();
      if (result.status === 200) {
        setCategories(result.data);
      } else {
        toast.error('Failed to fetch categories');
      }
    } catch (error) {
      toast.error('Server connection error');
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleFile = async (e) => {
    const files = Array.from(e.target.files);
    let newGallery = [...product.gallery];
    let newGalleryImages = [...galleryImages];

    for (let file of files) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(`${apiUrl}/temp-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken()}`
          },
          body: formData
        });
        const result = await res.json();
        if (result.status === 200) {
          newGallery.push(result.data.id);
          newGalleryImages.push(result.data.image_url);
        } else {
          toast.error('Failed to upload image');
        }
      } catch (error) {
        toast.error('Error uploading image');
        console.error('Error uploading image:', error);
      }
    }
    console.log('Gallery Images:', newGalleryImages);
    setProduct({ ...product, gallery: newGallery });
    setGalleryImages(newGalleryImages);
    setDisable(newGalleryImages.length > 0);
  };

  // Handle Set Default Image
  const handleSetDefault = (imageId, index) => {
    setProduct({ ...product, default_image: imageId });
    toast.info(`Image ${index + 1} set as default`);
  };

  // Delete Image
  const deleteImage = (image, index) => {
    const newGalleryImages = galleryImages.filter((_, i) => i !== index);
    const newGallery = product.gallery.filter((_, i) => i !== index);
    setGalleryImages(newGalleryImages);
    setProduct((prev) => ({
      ...prev,
      gallery: newGallery,
      default_image: prev.default_image === product.gallery[index] ? null : prev.default_image
    }));
    toast.success('Image deleted successfully');
    setDisable(newGalleryImages.length > 0);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${apiUrl}/products`;
      const formData = { ...product };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.status === 200) {
        toast.success('Product created successfully');
        navigate('/admin/products');
      } else {
        toast.error('Error creating product');
      }
    } catch (error) {
      toast.error('Server connection error');
      console.error('Error creating product:', error);
    }
  };

  return (
    <Layout>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className='form-group mb-3'>
                    <label>Title</label>
                    <input type='text' name='title' value={product.title} onChange={handleChange} className='form-control' required />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Price</label>
                    <input type='number' name='price' value={product.price} onChange={handleChange} className='form-control' required />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Compare Price</label>
                    <input type='number' name='compare_price' value={product.compare_price} onChange={handleChange} className='form-control' />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Category</label>
                    <select name='category_id' value={product.category_id} onChange={handleChange} className='form-control'>
                      <option value=''>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Description</label>
                    <textarea name='description' value={product.description} onChange={handleChange} className='form-control'></textarea>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Short Description</label>
                    <textarea name='short_description' value={product.short_description} onChange={handleChange} className='form-control'></textarea>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Is Featured</label>
                    <select name='is_featured' value={product.is_featured} onChange={handleChange} className='form-control'>
                      <option value='no'>No</option>
                      <option value='yes'>Yes</option>
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Upload Images</label>
                    <input type='file' onChange={handleFile} className='form-control' />
                    {galleryImages.length === 0 && <p className='mt-2 text-muted'>No images uploaded yet</p>}
                    <div className='mt-2'>
                      <div className="row">
                        {galleryImages.map((image, index) => (
                          <div className="col-md-3" key={index}>
                            <div className="card shadow">
                              <img src={image} alt="Image Preview" className="w-100" style={{ height: '150px', objectFit: 'cover' }} />
                              <div className="card-body p-2">
                                <button
                                  type='button'
                                  className={`btn btn-sm w-100 mb-2 ${product.default_image === product.gallery[index] ? 'btn-primary' : 'btn-outline-primary'}`}
                                  onClick={() => handleSetDefault(product.gallery[index], index)}
                                >
                                  {product.default_image === product.gallery[index] ? 'Default' : 'Set as Default'}
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-danger btn-sm w-100'
                                  onClick={() => deleteImage(image, index)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-success'>
                    Create Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;