// ... الاستيرادات تبقى كما هي
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';

export const Edit = () => {
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
    image: null
  });
  const [disable, setDisable] = useState(false)
  const [productImages, setProductImages] = useState([])
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ جلب التصنيفات
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/categories`, {
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
    }
  };

  // ✅ جلب بيانات المنتج (تم التعديل)
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      });
      const result = await res.json();
      if (result.status === 200) {
        const data = result.data;

        const images = data.product_images || [];

        setProduct({
          ...data,
          gallery: images.map((img) => img.id),
          image: data.image || null
        });

        setImagePreview(images.map((img) => img.image_url));
      } else {
        toast.error('Product not found!');
      }
    } catch (error) {
      toast.error('Server connection error');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const handleFile = async (e) => {
    const formData = new FormData()
    const file = e.target.files[0]
    formData.append('image',file)
    setDisable(true)
    const res = await fetch(`${apiUrl}/save-product-image`,{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      },
      body: formData
    })
    .then(res => res.json())
    .then(result => {
      if(result.status == 200){
        productImages.push(result.data)
        setProductImages(productImages)
      }else{
        toast.error(result.errors.image[0])
      }
      setDisable(false)
      e.target.value = ''
    })
  }

  const handleSetDefault = async () => {
    const res = await fetch(`${apiUrl}/change-product-default-image`,{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      },
    })
    .then(res => res.json())
    .then(result => {
      if(result.status == 200){
        toast.success(result.message)
      }else{
        console.log('Something went wrong')
      }
      setDisable(false)
      e.target.value = ''
    })
  };

  // ✅ حذف صورة من الواجهة
  const deleteImage = (index) => {
    const newImagePreview = imagePreview.filter((_, i) => i !== index);
    const newGallery = product.gallery.filter((_, i) => i !== index);
    setImagePreview(newImagePreview);
    setProduct((prev) => ({
      ...prev,
      gallery: newGallery,
      default_image: prev.default_image === product.gallery[index] ? null : prev.default_image
    }));
    toast.success('Image deleted successfully');
  };

  // ✅ إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
        body: JSON.stringify(product)
      });

      const result = await res.json();
      if (result.status === 200) {
        toast.success('Product updated successfully');
        navigate('/admin/products');
      } else {
        toast.error('Error updating product');
      }
    } catch (error) {
      toast.error('Server connection error');
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
                    <input type='text' name='title' value={product.title}  className='form-control' required />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Price</label>
                    <input type='number' name='price' value={product.price}  className='form-control' required />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Compare Price</label>
                    <input type='number' name='compare_price' value={product.compare_price || ''}  className='form-control' />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Category</label>
                    <select name='category_id' value={product.category_id}  className='form-control'>
                      <option value=''>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Description</label>
                    <textarea name='description' value={product.description || ''}  className='form-control'></textarea>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Short Description</label>
                    <textarea name='short_description' value={product.short_description || ''} className='form-control'></textarea>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Is Featured</label>
                    <select name='is_featured' value={product.is_featured} className='form-control'>
                      <option value='no'>No</option>
                      <option value='yes'>Yes</option>
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Upload Images</label>
                    <input type='file' multiple onChange={handleFile} className='form-control' />
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      {imagePreview.map((image, index) => (
                        <div className="col-md-3" key={`image-${index}`}>
                          <div className="card shadow">
                            <img src={image} alt={`Preview ${index}`} className='w-100' />
                              <button type="button" className="btn btn-primary" onClick={() => handleSetDefault(image)}>
                                {product.default_image === product.gallery[index] ? 'Default' : 'Set Default'}
                              </button>
                              <button type="button" className="btn btn-danger" onClick={() => deleteImage(index)}>
                                Delete
                              </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button type='submit' className='btn btn-success'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
