import React, { useState } from 'react';
import ChaseCard from './ChaseCard';
import chase  from './Chase.js';
import './Chasedex.css';



function ChaseDex() {
  const [count, setCount] = useState(0);
  return (
    <div className="Chasedex">
      <h1>Personagens</h1>
      <div className="Chasedex-cards" onClick={() => setCount(count + 1)}>
        {chase.map((g) => (
          <ChaseCard id={g.id} name={g.name} img={g.img} />
        ))}
      </div>
      <p>Player 1: {count}</p>
      
    </div>
  );
}

export default ChaseDex;