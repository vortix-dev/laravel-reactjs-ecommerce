import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './common/Layout'
import { SidebarUser } from './common/SidebarUser'
import { apiUrl, userToken } from './common/http'
import { toast } from 'react-toastify'

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/get-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${userToken()}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (result.status === 200) {
          setOrders(result.data);
        } else {
          toast.error("Erreur lors du chargement des commandes.");
        }
      })
      .catch(error => {
        setLoading(false);
        toast.error("Une erreur s'est produite.");
        console.error(error);
      });
  }, []);

  return (
    <Layout>
      <div className='container py-5'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>My Orders</h4>
            <Link to="" className="btn btn-primary">Button</Link>
          </div>
          <div className='col-md-3'>
            <SidebarUser />
          </div>
          <div className='col-md-9'>
            <div className='card shadow'>
              <div className="card-body p-4">
                {loading ? (
                  <p>Loading...</p>
                ) : orders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.created_at}</td>
                            <td>{order.grand_total} DA</td>
                            <td>
                              <span className={`badge ${
                                order.status === 'pending' ? 'bg-warning' :
                                order.status === 'shipped' ? 'bg-success' :
                                order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <Link to={`/order/confirmation/${order.id}`} className="btn btn-sm btn-info">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
