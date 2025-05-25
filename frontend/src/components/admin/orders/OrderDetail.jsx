import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify' // إذا لم يكن موجود ضيفه
// npm i react-toastify

export const OrderDetail = () => {
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const params = useParams()

  const fetchOrder = () => {
    setLoading(true)
    fetch(`${apiUrl}/orders/${params.id}`, {
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
          setOrder(result.data)
          setStatus(result.data.status) // حفظ الحالة
        } else {
          setOrder({})
          toast.error(result.message || "Erreur lors du chargement des commandes.")
        }
      })
      .catch(error => {
        setLoading(false)
        setOrder({})
        toast.error("Une erreur s'est produite.")
        console.error(error)
      })
  }

  const handleUpdateStatus = (e) => {
    e.preventDefault()
    fetch(`${apiUrl}/orders/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify({ status }) // إرسال الحالة الجديدة
    })
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          toast.success(result.message)
          fetchOrder() // إعادة تحميل الطلب للتحديث
        } else {
          toast.error(result.message || "Failed to update status.")
        }
      })
      .catch(error => {
        toast.error("Une erreur s'est produite.")
        console.error(error)
      })
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <Layout>
      <div className='container py-5'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Order Detail</h4>
            <Link to="/admin/orders" className="btn btn-primary">Back</Link>
          </div>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <div className="row">
              <div className="col-md-9">
                <div className='card shadow'>
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-md-6">
                        <h3>Order ID : #{order.id}</h3>
                        <span className={`badge ${
                          order.status === 'pending' ? 'bg-warning' :
                          order.status === 'shipped' ? 'bg-success' :
                          order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="col-md-6">
                        <div className="text-secondary">
                          Date
                        </div>
                        <h4 className="pt-2">{order.created_at}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className='py-3'>
                          <strong>{order.name}</strong>
                          <div>{order.phone}</div>
                          <div>{order.address}, {order.wilaya}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-5">
                      <h3 className="pb-2"><strong>Items</strong></h3>
                      <div className="row justify-content-end">
                        <div className="col-lg-12">
                          {order.items && order.items.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                              <div className="d-flex">
                                <div className="d-flex flex-column">
                                  <div className="mb-2"><span>{item.name}</span></div>
                                  <div className="text-muted">Price Unite: {item.unite_price} DA</div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div>X {item.qty}</div>
                                <div className="ps-3">{item.price} DA</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="row justify-content-end">
                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                            <div><strong>Grand Total</strong></div>
                            <div>{order.grand_total} DA</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className='card shadow'>
                  <div className="card-body p-4">
                    <form onSubmit={handleUpdateStatus}>
                      <div className="mb-3">
                        <label className='form-label' htmlFor="status">Status</label>
                        <select
                          id="status"
                          className='form-control'
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <button className="btn btn-primary" type='submit'>Update</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
