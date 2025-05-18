import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Logo from '../assets/images/logo.png';
import Background from '../assets/images/banner-about.jpg'; // Image pleine largeur

export const About  = () => {
  return (
    <>
      <Header />

      {/* Section principale "À propos" */}
      <section className="about-section py-5 text-white" >
        <div className="container">
          <h2 className=" display-5 fw-bold text-center">À propos de VELNORDZ</h2>
          <hr></hr>
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <img
                src={Logo}
                alt="Logo VELNORDZ"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <p className="about-text">
                Bienvenue chez <strong>VELNORDZ</strong>, votre destination de choix pour des sacs de luxe et des accessoires élégants.
              </p>
              <p className="about-text">
                Nous sélectionnons chaque pièce avec soin pour offrir à notre clientèle des
                <strong> produits haut de gamme </strong> qui allient style, qualité et raffinement.
              </p>
              <p className="about-text">
                Découvrez notre collection exclusive de bagues, chaînes, bracelets et boucles d'oreilles conçus pour sublimer votre look.
              </p>
              <p className="about-text">
                Chez <strong>VELNORDZ</strong>, nous croyons que chaque accessoire raconte une histoire. 
                Laissez-nous vous accompagner dans votre expression du luxe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Nouvelle section immersive */}
      <section
        className="about-banner d-flex align-items-center text-white"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
        }}
      >
        <div className="container text-center">
          <h2 className="pub display-5 fw-bold">Élégance. Qualité. Distinction.</h2>
          <p className="lead">Découvrez l’univers VELNORDZ et laissez-vous séduire par l’exclusivité.</p>
          <a href="/shop" className="btn btn-light px-4 py-2 mt-3">Voir nos collections</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
export default About;