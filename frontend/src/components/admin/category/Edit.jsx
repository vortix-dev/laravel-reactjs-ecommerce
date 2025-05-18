import React, { useState, useEffect } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

export const Edit = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ جلب بيانات التصنيف عند تحميل الصفحة
  const fetchCategory = async () => {
    try {
      const res = await fetch(`${apiUrl}/categories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        }
      });

      const result = await res.json();

      if (result.status === 200) {
        setName(result.data.name);
        setStatus(result.data.status);
      } else {
        toast.error(result.message || "Error fetching category data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch category data");
    }
  };

  // ✅ تنفيذ الجلب عند تحميل الصفحة
  useEffect(() => {
    fetchCategory();
  }, []);

  // ✅ إرسال التحديثات إلى السيرفر
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error("Name is required");
      return;
    }

    const updatedCategory = {
      name,
      status: Number(status)  // تحويل القيمة إلى رقم
    };

    try {
      const res = await fetch(`${apiUrl}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
        body: JSON.stringify(updatedCategory)
      });

      const result = await res.json();

      if (result.status === 200) {
        toast.success("Category updated successfully");
        navigate('/admin/categories');
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((error) => {
            toast.error(error[0]);
          });
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error. Please try again.");
    }
  };

  // ✅ الواجهة الرسومية
  return (
    <Layout>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <div className='card shadow'>
              <div className='card-body p-4'>
                <h4>Edit Category</h4>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='form-label'>Category Name</label>
                    <input
                      type='text'
                      className='form-control'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Enter category name'
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <select
                      className='form-select'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <button type='submit' className='btn btn-primary'>
                    Update
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

export default Edit;
