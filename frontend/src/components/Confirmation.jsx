import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { apiUrl, userToken } from './common/http'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Confirmation = () => {
    const [order, setOrder] = useState(null)
    const [loading , setLoading] = useState(true)
    const params = useParams()

    const fetchOrder = () => {
        fetch(`${apiUrl}/get-order-details/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            }
        }).then(res => res.json())
          .then(result => {
              setLoading(false)
              if(result.status === 200){
                  setOrder(result.data)
              } else {
                  setOrder(null)
                  toast.error(result.message)
              }
          }).catch(error => {
              setLoading(false)
              setOrder(null)
              toast.error("Something went wrong")
              console.error(error)
          })
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <Layout>
            <div className='container py-5'>
                {
                    loading && 
                    <div className='text-center py-5'>
                        <div className="spinner-border" role='status'>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }

                {
                    !loading && order !== null &&
                    <>
                        <div className='row'>
                            <h1 className="text-center fw-bold text-success">Thank You!</h1>
                            <p className="text-muted text-center">Your order has been successfully placed.</p>
                        </div>
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className='fw-bold'>Order Summary</h3>
                                <hr />
                                <div className="row">
                                    <div className="col-6">
                                        <p><strong>Order ID: </strong>#{order.id}</p>
                                        <p><strong>Date: </strong>{order.created_at}</p>
                                        <p><strong>Status: </strong>
                                            {
                                                order.status === 'pending' && <span className="badge bg-warning">Pending</span>
                                            }
                                            {
                                                order.status === 'shipped' && <span className="badge bg-success">Shipped</span>
                                            }
                                            {
                                                order.status === 'cancelled' && <span className="badge bg-danger">Cancelled</span>
                                            }
                                        </p>
                                        <p><strong>Payment Method: </strong>Cash On Delivery</p>
                                    </div>
                                    <div className="col-6">
                                        <p><strong>Customer: </strong>{order.name}</p>
                                        <p><strong>Address: </strong>{order.address}</p>
                                        <p><strong>Contact: </strong>{order.phone}</p>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-12">
                                        <table className="table-striped table-bordered table">
                                            <thead className='table-light'>
                                                <tr>
                                                    <th>Item</th>
                                                    <th width='100'>Quantity</th>
                                                    <th width='150'>Price</th>
                                                    <th width='150'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.items && order.items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.unite_price} DA</td>
                                                            <td>{item.price} DA</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td className='text-end fw-bold' colSpan={3}>Grand Total</td>
                                                    <td>{order.grand_total} <b>DA</b></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="text-center mt-3">
                                        <Link to='/orders' className="btn btn-primary">View Order Details</Link>
                                        <Link to='/' className="btn btn-outline-secondary ms-2">Continue Shopping</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

                {
                    !loading && order === null &&
                    <div className='row'>
                        <h1 className="text-center fw-bold text-danger">Order Not Found</h1>
                    </div>
                }
            </div>
        </Layout>
    )
}
