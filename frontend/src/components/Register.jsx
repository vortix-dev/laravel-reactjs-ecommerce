import React from 'react';
import Layout from './common/Layout';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from './common/http';

export const Register = () => {
  // جلب الدوال من react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // دالة الإرسال عند الضغط على الزر
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.message);
        // تخزين بيانات المستخدم في LocalStorage
        const userInfo = {
          id: result.id,
          name: result.name,
          token: result.token,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // إعادة التوجيه بعد التسجيل
        navigate('/login');
      } else {
        toast.error("Registration failed");
        if (result.errors) {
          Object.values(result.errors).forEach((error) => {
            toast.error(error[0]);
          });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <Layout>
      <div className='container d-flex justify-content-center py-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='card shadow border-0 login'>
            <div className='card-body p-4'>
              <h3>Register</h3>

              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input
                  {...register('name', {
                    required: "The name field is required"
                  })}
                  type='text'
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder='Name'
                />
                {errors.name && <p className='invalid-feedback'>{errors.name.message}</p>}
              </div>

              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                  {...register('email', {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type='text'
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder='Email'
                />
                {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
              </div>

              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input
                  {...register("password", {
                    required: "The password field is required."
                  })}
                  type='password'
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder='Password'
                />
                {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
              </div>

              <button className='btn btn-primary'>Register</button>
                  <div className="d-flex my-3">
                    Already have an account ? <Link to={'/login'} className='text-danger' >&nbsp;Login</Link>
                  </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
