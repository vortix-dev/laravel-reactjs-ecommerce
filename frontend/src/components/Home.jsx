import React from 'react'
import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Services from './common/services';
import Cequevoustrouvercheznous from './common/cequevoustrouvrais';
import Header from './common/Header';
import Footer from './common/Footer';
import Hero from './common/Hero';
import Layout from './common/Layout';

export const Home = () => {
  return (
    <div>
        <Layout>
            <Hero/>
            <Services />
            <Cequevoustrouvercheznous />
            <LatestProducts />
            <FeaturedProducts />
        </Layout>
        
    </div>
  )
}

export default Home