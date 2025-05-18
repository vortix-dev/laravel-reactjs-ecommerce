import React, { useContext, useState } from 'react';
import Layout from './common/Layout';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './context/Cart';
import { toast } from 'react-toastify';
import { apiUrl } from './common/http';
import { useForm } from 'react-hook-form';

export const Checkout = () => {
  const { cartData, subTotal, shipping, grandTotal, clearCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveOrder = async (data) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to place an order');
        navigate('/login');
        return;
      }

      const payload = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        wilaya: data.wilaya,
        payment_method: data.payment_method,
        grand_total: grandTotal(),
        status: 'pending',
        cart: cartData, // cartData is already an array
      };

      const response = await fetch(`${apiUrl}/save-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.status === 200) {
        toast.success(result.message);
        clearCart();
        navigate('/orders');
      } else {
        toast.error(result.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error('An error occurred while placing the order');
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
          {/* Billing Details */}
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">Billing Details</h3>
            <form onSubmit={handleSubmit(saveOrder)}>
              <div className="row pt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Name"
                    {...register('name', { required: 'Name is required', maxLength: { value: 255, message: 'Name is too long' } })}
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Phone (e.g., +213123456789)"
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^\+?\d{9,15}$/, message: 'Invalid phone number' },
                    })}
                  />
                  {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                </div>
                <div className="col-md-12">
                  <textarea
                    className="form-control mb-3"
                    placeholder="Address"
                    rows={3}
                    {...register('address', { required: 'Address is required', maxLength: { value: 500, message: 'Address is too long' } })}
                  />
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Wilaya"
                    {...register('wilaya', { required: 'Wilaya is required', maxLength: { value: 100, message: 'Wilaya is too long' } })}
                  />
                  {errors.wilaya && <p className="text-danger">{errors.wilaya.message}</p>}
                </div>
                <div className="col-md-12">
                  <h4 className="mb-3">Payment Method</h4>
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="cash"
                      value="cash"
                      {...register('payment_method', { required: 'Payment method is required' })}
                    />
                    <label className="form-check-label" htmlFor="cash">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="card"
                      value="card"
                      {...register('payment_method')}
                    />
                    <label className="form-check-label" htmlFor="card">
                      Card Payment
                    </label>
                  </div>
                  {errors.payment_method && <p className="text-danger">{errors.payment_method.message}</p>}
                </div>
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || cartData.length === 0}
                  >
                    {isSubmitting ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="col-md-5">
            <h3 className="border-bottom pb-3"><strong>Items</strong></h3>
            {cartData.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <table className="table">
                  <tbody>
                    {cartData.map((item) => (
                      <tr key={item.id}>
                        <td width={100}>
                          <img
                            src={item.image} // Fixed from image_url
                            alt={item.title}
                            width={80}
                            onError={(e) => (e.target.src = '/path/to/placeholder-image.jpg')}
                          />
                        </td>
                        <td>
                          <h4>{item.title}</h4>
                          <div className="d-flex align-items-center pt-3">
                            <span>{item.price} DA</span>
                            <div className="ps-3">x {item.qty}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <div>Subtotal</div>
                      <div>{subTotal().toFixed(2)} DA</div>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <div>Shipping</div>
                      <div>{shipping().toFixed(2)} DA</div>
                    </div>
                    <div className="d-flex justify-content-between py-2">
                      <div><strong>Grand Total</strong></div>
                      <div>{grandTotal().toFixed(2)} DA</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;