import React from "react";
import "./Chasecard.css";

function ChaseCard({ name, img, onClick, banned, charsBan, style }) {
  let classNameBan = "";

  if (banned) classNameBan = "Chasecard-banned";
  if (charsBan) classNameBan += "Chasecard-ban";

  return (
    <div
      className={`${classNameBan} Chasecard`}
      style={style}
      onClick={onClick}
    >
      <img src={img} alt={img} />
      <h1 className="Chasecard-title">{name}</h1>
    </div>
  );
}

export default ChaseCard;
