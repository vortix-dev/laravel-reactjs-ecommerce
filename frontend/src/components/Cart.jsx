import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/Mens/eight.jpg'
import { CartContext } from './context/Cart'


export const Cart = () => {
    const { cartData ,shipping , grandTotal , updateCartItem , subTotal , removeFromCart } = useContext(CartContext)
    const [qty , setQty] = useState({})

    const handleQty = (e,itemId) => {
        const newQty = e.target.value
        setQty(prev => ({...prev, [itemId]:newQty}))
        updateCartItem(itemId , newQty)
    }
  
    return (
    <Layout>
        <div className="container pb-5">
            <div className="row">
                <div className="col-md-12">
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb py-5'>
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current='page'>Cart</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-md-12">
                    <h2 className='border-bottom pb-3'>Cart</h2>
                    <table className="table">
                        <tbody>
                            {
                                cartData && cartData.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td width={100}>
                                                <img src={item.image_url} alt="" width={80} />
                                            </td>
                                            <td>
                                                <h4>{item.title}</h4>
                                                <div className="d-flex align-items-center pt-3">
                                                    <span>{item.price}</span>
                                                </div>
                                            </td>
                                            <td valign='middle'>
                                                <input 
                                                    style={{ width:'100px' }} 
                                                    value={qty[item.id] || item.qty} 
                                                    type="number" 
                                                    onChange={(e) => handleQty(e,item.id)}
                                                    className='form-control' />
                                            </td>
                                            <td valign='middle'>
                                                <Link onClick={()=>removeFromCart(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                                </svg>
                                                </Link>
                                            </td>
                                        </tr>       

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <div className="d-flex justify-content-between border-bottom pb-2">
                        <div>Subtotal</div>
                        <div>{subTotal()} DA</div>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                        <div>Shipping</div>
                        <div>{shipping()} DA</div>
                    </div>
                    <div className="d-flex justify-content-between py-2">
                        <div><strong>Grand Total</strong></div>
                        <div>{grandTotal()} DA</div>
                    </div>
                    <div  className="d-flex justify-content-end">
                        <Link to={'/checkout'} className="btn btn-primary">Proceed To Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Cart