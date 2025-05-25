import React, { useState, useEffect } from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { toast } from 'react-toastify'
import { adminToken, apiUrl, userToken } from '../../common/http'

const ShowOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    setLoading(true)
    fetch(`${apiUrl}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false)
        if (result.status === 200) {
          setOrders(result.data)
        } else {
          setOrders([])
          toast.error(result.message || "Erreur lors du chargement des commandes.")
        }
      })
      .catch(error => {
        setLoading(false)
        setOrders([])
        toast.error("Une erreur s'est produite.")
        console.error(error)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Orders</h4>
          </div>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <div className='card shadow'>
              <div className="card-body p-4">
                {loading ? (
                  <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Wilaya</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        
                        <tr key={order.id}>
                          <td><Link to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
                          <td><Link to={`/admin/orders/${order.id}`}>{order.name}</Link></td>
                          <td><Link to={`/admin/orders/${order.id}`}>{order.phone}</Link></td>
                          <td><Link to={`/admin/orders/${order.id}`}>{order.wilaya}</Link></td>
                          <td><Link to={`/admin/orders/${order.id}`}>{order.address}</Link></td>
                          <td><Link to={`/admin/orders/${order.id}`}>{order.grand_total}</Link> DA</td>
                          <td>
                                <span className={`badge ${
                                    order.status === 'pending' ? 'bg-warning' :
                                    order.status === 'shipped' ? 'bg-success' :
                                    order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                                }`}>
                                    {order.status}
                                </span>
                          </td>

                          <td><Link to={`/admin/orders/${order.id}`}>{order.created_at}</Link></td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ShowOrders
