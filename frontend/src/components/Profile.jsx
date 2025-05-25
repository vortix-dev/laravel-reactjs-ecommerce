import React, { useEffect, useState } from 'react';
import { SidebarUser } from './common/SidebarUser';
import Layout from './common/Layout';
import { apiUrl, userToken } from './common/http';
import { toast } from 'react-toastify';

const Profile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // load user profile
    fetch(`${apiUrl}/user-profile`, {
      headers: {
        'Authorization': `Bearer ${userToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setForm(prev => ({ ...prev, name: data.data.name, email: data.data.email }));
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    fetch(`${apiUrl}/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken()}`
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json().then(data => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        if (status === 200) {
          toast.success(body.message);
        } else if (status === 422) {
          setErrors(body.errors);
        } else {
          toast.error('Something went wrong.');
        }
      })
      .catch(err => {
        toast.error('Server error.');
      });
  }

  return (
    <Layout>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-3'>
            <SidebarUser />
          </div>
          <div className='col-md-9'>
            <div className='card shadow'>
              <div className='card-body'>
                <h4>Edit Profile</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
                    {errors.name && <div className="text-danger">{errors.name[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label>New Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} />
                    {errors.password && <div className="text-danger">{errors.password[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input type="password" name="password_confirmation" className="form-control" onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
