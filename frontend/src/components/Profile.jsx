import React from 'react'
import { SidebarUser } from './common/SidebarUser'
import { Link } from 'react-router-dom'
import Layout from './common/Layout'

const Profile = () => {
  return (
    <Layout>
        

       <div className='container'>
        <div className='row'>
            <div className='d-flex justify-content-between mt-5 pb-3'>
                <h4 className='h4 pb-0 mb-0'></h4>
                <Link to="" className="btn btn-primary">Button</Link>
            </div>
            <div className='col-md-3'>
                <SidebarUser/>
            </div>
            <div className='col-md-9'>
               <div className='card shadow'>
                <div className="card-body p-4">


                </div>

               </div>
                

            </div>
        </div>
       </div>




    </Layout>
  )
}

export default Profile