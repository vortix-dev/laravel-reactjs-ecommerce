import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import { AdminAuthContext } from '../context/AdminAuthContext';

import { apiUrl } from '../common/http';
import Layout from '../common/Layout';
import { AdminAuthContext } from '../context/AdminAuth';

export const Login = () => {
    const { login } = useContext(AdminAuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);

        const res = await fetch(`${apiUrl}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    const adminInfo = {
                        token: result.token,
                        id: result.id,
                        name: result.name,
                    };

                    localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

                    toast.success('Login successfully');
                    login(adminInfo);

                    navigate('/admin/dashboard');
                } else {
                    toast.error(result.message);
                }
            });
    };

    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='card shadow border-0 login'>
                        <div className='card-body p-4'>
                            <h3>Admin Login</h3>

                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Email</label>
                                <input
                                    {
                                        ...register('email', {
                                            required: "The email field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })
                                    }
                                    type='text'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder='Email'
                                />
                                {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Password</label>
                                <input
                                    {
                                        ...register("password", {
                                            required: "The password field is required."
                                        })
                                    }
                                    type='password'
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder='Password'
                                />
                                {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
                            </div>

                            <button className='btn'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};
