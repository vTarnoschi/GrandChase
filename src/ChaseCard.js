import React, { useCallback } from "react";
import "./Chasecard.css";

function ChaseCard({ id, name, img, onClick, players, allowStyle, banned, charsBan }) {
  let classNameBan = "";

  // const getBanClass = useCallback(() => {
  //   console.log(charsBan);
  //   // return charsBan.filter((item) => item.id === id).length > 1
  // }, [charsBan])

  if (banned) classNameBan = "Chasecard-banned";
  if (charsBan) classNameBan += "Chasecard-ban";
  // if (players.player2.ban === id) classNameBan = "Chasecard-banned";

  let style = {};

  // if (allowStyle) {
  //   if (players.player1.char.id === id) style = { borderColor: "red" };
  //   if (players.player2.char.id === id) style = { borderColor: "blue" };
  // }

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
