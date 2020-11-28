import React, { memo } from "react";

import ChaseCard from "../ChaseCard";

const style = {
  display: "flex",
  justifyContent: "center",
  marginTop: "30px",
  flexDirection: "column",
};

const Bans = memo(({ charsBan }) => {
  return (
    <div style={style}>
      <h2>Ban Phase</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {charsBan.map((g) => (
          <ChaseCard key={g.id} id={g.id} name={g.name} img={g.img} banned />
        ))}
      </div>
    </div>
  );
});

export default Bans;
