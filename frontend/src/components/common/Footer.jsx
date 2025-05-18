import React from 'react';
import logo from '../../assets/images/logo-white.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="container py-5">
        <div className="row text-center text-md-start">
          {/* Logo + Description */}
          <div className="col-md-4 mb-4">
            <img src={logo} alt="Logo Velnordz" className='footerLogo' />
            <p className='footerText'>
              <strong>Velnordz</strong> est votre destination élégante pour découvrir des sacs raffinés et des bijoux de luxe soigneusement sélectionnés. Nous offrons des produits de qualité supérieure pour sublimer votre style.
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className='footerTitle'>Nous contacter</h5>
            <p className='footerText'>
              <strong>Téléphone :</strong> <a href="tel:+213673332989" className='footerLink'>(+213) 673 332 989</a>
            </p>
            <p className='footerText'>
              <strong>Email :</strong> <a href="mailto:support@velnordz.com" className='footerLink'>support@velnordz.com</a>
            </p>
          </div>

          {/* Localisation */}
          <div className="col-md-4 mb-4">
            <h5 className='footerTitle'>Localisation</h5>
            <div className='mapContainer'>
              <iframe
                title="Localisation Velnordz"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51159.5155192141!2d2.8966848069482487!3d36.73529485597716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb25e89464cfd%3A0xbe649638f8cd1903!2sIlyes%20Bijoux!5e0!3m2!1sen!2sdz!4v1746915201018!5m2!1sen!2sdz"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className={`text-center mt-4 pt-3 border-top ${'footerText'}`}>
          © {new Date().getFullYear()} Tous droits réservés - Velnordz
        </div>
      </div>
    </footer>
  );
};

export default Footer;
