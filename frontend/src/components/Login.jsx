import React, { useContext } from 'react';
import Layout from './common/Layout';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl } from './common/http'; // هنا ضع رابط الـ API الأساسي الخاص بك
import { AuthContext } from './context/Auth';

export const Login = () => {
  // الدوال المسترجعة من react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const{login} = useContext(AuthContext)

  // دالة إرسال البيانات عند الضغط على زر Login
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        // تخزين بيانات المستخدم في LocalStorage
        const userInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        login(userInfo)
        toast.success("Login successful");
        navigate('/account');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed");
    }
  };

  return (
    <Layout>
      <div className='container d-flex justify-content-center py-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='card shadow border-0 login'>
            <div className='card-body p-4'>
              <h3>Login</h3>

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

              <button className='btn btn-primary'>Login</button>

              <div className="d-flex justify-content-center my-3">
                Don't have an account? 
                <Link to={'/register'} className='text-danger'>&nbsp;Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
