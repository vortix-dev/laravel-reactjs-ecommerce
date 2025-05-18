import React, { useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

export const Create = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            toast.error("Name is required");
            return;
        }

        const newCategory = {
            name,
            status
        };

        const res = await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(newCategory)
        });

        const result = await res.json();

        if (result.status === 200) {
            toast.success("Category created successfully");
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
    };

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
                                <h4>Create Category</h4>
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
                                        Save
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
