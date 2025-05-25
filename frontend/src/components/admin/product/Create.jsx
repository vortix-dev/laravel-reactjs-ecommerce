import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';

export const Create = () => {
  
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [gallery,setGallery] = useState([])
  const [disable,setDisable] = useState(false)
  const [galleryImages,setGalleryImages] = useState([])  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

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

  const saveProduct = async (data) => {
    const formData = {...data , 'description' : content , "gallery" : gallery}

    const res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(result => {
      if(result.status == 200)
      {
        console.log(formData)
        toast.success(result.message)
        navigate('/admin/products')
      }else{
        console.log('Something went wrong')
      }
    })
  }

  const handleFile = async (e) => {
    const formData = new FormData()
    const file = e.target.files[0];
    formData.append('image', file);
    setDisable(true)
    
    const res = await fetch(`${apiUrl}/temp-image`,{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      },
      body: formData
    }).then(res => res.json())
    .then(result => {
      if(result.status == 200)
      {
        setDisable(false)
        gallery.push(result.data.id)
        setGallery(gallery)
        galleryImages.push(result.data.image_url)
        console.log(galleryImages)
        setGalleryImages(galleryImages)

        toast.success('Image has been uploaded successfully')

      }else{
        console.log(result.errors)
      }
    })
  }

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter(gallery => gallery != image)
    setGalleryImages(newGallery)
  }
  
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
                <form onSubmit={handleSubmit(saveProduct)}>
                  <div className='form-group mb-3'>
                    <label>Title *</label>
                    <input
                      type='text'
                      {...register('title', { required: 'Title is required' })}
                      className='form-control'
                    />
                    {errors.title && <small className='text-danger'>{errors.title.message}</small>}
                  </div>

                  <div className='form-group mb-3'>
                    <label>Price *</label>
                    <input
                      type='number'
                      {...register('price', { required: 'Price is required' })}
                      className='form-control'
                    />
                    {errors.price && <small className='text-danger'>{errors.price.message}</small>}
                  </div>

                  <div className='form-group mb-3'>
                    <label>Compare Price</label>
                    <input
                      type='number'
                      {...register('compare_price')}
                      className='form-control'
                    />
                  </div>

                  <div className='form-group mb-3'>
                    <label>Category *</label>
                    <select
                      {...register('category_id', { required: 'Category is required' })}
                      className='form-control'
                    >
                      <option value=''>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category_id && <small className='text-danger'>{errors.category_id.message}</small>}
                  </div>

                  <div className='form-group mb-3'>
                    <label>Description</label>
                    <textarea
                      {...register('description')}
                      className='form-control'
                    ></textarea>
                  </div>

                  <div className='form-group mb-3'>
                    <label>Short Description</label>
                    <textarea
                      {...register('short_description')}
                      className='form-control'
                    ></textarea>
                  </div>

                  <div className='form-group mb-3'>
                    <label>Is Featured</label>
                    <select
                      {...register('is_featured')}
                      className='form-control'
                    >
                      <option value='no'>No</option>
                      <option value='yes'>Yes</option>
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Upload Images</label>
                    <input type='file' onChange={handleFile} className='form-control' />
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      {
                        galleryImages && galleryImages.map((image,index) => {
                          return (
                            <div className="col-md-3" key={`image-${index}`}>
                              <div className="card shadow">
                                <img src={image} className='w-100' alt="" />
                                <button className='btn btn-danger' onClick={() => deleteImage(image)}>Delete</button>
                              </div>
                            </div>

                          )
                        })
                      }
                    </div>
                  </div>
                  <button type='submit' className='btn btn-success'>
                    Create 
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