import React from "react";
import { FaShieldAlt, FaUndo, FaTruck } from 'react-icons/fa';



const Services = () => {
  return (
    <div className="featureBar  py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4 featureItem">
          <FaShieldAlt size={80} color="#B8860B" />
          <h5 className="mt-3">Qualité Garantie</h5>
          <p className="featureText">
            Nos bijoux sont conçus avec des matériaux durables et un savoir-faire expert.
          </p>
        </div>

        <div className="col-md-4 mb-4 featureItem">
          <FaUndo size={80} color="#B8860B" />
          <h5 className="mt-3">Satisfait ou Remboursé</h5>
          <p className="featureText">
            Vous avez 14 jours pour changer d'avis et être remboursé sans frais.
          </p>
        </div>

        <div className="col-md-4 mb-4 featureItem">
          <FaTruck size={80} color="#B8860B" />
          <h5 className="mt-3">Livraison à Domicile</h5>
          <p className="featureText">
            Expédition rapide et suivie jusqu’à votre porte, partout en Algérie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;