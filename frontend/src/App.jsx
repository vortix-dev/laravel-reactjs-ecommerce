import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { Shop } from "./components/Shop"
import About from "./components/AboutUs"
import Contact from "./components/Contact"
import Product from "./components/Product"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import { Login } from "./components/admin/Login"
import Dashboard from "./components/admin/Dashboard"
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth"
import { RequireAuth } from "./components/RequireAuth"

import {Show as ShowCategory} from "./components/admin/category/Show"
import {Create as CreateCategory} from "./components/admin/category/Create"
import {Edit as EditCategory} from "./components/admin/category/Edit"
import { Show as ShowProduct } from "./components/admin/product/Show"
import { Create as CreateProduct } from "./components/admin/product/Create"
import { Edit as EditProduct } from "./components/admin/product/Edit"
import { ToastContainer } from "react-toastify"
import {Login as LoginUser} from './components/Login.jsx'
import { Register } from "./components/Register"
import Profile from "./components/Profile.jsx"
import { Confirmation } from "./components/Confirmation.jsx"
import ShowOrders from "./components/admin/orders/ShowOrders.jsx"
import { OrderDetail } from "./components/admin/orders/OrderDetail.jsx"
import MyOrders from "./components/MyOrders.jsx"


function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        <Routes>
          <Route path="/account" element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
            } />
            <Route path="/orders" element={
            <RequireAuth>
              <MyOrders/>
            </RequireAuth>
            } />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={
            <RequireAuth>
              <Checkout/>
            </RequireAuth>
            } />
          <Route path="/order/confirmation/:id" element={
            <RequireAuth>
              <Confirmation/>
            </RequireAuth>
            } />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/' element={<Home/>} />
          <Route path="/admin/login" element={<Login/>}/>
          <Route path='/shop' element={<Shop/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<LoginUser/>} />
          <Route path="/admin/dashboard" element={
            <AdminRequireAuth>
              <Dashboard/>
            </AdminRequireAuth>
            } />
            <Route path="/admin/categories" element={
            <AdminRequireAuth>
              <ShowCategory/>
            </AdminRequireAuth>
            } />
            <Route path="/admin/categories/create" element={
            <AdminRequireAuth>
              <CreateCategory/>
            </AdminRequireAuth>
            } />
            <Route path="/admin/categories/edit/:id" element={
            <AdminRequireAuth>
              <EditCategory/>
            </AdminRequireAuth>
            } />
            <Route path="/admin/products" element={
              <AdminRequireAuth>
                <ShowProduct/>
              </AdminRequireAuth>
            }/>
            <Route path="/admin/products/create" element={
              <AdminRequireAuth>
                <CreateProduct/>
              </AdminRequireAuth>
            }/>
            <Route path="/admin/products/edit/:id" element={
              <AdminRequireAuth>
                <EditProduct/>
              </AdminRequireAuth>
            }/>
            <Route path="/admin/orders" element={
              <AdminRequireAuth>
                <ShowOrders/>
              </AdminRequireAuth>
            }/>
            <Route path="/admin/orders/:id" element={
              <AdminRequireAuth>
                <OrderDetail/>
              </AdminRequireAuth>
            }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
