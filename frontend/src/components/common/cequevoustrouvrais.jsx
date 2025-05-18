import React from 'react';
import sacImg from '../../assets/images/sacimg.jpg';
import bagueImg from '../../assets/images/bagimg.jpg';
import braceletImg from '../../assets/images/bracelet.jpg';
import chaineImg from '../../assets/images/colierimg.jpg';
import boucleImg from '../../assets/images/boucleimg.jpg';

const categories = [
  { nom: 'Sacs', image: sacImg },
  { nom: 'Bagues', image: bagueImg },
  { nom: 'Bracelets', image: braceletImg },
  { nom: 'Chaînes', image: chaineImg },
  { nom: 'Boucles d’oreilles', image: boucleImg },
];

const Cequevoustrouvercheznous = () => {
  return (
    <div className='categorySection'>
      <h2 className='sectionTitle'>Ce Que Vous Trouver Chez Nous</h2>
      <div className='categoriesGrid'>
        {categories.map((cat, index) => (
          <div
            key={index}
            className='categoryCard'
            style={{ backgroundImage: `url(${cat.image})` }}
          >
            <div className='categoryText'>{cat.nom}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cequevoustrouvercheznous;
