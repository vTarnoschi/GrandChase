import React, {  } from 'react';
import './Chasecard.css';


function ChaseCard({ name, img }) {
  return (
    <div className="Chasecard">
      <img src={img} alt={img}/>
      <h1 className="Chasecard-title">{name}</h1>
    </div>
  );
}

export default ChaseCard;