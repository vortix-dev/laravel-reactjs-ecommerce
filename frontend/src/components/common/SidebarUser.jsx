import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'

export const SidebarUser = () => {
  const {logout} = useContext(AuthContext)

  return (
    <div className='card-shadow sidebar'>
                    <div className='car-body p-4'>
                        <ul>
                            <li>
                                <Link to="/account">Account</Link>
                            </li>

                            <li>
                                <Link to="/orders">Orders</Link>
                            </li>

                             <li>
                                <Link href="#" onClick={logout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
  )
}
