import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const Contact = () => {
  return (
    <>
      <Header />

      <div className="contactpage">
        <section className="mapsection">
          <div className="mapwrapper">
            <iframe
              className="mapiframe"
              title="Emplacement VELNORDZ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51159.5155192141!2d2.8966848069482487!3d36.73529485597716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb25e89464cfd%3A0xbe649638f8cd1903!2sIlyes%20Bijoux!5e0!3m2!1sen!2sdz!4v1746915201018!5m2!1sen!2sdz"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        </section>

        <section className="contactFormSection">
          <div className="contactContainer">
            <div className="formWrapper">
              <h2>Contactez-nous</h2>
              <hr className="hr" />
              <br />
              <form className="form">
                <div className="row">
                  <input type="text" placeholder="Votre nom" />
                  <input type="email" placeholder="Votre email"  />
                </div>
                <input type="text" placeholder="Objet"  />
                <textarea placeholder="Votre message" rows="6" ></textarea>
                <button>Envoyer le message</button>
              </form>
            </div>

            <div className="infoWrapper">
              <div className="infoOverlay">
                <h3>Infos de contact</h3>
                <hr className="hr2" />
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaMapMarkerAlt /> Adresse
                  </strong>
                  <br />
                  123 Rue du Luxe, Alger 16000, Algérie
                </p>
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaPhoneAlt /> Téléphone
                  </strong>
                  <br />
                  +213 555 123 456
                </p>
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaWhatsapp /> WhatsApp
                  </strong>
                  <br />
                  +213 555 123 456
                </p>
                <br />
                <p>
                  <strong className="titreinfo">
                    <FaEnvelope /> Email
                  </strong>
                  <br />
                  contact@velnordz.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
export default Contact;