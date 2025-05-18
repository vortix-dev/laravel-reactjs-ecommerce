import React, { useContext } from 'react'
import Layout from './Layout';
import { AdminAuthContext } from '../context/AdminAuth';
import {Link} from 'react-router-dom'
const Sidebar = () => {
  const {logout} = useContext(AdminAuthContext)

  return (
    <div className='card-shadow sidebar'>
                    <div className='car-body p-4'>
                        <ul>
                            <li>
                                <Link to="/admin/dashboard">Dashboard</Link>
                            </li>

                            <li>
                                <Link to="/admin/categories">Categories</Link>
                            </li>

                             <li>
                                <Link to="/admin/products">Products</Link>
                            </li>

                             <li>
                                <a href="">Orders</a>
                            </li>

                             <li>
                                <a href="">Users</a>
                            </li>

                             <li>
                                <a href="">Change passeword</a>
                            </li>

                             <li>
                                <a href="#" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
  )
}

export default Sidebar